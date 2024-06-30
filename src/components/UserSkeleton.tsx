import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function UserSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 m-2">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-3 w-full py-2" />
    </div>
  );
}
