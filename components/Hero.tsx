"use client";

import { motion } from "framer-motion";
import { BarVisualization } from "@/components/ui/BarVisualization";

export function Hero() {
  return (
    <section className="grid gap-12 border-b border-border-subtle px-6 py-16 md:px-10 xl:grid-cols-2 xl:items-end xl:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
        <h1 className="max-w-2xl text-[clamp(56px,8vw,96px)] font-extrabold leading-[1] tracking-[-0.03em] text-text-primary">
          Every fintech
          <br />
          provider.
          <br />
          One directory.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-text-secondary">
          Stop reading pitch decks. Relay maps every KYC, payout, FX, treasury, and compliance provider — across Africa, LATAM, Europe and beyond.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}>
        <BarVisualization className="h-[280px] w-full md:h-[360px]" />
      </motion.div>
    </section>
  );
}
