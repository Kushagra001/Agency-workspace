"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_PROJECTS } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { useReveal } from "@agency/shared";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({ project, index }: { project: (typeof WORK_PROJECTS)[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const num = numRef.current;
    if (!card || !num) return;

    const xTo = gsap.quickTo(num, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(num, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      const bounds = card.getBoundingClientRect();
      const x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 20;
      const y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 20;
      xTo(x);
      yTo(y);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef });

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      data-magnetic
      className="flex flex-col group cursor-none"
    >
      {/* Image area */}
      <div className="relative bg-mist overflow-hidden mb-6" style={{ aspectRatio: "16/10" }}>
        <Image
          src={`/project-shots/${project.slug}-home.png`}
          alt={`${project.name} project screenshot`}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />

        {/* Ghost project number */}
        <span
          ref={numRef}
          className="absolute inset-0 flex items-center justify-center font-display text-[120px] text-stone/40 select-none pointer-events-none leading-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-500 flex items-center justify-center">
          <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            View project →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-display text-xl text-ink leading-tight">
            {project.name}
          </h3>
          <p className="text-sm text-dim mt-2">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end shrink-0">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const ref = useReveal<HTMLDivElement>({ y: 40, stagger: 0.08 });

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-paper">
        {/* Hero section */}
        <section className="py-32 px-8 md:px-16 border-b border-stone">
          <div className="max-w-4xl">
            <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-6">
              All work
            </h1>
            <p className="text-lg text-dim max-w-2xl">
              A curated selection of recent projects spanning SaaS, e-commerce, healthcare, and fashion.
            </p>
          </div>
        </section>

        {/* Grid section */}
        <section id="work" ref={ref} className="py-32 px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {WORK_PROJECTS.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
