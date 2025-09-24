"use client";

import { PanelLeft } from "lucide-react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { HeaderLink } from "@/components/header-link";

export function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between p-4 gap-4 h-16">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="size-7"
        >
          <PanelLeft className="size-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <HeaderLink />
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant={"default"}>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant={"outline"}>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </header>
  );
}
