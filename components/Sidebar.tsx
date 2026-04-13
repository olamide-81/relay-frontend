"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = ["Directory", "Compare", "Pricing", "About"];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col justify-between bg-white p-6">
      <div>
        <div className="mb-10">
          <p className="text-base font-extrabold tracking-tight">relay</p>
          <p className="mono text-[11px] text-text-muted">by GrateBridge</p>
        </div>
        <nav className="space-y-3">
          {links.map((link) => (
            <a key={link} href="#" className="flex items-center justify-between text-sm text-text-primary hover:text-accent">
              <span>{link}</span>
              <span className="text-text-muted">›</span>
            </a>
          ))}
        </nav>
      </div>
      <div>
        <p className="mono mb-3 text-xs tracking-[0.22em] text-accent">START HERE</p>
        <div className="space-y-2">
          <button className="w-full rounded-sm bg-card-bg px-3 py-2 text-sm">Explore Directory</button>
          <button className="w-full rounded-sm bg-card-bg px-3 py-2 text-sm">Join Waitlist</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-[220px] border-r border-border-subtle lg:block">{content}</aside>
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-border-subtle bg-white p-4 lg:hidden">
        <div>
          <p className="text-sm font-extrabold">relay</p>
          <p className="mono text-[10px] text-text-muted">by GrateBridge</p>
        </div>
        <button onClick={() => setOpen((v) => !v)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {open && <aside className="fixed left-0 top-[57px] z-40 h-[calc(100vh-57px)] w-[220px] border-r border-border-subtle lg:hidden">{content}</aside>}
    </>
  );
}
