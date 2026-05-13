"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/airtable";

const departments = [
  "Cardiology",
  "Orthopaedics",
  "Neurology",
  "Paediatrics",
  "Ophthalmology",
  "General Medicine",
  "Diagnostics",
  "Preventive Health",
];

const timeSlots = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–8pm)",
];

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submittedPhone, setSubmittedPhone] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmittedPhone(data.phone);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const err = await res.json();
        alert(err.error || "Booking failed. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-clinical-offwhite">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Info */}
          <div>
            <h2 className="text-[clamp(32px,4vw,48px)] font-semibold text-ink mb-4">
              Ready to book your appointment?
            </h2>
            <p className="text-base text-ink-muted mb-8 leading-relaxed">
              Fill in your details and we&apos;ll confirm your slot within 15
              minutes. You&apos;ll receive a WhatsApp message with all the details.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "No waiting room surprises",
                "Instant WhatsApp confirmation",
                "Free cancellation up to 2 hours before",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                  <CheckCircle size={16} className="text-clinical-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-clinical-blue font-medium"
              >
                <Phone size={18} />
                +91 98765 43210
              </a>
              <p className="text-xs text-ink-soft">
                Mon–Sat 8am–8pm · Sun 9am–2pm
              </p>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-clinical-white rounded-xl p-6 lg:p-8 border border-clinical-border">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-ink">
                    Appointment requested!
                  </h3>
                  <p className="text-ink-muted text-sm">
                    You&apos;ll receive a WhatsApp confirmation on +91 {submittedPhone}{" "}
                    within 15 minutes.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                      className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink-soft bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={15}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        {...register("phone")}
                        className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink-soft bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all"
                        placeholder="9876543210"
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                        Email (optional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        maxLength={100}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                        className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink-soft bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                      Department
                    </label>
                    <select
                      id="department"
                      aria-invalid={!!errors.department}
                      aria-describedby={errors.department ? "department-error" : undefined}
                      {...register("department")}
                      className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select department</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p id="department-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.department.message}</p>
                    )}
                  </div>

                  {/* Date + Time row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "date-error" : undefined}
                        {...register("date")}
                        className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all"
                      />
                      {errors.date && (
                        <p id="date-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.date.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="time" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                        Preferred Time
                      </label>
                      <select
                        id="time"
                        aria-invalid={!!errors.time}
                        aria-describedby={errors.time ? "time-error" : undefined}
                        {...register("time")}
                        className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p id="time-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5 block">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      maxLength={500}
                      aria-invalid={!!errors.notes}
                      aria-describedby={errors.notes ? "notes-error" : undefined}
                      {...register("notes")}
                      rows={3}
                      className="w-full border border-clinical-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink-soft bg-clinical-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-blue/30 focus-visible:border-clinical-blue transition-all resize-none"
                      placeholder="Any symptoms, concerns, or preferences..."
                    />
                    {errors.notes && (
                      <p id="notes-error" role="alert" className="text-xs text-red-600 mt-1.5 font-medium">{errors.notes.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-sm tracking-wide flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Book appointment
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
