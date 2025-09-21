"use client";

import { ModeToggle } from "@/components/theme/mode-toggle";

export function Header() {
  return (
    <header className="absolute top-4 right-4">
      <ModeToggle />
    </header>
  );
}
