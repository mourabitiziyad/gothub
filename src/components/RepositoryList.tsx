"use client";
import { Package, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import type { Repository } from "~/server/api/routers/github";

export default function RepositoryList({
  repositories,
  params,
}: Readonly<{
  repositories: Repository[];
  params: { id: string };
}>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLanguageFilterChange = (value: string) => {
    setLanguageFilter(value);
  };

  const handleOwnerFilterChange = (value: string) => {
    setOwnerFilter(value);
  };

  const filteredRepositories = repositories.filter((node: Repository) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const matchesLanguage =
      languageFilter === "all" ||
      node.languages.nodes.some(
        (lang: { name: string; color: string }) =>
          lang.name.toLowerCase() === languageFilter.toLowerCase(),
      );

    const matchesOwner =
      ownerFilter === "all" ||
      (ownerFilter === "owned" && node.owner.login === params.id) ||
      (ownerFilter === "notOwned" && node.owner.login !== params.id);

    return matchesSearch && matchesLanguage && matchesOwner;
  });

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search repositories..."
          className="flex items-center"
        />
        <Select defaultValue="all" onValueChange={handleLanguageFilterChange}>
          <SelectTrigger className="w-1/3 rounded border p-2">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {Array.from(
              new Set(
                repositories.flatMap((repo: Repository) =>
                  repo.languages.nodes.map((lang: { name: string; color: string }) => lang.name),
                ),
              ),
            ).map((lang: string) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={handleOwnerFilterChange}>
          <SelectTrigger className="w-1/3 rounded border p-2">
            <SelectValue placeholder="Ownership" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Repositories</SelectItem>
            <SelectItem value="owned">Owned by Me</SelectItem>
            <SelectItem value="notOwned">Not Owned by Me</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative h-full">
        <ScrollArea className="h-[75vh] w-full">
          {filteredRepositories.map((node: Repository) => (
            <div key={node.name} className="py-2">
              <Link href={node.url} className="text-lg font-bold">
                {node.name}
              </Link>
              <p className="mb-4 text-sm">{node.description}</p>
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4" />
                <p className="text-sm">{node.stargazerCount}</p>
                <Package className="h-4 w-4" />
                <p className="text-sm">{node.forkCount}</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      src={node.owner.avatarUrl}
                      alt={node.owner.login}
                      className="h-4 w-4 rounded-lg"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-sm">{node.owner.login}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {node.languages.nodes.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: node.languages.nodes[0]?.color }}
                  />
                  <p className="text-xs font-medium">
                    {node.languages.nodes[0]?.name}
                  </p>
                </div>
              )}
              <Separator className="mt-4" />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
