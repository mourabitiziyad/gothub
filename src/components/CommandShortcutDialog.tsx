"use client";
import { useEffect, useState } from "react";
import { CommandBar } from "./CommandBar";
import { CommandDialog } from "./ui/command";

export function CommandShortcutDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandBar />
    </CommandDialog>
  );
}
