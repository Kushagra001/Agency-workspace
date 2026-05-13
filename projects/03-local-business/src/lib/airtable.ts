import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  department: z.enum([
    "Cardiology",
    "Orthopaedics",
    "Neurology",
    "Paediatrics",
    "Ophthalmology",
    "General Medicine",
    "Diagnostics",
    "Preventive Health",
  ]),
  doctor: z.string().optional(),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.enum(["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)"]),
  notes: z.string().max(300).optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentFormData) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;

  if (!baseId || !apiKey) {
    throw new Error("Airtable credentials not configured");
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/Appointments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: data.name,
          Phone: data.phone,
          Email: data.email || "",
          Department: data.department,
          Doctor: data.doctor || "Any available",
          Date: data.date,
          TimeSlot: data.time,
          Notes: data.notes || "",
          Status: "Pending",
          CreatedAt: new Date().toISOString(),
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable submission failed: ${err}`);
  }

  return res.json();
}
