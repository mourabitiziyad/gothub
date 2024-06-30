"use client";
import {
  CalendarIcon,
  FaceIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { useState, useEffect } from "react";
import useDebounce from "~/hooks/useDebounce";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import UserSkeleton from "./UserSkeleton";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

export function CommandBar() {
  const [query, setQuery] = useState<string>("");
  const queryClient = useQueryClient();

  const debouncedQuery = useDebounce(query, 300, (debouncedValue) => {
    if (debouncedValue) {
      queryClient.invalidateQueries({ queryKey: ["github", "getUsersList"] });
      console.log("debouncedValue");
    }
  });

  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.github.getUsersList.useQuery(
    { text: debouncedQuery },
    { enabled: debouncedQuery.length > 0 },
  );

  return (
    <div>
      <Command
        className="w-full rounded-lg border shadow-md"
        shouldFilter={false}
      >
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={(e) => setQuery(e)}
        />
        <CommandList className="max-h-fit">
          {isLoading && (
            <CommandGroup heading="Users">
              {Array.from({ length: 4 }).map((_, i) => (
                <UserSkeleton />
              ))}
            </CommandGroup>
          )}
          {isError && <CommandEmpty>Error: {error.message}</CommandEmpty>}
          {isSuccess && !users.length && (
            <div className="m-2 flex flex-col items-center justify-center gap-2">
              <Label className="m-2 text-center text-black">
                No results found
              </Label>
            </div>
          )}
          {isSuccess && users?.length > 0 && (
            <>
              <CommandGroup heading="Users">
                <ScrollArea className="max-h-40 overflow-y-auto">
                  {users.map((user) => (
                    <CommandItem key={user.id}>
                      <Link className="flex items-center w-full" href={`/user/${user.login}`}>
                        <img
                          src={user.avatarUrl}
                          alt={user.login}
                          className="mr-2 h-4 w-4 rounded-full"
                        />
                        <span>{user.login}</span>
                      </Link>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </>
          )}
          <>
            <CommandGroup heading="Recently Viewed">
              <CommandItem>
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <FaceIcon className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <RocketIcon className="mr-2 h-4 w-4" />
                <span>Launch</span>
              </CommandItem>
            </CommandGroup>
          </>
        </CommandList>
      </Command>
    </div>
  );
}
