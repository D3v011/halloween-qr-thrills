import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

serve(async (req) => {
  try {
    const payload = await req.json();
    console.log('Webhook received:', JSON.stringify(payload, null, 2));

    // Mercado Pago sends notifications for various events
    if (payload.type === 'payment') {
      const paymentId = payload.data.id;
      const accessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');

      // Get payment details
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const payment = await paymentResponse.json();
      console.log('Payment details:', JSON.stringify(payment, null, 2));

      const purchaseId = payment.external_reference;
      const status = payment.status;

      // Create Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Update purchase status
      const { data: purchase, error: updateError } = await supabase
        .from('purchases')
        .update({
          payment_status: status,
          mercadopago_payment_id: paymentId
        })
        .eq('id', purchaseId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating purchase:', updateError);
        throw updateError;
      }

      // If payment approved, send email with QR code
      if (status === 'approved') {
        console.log('Payment approved, sending email...');
        
        // Call send-ticket-email function
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-ticket-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            purchaseId: purchase.id,
            fullName: purchase.full_name,
            email: purchase.email,
            ticketType: purchase.ticket_type
          })
        });

        if (!emailResponse.ok) {
          console.error('Error sending email:', await emailResponse.text());
        } else {
          console.log('Email sent successfully');
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error in webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
