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
    const { purchaseId } = await req.json();

    console.log('Processing check-in for purchase:', purchaseId);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get purchase details
    const { data: purchase, error: fetchError } = await supabase
      .from('purchases')
      .select('*')
      .eq('id', purchaseId)
      .single();

    if (fetchError || !purchase) {
      console.error('Purchase not found:', fetchError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Ingresso inválido',
          status: 'invalid'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    // Check if payment is approved
    if (purchase.payment_status !== 'approved') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Pagamento não aprovado',
          status: 'unpaid'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Check if already checked in
    if (purchase.checked_in) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Ingresso já utilizado',
          status: 'already_used',
          purchase: {
            fullName: purchase.full_name,
            ticketType: purchase.ticket_type,
            checkedInAt: purchase.checked_in_at
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Mark as checked in
    const { error: updateError } = await supabase
      .from('purchases')
      .update({ 
        checked_in: true,
        checked_in_at: new Date().toISOString()
      })
      .eq('id', purchaseId);

    if (updateError) {
      console.error('Error updating check-in:', updateError);
      throw updateError;
    }

    console.log('Check-in successful for:', purchase.full_name);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Check-in realizado com sucesso!',
        status: 'success',
        purchase: {
          fullName: purchase.full_name,
          ticketType: purchase.ticket_type,
          email: purchase.email
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in check-in function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
