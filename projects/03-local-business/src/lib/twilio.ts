import type { AppointmentFormData } from "./airtable";

export async function sendWhatsAppConfirmation(
  data: AppointmentFormData,
  twilioSid: string,
  twilioAuth: string,
  twilioFrom: string
) {
  const message = `Hi ${data.name}! ✅ Your appointment request at Medica Health Centre has been received.\n\n🏥 Department: ${data.department}\n📅 Date: ${data.date}\n⏰ Time: ${data.time}\n\nWe'll confirm your slot within 15 minutes. Any questions? Call +91 98765 43210.`;

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: twilioFrom,
        To: `whatsapp:+91${data.phone}`,
        Body: message,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio send failed: ${err}`);
  }

  return res.json();
}
