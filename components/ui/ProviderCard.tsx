"use client";

import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Provider } from "@/types";
import { Tag } from "@/components/ui/Tag";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const initials = provider.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="rounded-md border border-border-subtle bg-white p-5 transition-colors duration-150 hover:border-accent"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="mono flex h-9 w-9 items-center justify-center rounded-sm bg-card-bg text-sm text-accent">
            {initials}
          </div>
          <h4 className="text-[15px] font-semibold text-text-primary">{provider.name}</h4>
        </div>
        <Tag accent>{provider.category}</Tag>
      </div>
      <p className="mb-4 text-sm text-text-secondary">{provider.desc}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {provider.regions.map((region) => (
          <Tag key={region}>🌍 {region}</Tag>
        ))}
      </div>
      <div className="mono mb-3 flex items-center justify-between text-xs">
        <p className="flex items-center gap-2 text-text-secondary">
          <span className="h-2 w-2 rounded-full bg-success" />
          {provider.uptime} uptime
        </p>
        <span className="text-sm font-medium text-accent">View →</span>
      </div>
      <div className="border-t border-border-subtle pt-3">
        <div className="mono rounded-sm bg-[#f7f7f7cc] px-3 py-2 text-xs text-text-muted backdrop-blur-[4px]">
          <p>Fee data · Rate tables · Integration score</p>
          <p className="mt-1 flex items-center gap-1">
            <Lock size={12} />
            Get Access
          </p>
        </div>
      </div>
    </motion.article>
  );
}
