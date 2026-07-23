"use client";

import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn("flex h-full w-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-slate-100", className)}
    {...props}
  />
);

const CommandInput = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) => (
  <CommandPrimitive.Input
    className={cn("h-14 w-full border-0 border-b border-white/10 bg-transparent px-5 text-base text-white outline-none placeholder:text-slate-500", className)}
    {...props}
  />
);

const CommandList = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn("max-h-80 overflow-y-auto p-2", className)} {...props} />
);

const CommandEmpty = (props: React.ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className="px-4 py-8 text-center text-sm text-slate-400" {...props} />
);

const CommandGroup = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group className={cn("overflow-hidden p-1 text-slate-400 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em]", className)} {...props} />
);

const CommandItem = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn("flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 outline-none data-[selected=true]:bg-purple-500/20 data-[selected=true]:text-white", className)}
    {...props}
  />
);

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList };
