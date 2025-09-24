import Link from "next/link";
import { Building } from "lucide-react";

export function HeaderLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors duration-200"
    >
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Building className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-bold text-lg">Municipal Services</span>
      </div>
    </Link>
  );
}
