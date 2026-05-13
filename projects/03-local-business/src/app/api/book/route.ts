import { NextRequest, NextResponse } from "next/server";
import { createAppointment, appointmentSchema } from "@/lib/airtable";
import { sendWhatsAppConfirmation } from "@/lib/twilio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Create Airtable record
    await createAppointment(data);

    // Send WhatsApp confirmation if Twilio credentials exist
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;

    if (twilioSid && twilioAuth && twilioFrom) {
      try {
        await sendWhatsAppConfirmation(data, twilioSid, twilioAuth, twilioFrom);
      } catch (err) {
        console.error("WhatsApp send failed (non-blocking):", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}
