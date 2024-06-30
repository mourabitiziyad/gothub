import React from "react";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.github.getUserInfo({ username: params.id });

  return (
  <div className="p-4">
    <div className="flex items-center gap-2">
      <img
        src={user.avatarUrl}
        alt={user.login}
        className="h-10 w-10 rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold">{user.login}</h1>
        <p className="text-sm">{user.bio}</p>
      </div>
    </div>

    <div className="mt-4">
      <h1>{user.name}</h1>
    </div>
  </div>
  );
}
