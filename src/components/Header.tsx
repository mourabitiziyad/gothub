import Link from "next/link";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { CommandShortcutDialog } from "./CommandShortcutDialog";

export default function Header({ params }: { params: { id: string } }) {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-white px-4 shadow-sm md:px-6 md:py-8">
      <nav className="w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <GitHubLogoIcon className="h-10 w-10" />
            </Link>
            <Link
              href={`/user/${params.id}`}
              className="min-w-fit text-lg font-medium transition-colors hover:text-foreground"
            >
              {params.id}
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <p>Search</p>
            <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
            <CommandShortcutDialog />
          </div>
        </div>
      </nav>
    </header>
  );
}
