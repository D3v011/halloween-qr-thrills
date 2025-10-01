import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import QRCode from "npm:qrcode@1.5.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { purchaseId, fullName, email, ticketType } = await req.json();

    console.log('Sending ticket email to:', email);

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('Resend API key not configured');
    }

    const resend = new Resend(resendApiKey);

    // Generate QR Code as base64
    const qrCodeData = `HALLOWEEN2025-${purchaseId}`;
    const qrCodeBase64 = await QRCode.toDataURL(qrCodeData, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    const ticketTypeLabel = ticketType === 'vip' ? '🎃 Ingresso Macabra (VIP)' : '🎃 Ingresso Normal';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #f97316, #dc2626);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .qr-code {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background: white;
              border-radius: 10px;
            }
            .qr-code img {
              max-width: 300px;
              height: auto;
            }
            .info {
              background: white;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎃 Halloween Night 2025 🎃</h1>
            <p>Seu ingresso está confirmado!</p>
          </div>
          
          <div class="content">
            <div class="info">
              <h2>Olá, ${fullName}!</h2>
              <p><strong>Tipo de Ingresso:</strong> ${ticketTypeLabel}</p>
              <p><strong>ID da Transação:</strong> ${purchaseId}</p>
            </div>

            <div class="qr-code">
              <h3>Seu QR Code de Acesso</h3>
              <p>Apresente este QR Code na entrada do evento</p>
              <img src="${qrCodeBase64}" alt="QR Code do Ingresso" />
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <h2 style="color: #f97316;">🎃 Prepare-se para a noite mais sombria 🎃</h2>
              <p><strong>📅 Data:</strong> 01 de Novembro de 2025</p>
              <p><strong>📍 Local:</strong> Revelado no Grupo</p>
              <p><strong>🕒 Horário:</strong> 19h ás 01h</p>
            </div>

            <div class="footer">
              <p>Nos vemos na festa! 👻</p>
              <p style="font-size: 12px; margin-top: 20px;">
                Este é um e-mail automático. Para dúvidas, entre em contato através das nossas redes sociais.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: 'Halloween Night <onboarding@resend.dev>',
      to: [email],
      subject: '🎃 Seu Ingresso para Halloween Night 2025',
      html: emailHtml
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
