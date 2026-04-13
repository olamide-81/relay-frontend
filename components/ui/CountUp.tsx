"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
}

export function CountUp({ value, suffix = "" }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.floor(value * p));
      if (p < 1) frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
