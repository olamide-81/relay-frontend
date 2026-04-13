"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const seeded = (seed: number) => {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
};

interface BarVisualizationProps {
  bars?: number;
  height?: number;
  width?: number;
  accentRatio?: number;
  className?: string;
}

export function BarVisualization({
  bars = 42,
  height = 320,
  width = 440,
  accentRatio = 0.15,
  className,
}: BarVisualizationProps) {
  const config = useMemo(
    () =>
      Array.from({ length: bars }).map((_, idx) => {
        const progress = idx / bars;
        const wave = Math.sin(progress * Math.PI) * 0.6 + 0.4;
        const maxHeight = Math.max(20, Math.floor(height * wave));
        const r1 = seeded(idx + bars);
        const r2 = seeded(idx + width);
        const r3 = seeded(idx + height);
        return {
          id: idx,
          x: idx * (width / bars),
          maxHeight,
          accent: r1 < accentRatio,
          duration: 2 + r2 * 2,
          delay: r3 * 1.2,
        };
      }),
    [accentRatio, bars, height, width],
  );

  const barWidth = Math.max(2, Math.floor(width / bars) - 4);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      {config.map((bar) => (
        <motion.rect
          key={bar.id}
          x={bar.x}
          width={barWidth}
          rx={1}
          initial={{ height: bar.maxHeight * 0.45, y: height - bar.maxHeight * 0.45 }}
          animate={{ height: [bar.maxHeight * 0.45, bar.maxHeight], y: [height - bar.maxHeight * 0.45, height - bar.maxHeight] }}
          transition={{
            duration: bar.duration,
            delay: bar.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          fill={bar.accent ? "#1A56FF" : "#E4E4E7"}
        />
      ))}
    </svg>
  );
}
