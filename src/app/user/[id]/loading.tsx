import React from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex flex-1 items-center gap-4 px-2 sm:py-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <div className="hidden flex-col items-center gap-2 sm:flex-row sm:items-start lg:flex">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Skeleton className="h-6 w-32 rounded" />
                  </CardTitle>
                  <CardDescription className="-mt-1 flex items-center gap-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded" />
                    <Skeleton className="h-4 w-12 rounded" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded" />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </li>
                    <li className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </li>
                    <li className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </li>
                    <li className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="gap-4">
                  <div className="grid gap-3">
                    <Skeleton className="h-4 w-24 rounded" />
                    <div className="relative flex flex-wrap gap-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-6 w-24 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="gap-4">
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <div className="relative flex overflow-x-scroll scroll-auto">
                      {Array.from({ length: 7 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="m-0.5 h-1.5 w-1.5 lg:h-2.5 lg:w-2.5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-64 rounded" />
              </CardFooter>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <Skeleton className="h-4 w-24 rounded" />
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-min items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="sm:col-span-4">
                
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
