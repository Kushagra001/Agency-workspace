"use client";

import * as React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  education: string;
  available: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, className }) => {
  return (
    <div
      className={cn(
        "bg-clinical-white rounded-xl overflow-hidden border border-clinical-border",
        "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        "flex flex-col",
        className
      )}
    >
      {/* Doctor photo */}
      <div className="aspect-[3/4] bg-clinical-blue-light overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <Badge className="self-start mb-2">{doctor.specialty}</Badge>
        <h3 className="font-semibold text-ink text-base">{doctor.name}</h3>
        <p className="text-xs text-ink-soft mt-1">{doctor.education}</p>

        <div className="mt-auto pt-4 border-t border-clinical-border">
          <div className="flex justify-between text-xs">
            <span className="text-ink-muted">{doctor.experience} exp.</span>
            <span className="text-clinical-blue font-medium">
              {doctor.available}
            </span>
          </div>
          <button className="w-full mt-3 py-2 text-xs font-medium text-clinical-blue border border-clinical-blue rounded-lg hover:bg-clinical-blue hover:text-white transition-colors duration-200">
            Book with Dr. {doctor.name.split(" ").pop()}
          </button>
        </div>
      </div>
    </div>
  );
};

export { DoctorCard };
export type { Doctor };
