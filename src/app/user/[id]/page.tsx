import React from "react";
import { api } from "~/trpc/server";
import {
  Building2,
  Copy,
  LinkIcon,
  Mail,
  MapPin,
  Package,
  Settings,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "~/components/ui/separator";
import { CommandShortcutDialog } from "~/components/CommandShortcutDialog";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.github.getUserInfo({ username: params.id });

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
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex flex-1 items-center gap-4 px-2 sm:py-4">
            <Label className="text-lg">Profile</Label>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
            <Label className="text-sm">Search</Label>
            <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-sm">⌘</span>K
            </kbd>
            <CommandShortcutDialog />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-xl">
                    {user.name}
                  </CardTitle>
                  <CardDescription className="group -mt-1 text-muted-foreground">
                    {user.login}
                    <Button
                      size="icon"
                      variant="outline"
                      className="ml-2 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100"
                      // copy to clipboard
                      // onClick={() => {
                      //   navigator.clipboard.writeText(user.login);
                      // }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <p className="font-semibold">Overview</p>
                  <p className="text-md">{user.bio}</p>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <p className="text-sm">
                      <span className="font-semibold">
                        {user.followers.totalCount}
                      </span>{" "}
                      followers ·{" "}
                      <span className="font-semibold">
                        {user.following.totalCount}
                      </span>{" "}
                      following
                    </p>
                    <StarIcon className="h-4 w-4" />
                    <p className="text-sm">
                      {user.starredRepositories.totalCount}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <LinkIcon className="h-4 w-4" />
                        Website
                      </span>
                      <Link
                        href={user.websiteUrl ?? "#"}
                        className="text-sm hover:underline"
                      >
                        {user.websiteUrl}
                      </Link>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        Email
                      </span>
                      <span className="text-sm">{user.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Location
                      </span>
                      <span className="text-sm">{user.location}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        Company
                      </span>
                      <span className="text-sm">{user.company}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="gap-4">
                  <div className="grid gap-3">
                    <p className="font-semibold">Organizations</p>
                    <div className="relative flex flex-wrap gap-2">
                      {user.organizations.nodes.map((organization) => (
                        <Tooltip key={organization.id}>
                          <TooltipTrigger asChild>
                            <div
                              key={organization.id}
                              className="relative inline-flex max-w-[15rem] items-center gap-2 rounded-full bg-muted/50 px-2 py-1 text-sm"
                            >
                              <img
                                className="h-4 w-4 rounded-sm"
                                src={organization.avatarUrl}
                                alt={organization.login}
                              />
                              <Label className="truncate text-sm">
                                {organization.login}
                              </Label>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <span>{organization.login}</span>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  {user.login}
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-min items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="col-span-1 hidden sm:block">
                <Card className="relative m-0 h-full w-full overflow-hidden p-0">
                  <div className="relative h-full w-full">
                    <img
                      src={user.avatarUrl}
                      alt={user.login}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Card>
              </div>
              <div className="sm:col-span-3">
                <Card className="relative min-h-52">
                  <CardHeader className="pb-2">
                    <CardDescription>Contributions</CardDescription>
                    <CardTitle className="text-4xl">
                      {user.contributionsCollection.totalCommitContributions}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex w-full overflow-x-scroll pb-10">
                    {user.contributionsCollection.contributionCalendar.weeks.map(
                      (week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col">
                          {week.contributionDays.map((day, dayIndex) => (
                            <Tooltip disableHoverableContent key={dayIndex}>
                              <TooltipTrigger className="m-0.5" asChild>
                                <span
                                  className="h-2.5 w-2.5"
                                  style={{
                                    backgroundColor: day.color,
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                {day.contributionCount} contribution
                                {day.contributionCount > 1 ? "s" : ""} on{" "}
                                {new Date(day.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      ),
                    )}
                    <CardFooter className="absolute bottom-2 left-0 gap-2 px-6 py-3">
                      <div className="text-xs text-muted-foreground">
                        Contributions made in the past year
                      </div>
                    </CardFooter>
                  </CardContent>
                </Card>
              </div>
              <div className="sm:col-span-4">
                <Card className="relative min-h-52">
                  <CardHeader className="pb-2">
                    <CardDescription>Repositories</CardDescription>
                    <CardTitle className="text-4xl">
                      {user.repositories.totalCount}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex w-full overflow-x-scroll">
                    {user.repositories.nodes.map((repository) => (
                      <div key={repository.name} className="flex flex-col">
                        <a href={repository.url} className="text-sm">
                          {repository.name}
                        </a>
                        <p className="text-sm">{repository.description}</p>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4" />
                          <p className="text-sm">
                            {/* {repository.stargazers} */}
                          </p>
                          <Package className="h-4 w-4" />
                          <p className="text-sm">
                            {/* {repository.forks.totalCount} */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center gap-2">
  <img
    src={user.avatarUrl}
    alt={user.login}
    className="h-14 w-14 rounded-full"
  />
  <div>
    <h1 className="text-2xl font-bold">{user.name}</h1>
    <p className="text-sm">{user.bio}</p>
    <div className="flex gap-2 items-center">
      <UsersIcon className="h-4 w-4" />
      <p className="text-sm">{user.followers.totalCount} followers · {user.following.totalCount} following</p>
      <StarIcon className="h-4 w-4" />
      <p className="text-sm">{user.starredRepositories.totalCount}</p>
    </div>
    <div className="flex gap-2 items-center">
    </div>
  </div>
</div>

<code>{JSON.stringify(user, null, 2)}</code> */
}
