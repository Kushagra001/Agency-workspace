"use client";

import React, { ElementType, ComponentPropsWithoutRef } from "react";
import { useReveal, RevealOptions } from "../animations/gsap/useReveal";

type RevealProps<E extends ElementType = "div"> = {
  as?: E;
  options?: RevealOptions & { target?: "children" | "self" };
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Drop-in wrapper that applies scroll reveal to any element.
 *
 * Usage:
 *   <Reveal options={{ stagger: 0.1, y: 40 }}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </Reveal>
 *
 *   <Reveal as="section" options={{ y: 80, duration: 1.2 }}>
 *     <h2>...</h2>
 *   </Reveal>
 */
export function Reveal<E extends ElementType = "div">({
  as,
  options = {},
  children,
  ...rest
}: RevealProps<E>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useReveal<HTMLElement>(options);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
