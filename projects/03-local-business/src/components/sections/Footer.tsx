"use client";

import * as React from "react";
import { Phone, Mail, Clock, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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

const patientInfo = [
  { label: "FAQs", href: "#" },
  { label: "Insurance", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Col 1: Logo + Info */}
          <div className="lg:col-span-1">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-8 h-8 rounded-md bg-clinical-blue flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Medica</span>
            </a>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Exceptional care, close to home. Multi-specialty outpatient clinic serving families since 2018.
            </p>
            <div className="flex items-start gap-2 text-sm text-white/60">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span>123 Health Avenue, Mumbai 400001, India</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-clinical-blue hover:text-clinical-blue-light mt-2 inline-block"
            >
              View on Google Maps →
            </a>
          </div>

          {/* Col 2: Departments */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Departments</h3>
            <ul className="space-y-2">
              {departments.slice(0, 6).map((dept) => (
                <li key={dept}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Patient Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Patient Info</h3>
            <ul className="space-y-2">
              {patientInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={16} />
                care@medica.health
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Clock size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  Mon–Sat: 8am–8pm
                  <br />
                  Sun: 9am–2pm
                </span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-clinical-white/10 flex items-center justify-center hover:bg-clinical-blue transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © 2025 Medica Health Centre · NABH Accredited
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
