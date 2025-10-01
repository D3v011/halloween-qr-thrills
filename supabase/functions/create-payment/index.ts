import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, ticketType, price } = await req.json();

    console.log('Creating payment preference for:', { fullName, email, ticketType, price });

    const accessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('Mercado Pago access token not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save purchase to database
    const { data: purchase, error: insertError } = await supabase
      .from('purchases')
      .insert({
        full_name: fullName,
        email: email,
        ticket_type: ticketType,
        price: price,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting purchase:', insertError);
      throw insertError;
    }

    console.log('Purchase created:', purchase.id);

    // Create payment preference in Mercado Pago
    const preference = {
      items: [
        {
          title: ticketType === 'vip' ? '🎃 Ingresso Macabra (VIP)' : '🎃 Ingresso Normal',
          quantity: 1,
          unit_price: price,
          currency_id: 'BRL'
        }
      ],
      payer: {
        name: fullName,
        email: email
      },
      back_urls: {
        success: `${req.headers.get('origin')}/checkout-success`,
        failure: `${req.headers.get('origin')}/checkout-failure`,
        pending: `${req.headers.get('origin')}/checkout-pending`
      },
      auto_return: 'approved',
      external_reference: purchase.id,
      notification_url: `${supabaseUrl}/functions/v1/mercadopago-webhook`
    };

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference)
    });

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      console.error('Mercado Pago API error:', errorText);
      throw new Error(`Mercado Pago API error: ${errorText}`);
    }

    const mpData = await mpResponse.json();
    console.log('Payment preference created:', mpData.id);

    // Update purchase with preference ID
    await supabase
      .from('purchases')
      .update({ mercadopago_preference_id: mpData.id })
      .eq('id', purchase.id);

    return new Response(
      JSON.stringify({
        init_point: mpData.init_point,
        purchase_id: purchase.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-payment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
