import { CommandBar } from "~/components/CommandBar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-2xl font-bold tracking-tight sm:text-[5rem]">
          git fetch all-users
        </h1>
        <div className="w-full max-w-2xl">
        <CommandBar />
        </div>
      </div>
    </main>
  );
}
