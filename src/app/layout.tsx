import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { TooltipProvider } from "~/components/ui/tooltip";

export const metadata = {
  title: "Fetchub",
  description:
    "Fetchub is a T3 Stack implementation that allows your to query your GitHub repositories.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TooltipProvider delayDuration={10}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
