import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function RepositoryListLoading() {
  return (
    <Card className="relative max-h-full">
      <CardHeader className="pb-2">
        <CardDescription>
          <Skeleton className="h-4 w-24 rounded" />
        </CardDescription>
        <CardTitle className="text-4xl">
          <Skeleton className="h-8 w-12 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="py-2">
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="mt-2 h-4 w-3/4 rounded" />
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
