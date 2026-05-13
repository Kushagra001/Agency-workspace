"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_PROJECTS } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReveal } from "@agency/shared";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({
  project,
  index,
}: {
  project: (typeof WORK_PROJECTS)[number];
  index: number;
}) {
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
      const x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 30;
      const y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 30;
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
      className="w-[70vw] max-w-[900px] flex-shrink-0 flex flex-col group cursor-none"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-mist" style={{ aspectRatio: "16/10" }}>
        <Image
          src={`/project-shots/${project.slug}-home.png`}
          alt={`${project.name} project screenshot`}
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 70vw"
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
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-500 flex items-center justify-center z-10">
          <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            View project →
          </span>
        </div>

        {/* subtle scale wrapper */}
        <div className="absolute inset-0 flex items-start justify-center p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] origin-top pointer-events-none" />
      </div>

      {/* Info row: 35% */}
      <div className="flex items-start justify-between pt-5 gap-8 pb-6">
        <div className="flex-1">
          <h3 className="font-display text-2xl text-ink leading-tight">
            {project.name}
          </h3>
          <p className="text-sm text-dim mt-1">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end flex-shrink-0">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

function WorkDesktop() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const allWorkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const allWork = allWorkRef.current;
    if (!container || !track) return;

    // Wait for layout to settle before measuring
    gsap.delayedCall(0.1, () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalScroll = trackWidth - viewportWidth + 128; // + padding

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            // Fade in "See all work" when horizontal scroll ends
            if (allWork) {
              gsap.to(allWork, { opacity: 1, duration: 0.4 });
            }
          },
          onEnterBack: () => {
            if (allWork) {
              gsap.to(allWork, { opacity: 0, duration: 0.2 });
            }
          },
        },
      });

      tl.to(track, {
        x: -totalScroll,
        ease: "none",
      });
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="relative">
      {/* Section label — scrolls away before pin starts */}
      <p className="text-[11px] tracking-widest text-dust uppercase mb-8 px-8 md:px-16">
        Selected Work
      </p>

      {/* Horizontal track — this gets translated on scroll */}
      <div
        ref={trackRef}
        className="flex gap-6 px-8 md:px-16"
        style={{ width: "max-content" }}
      >
        {WORK_PROJECTS.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* "See all work" — appears after horizontal track ends */}
      <div
        ref={allWorkRef}
        className="px-8 md:px-16 pt-16 opacity-0"
      >
        <Link
          href="/work"
          className="text-sm text-dim hover:text-ink transition-colors"
        >
          See all work →
        </Link>
      </div>
    </section>
  );
}

function WorkMobile() {
  const ref = useReveal<HTMLElement>({ y: 40, stagger: 0.15 });

  return (
    <section id="work" ref={ref} className="py-32 px-8 md:px-16">
      <p className="text-[11px] tracking-widest text-dust uppercase mb-12">
        Selected Work
      </p>
      <div className="space-y-8">
        {WORK_PROJECTS.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export function Work() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return isMobile ? <WorkMobile /> : <WorkDesktop />;
}
