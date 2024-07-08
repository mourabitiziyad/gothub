import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="group flex items-center justify-center gap-2 rounded-full md:h-8 md:w-8"
              >
                <GitHubLogoIcon className="h-6 w-6 transition-all group-hover:scale-125" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">
              <span>Home</span>
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      {children}
    </div>
  );
}
