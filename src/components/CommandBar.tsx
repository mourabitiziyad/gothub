"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { useState, useCallback, useEffect } from "react";
import useDebounce from "~/hooks/useDebounce";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import UserSkeleton from "./UserSkeleton";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import {
  addRecentlyViewedUser,
  getRecentlyViewedUsers,
} from "~/lib/recentlyviewed";
import { User } from "~/server/api/routers/github";

export function CommandBar() {
  const [query, setQuery] = useState<string>("");
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState<User[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setRecentlyViewedUsers(getRecentlyViewedUsers());
  }, []);

  const handleDebouncedQuery = useCallback(
    async (debouncedValue: string) => {
      if (debouncedValue) {
        await queryClient.invalidateQueries({
          queryKey: ["github", "getUsersList"],
        });
      }
    },
    [queryClient],
  );

  const debouncedQuery = useDebounce(query, 250, handleDebouncedQuery);

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
    <Command
      className="w-full rounded-lg border shadow-md"
      shouldFilter={false}
    >
      <CommandInput
        placeholder="Search Github users..."
        value={query}
        onValueChange={(e) => setQuery(e)}
      />
      <CommandList className="max-h-fit">
        {isLoading && (
          <CommandGroup heading="Users">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserSkeleton key={i} />
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
          <CommandGroup heading="Users">
            <ScrollArea className="max-h-40 overflow-y-auto">
              {users.map((user) => (
                <CommandItem key={user.id}>
                  <Link
                    onClick={() => addRecentlyViewedUser(user)}
                    className="flex w-full items-center"
                    href={`/user/${user.login}`}
                  >
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
        )}
        {recentlyViewedUsers.length > 0 && (
          <CommandGroup heading="Recently Viewed">
            {recentlyViewedUsers.map((user: User) => (
              <CommandItem key={user.login}>
                <Link
                  onClick={() => addRecentlyViewedUser(user)}
                  className="flex w-full items-center"
                  href={`/user/${user.login}`}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.login}
                    className="mr-2 h-4 w-4 rounded-full"
                  />
                  <span>{user.login}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
