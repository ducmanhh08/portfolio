"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Command as CommandIcon, CornerDownLeft, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const sections = [
  { label: "Hero", id: "home" },
  { label: "Selected Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function GlobalPolish() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 420, mass: 0.18 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 420, mass: 0.18 });
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasFinePointer || reduceMotion) return;
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsHoveringInteractive(Boolean((event.target as HTMLElement | null)?.closest("a, button, input, textarea, select, [role='button']")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [hasFinePointer, mouseX, mouseY, reduceMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jumpTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {!reduceMotion && <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400" style={{ scaleX }} />}

      {hasFinePointer && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[80] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: isHoveringInteractive ? 2.25 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      <button type="button" onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/85 px-3 py-2 text-xs text-slate-300 shadow-xl shadow-black/30 backdrop-blur focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400" aria-label="Open command palette">
        <Search size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Jump to</span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem] sm:inline">⌘ K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/70 px-4 pt-[15vh] backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-label="Jump to section" className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl shadow-black/50">
            <Command>
              <div className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <CommandInput autoFocus placeholder="Jump to a section…" className="pl-12" />
              </div>
              <CommandList>
                <CommandEmpty>No matching section.</CommandEmpty>
                <CommandGroup heading="Navigate">
                  {sections.map(({ label, id }) => (
                    <CommandItem key={id} value={label} onSelect={() => jumpTo(id)}>
                      <CommandIcon aria-hidden="true" size={16} className="text-purple-300" />
                      <span className="flex-1">{label}</span>
                      <CornerDownLeft aria-hidden="true" size={14} className="text-slate-500" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
