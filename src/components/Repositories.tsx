import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { api } from "~/trpc/server";
import RepositoryList from "./RepositoryList";

export default async function Repositories({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const data = await api.github.getUserRepositories({ username: params.id });

  return (
    <Card className="relative max-h-full">
      <CardHeader className="pb-2">
        <CardDescription>Repositories</CardDescription>
        <CardTitle className="text-4xl">
          {data.user.repositories.totalCount || 0}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {data.user.repositories.nodes.length === 0 && (
          <p>No repositories found</p>
        )}
        <RepositoryList repositories={data.user.repositories.nodes} params={params} />
      </CardContent>
    </Card>
  );
}
