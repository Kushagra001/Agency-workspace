import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const leadMagnetSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  budget: z.string().min(1),
});

type LeadMagnetForm = z.infer<typeof leadMagnetSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function logToSupabase(data: LeadMagnetForm) {
  if (!supabase) {
    console.log('[DEMO] Supabase not configured. Lead data (console only):', data);
    return;
  }

  try {
    const { error } = await supabase.from('leads').insert([
      {
        name: data.name,
        email: data.email,
        company: data.company,
        budget: data.budget,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) console.error('Supabase logging failed:', error);
  } catch (err) {
    console.error('Error logging to Supabase:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const validatedData = leadMagnetSchema.parse(body);

    // Send email via Resend (build HTML string to avoid JSX in this function)
    if (process.env.RESEND_API_KEY) {
      const downloadUrl = process.env.NEXT_PUBLIC_LEAD_MAGNET_DOWNLOAD_URL || 'https://example.com/framework.pdf';
      const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

      const html = `
        <div style="font-family:system-ui, -apple-system, sans-serif; max-width:600px;">
          <div style="background:#faf7f2;padding:40px 24px;text-align:center;">
            <h1 style="font-size:32px;font-weight:700;color:#1c1a17;margin:0 0 16px;">Your framework is ready</h1>
            <p style="font-size:16px;color:#7a766e;margin:0;">The 90-Day Growth Audit Framework</p>
          </div>
          <div style="padding:40px 24px;color:#1c1a17;line-height:1.6;">
            <p style="font-size:16px;margin-bottom:24px;">Hi ${validatedData.name},</p>
            <p style="font-size:16px;margin-bottom:24px;">Thanks for downloading. This framework is exactly what I use to audit every client — every channel, every metric, every optimization.</p>
            <p style="font-size:16px;margin-bottom:32px;">Work through it. Find where your funnel is leaking revenue. Then decide: fix it yourself, or book a call.</p>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="${downloadUrl}" style="display:inline-block;background:#b8922a;color:#fff;padding:12px 32px;text-decoration:none;border-radius:6px;font-weight:600;">Download Framework (PDF)</a>
            </div>
            <div style="background:#f5ede7;padding:24px;border-radius:8px;margin-bottom:32px;">
              <h3 style="font-size:14px;font-weight:600;color:#b8922a;margin:0 0 12px;text-transform:uppercase;">Next Step</h3>
              <p style="font-size:14px;margin:0 0 12px;">If the framework resonates, book a free 30-minute strategy call. Tell me about your business. I will tell you exactly where revenue is being left on the table.</p>
              <a href="${calendlyUrl}" style="display:inline-block;background:#1c1a17;color:#fff;padding:10px 24px;text-decoration:none;border-radius:4px;font-weight:600;font-size:14px;">Book a call</a>
            </div>
            <p style="font-size:14px;color:#7a766e;margin-bottom:24px;">Not a sales call. Zero pressure. Just strategy.</p>
            <div style="border-top:1px solid #e8ddd5;padding-top:24px;font-size:12px;color:#7a766e;">
              <p style="margin:0 0 8px;">© 2026 Axiom Strategy. All rights reserved.</p>
              <p style="margin:0;">No cookies. No tracking. Just results.</p>
            </div>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Axiom Strategy <onboarding@resend.dev>',
          to: validatedData.email,
          subject: 'Your 90-Day Growth Audit Framework',
          html,
        });
      } catch (emailError) {
        console.error('Resend email failed:', emailError);
      }
    } else {
      console.log('[DEMO] Resend not configured. Email would send to:', validatedData.email);
    }

    // Log to Supabase
    await logToSupabase(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Framework download sent to your email',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead magnet error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 400 }
    );
  }
}
