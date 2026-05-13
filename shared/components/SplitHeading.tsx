"use client";

import React, { ElementType, RefObject } from "react";
import { cn } from "../lib/utils";
import { useSplitText, SplitTextOptions } from "../animations/gsap/useSplitText";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface SplitHeadingProps {
  /** The text to display and animate */
  text: string;
  /** HTML tag to render. Default: 'h2' */
  as?: HeadingTag;
  /** SplitText options */
  options?: SplitTextOptions;
  className?: string;
}

/**
 * Convenience component for animated headings.
 *
 * Usage:
 *   <SplitHeading text="Build better." as="h1" />
 *   <SplitHeading text="Our Services" options={{ animateOn: 'scroll', type: 'words' }} />
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  options = {},
  className,
}: SplitHeadingProps) {
  const ref = useSplitText<HTMLElement>(options);

  return (
    <Tag ref={ref as RefObject<any>} className={cn(className)}>
      {text}
    </Tag>
  );
}
