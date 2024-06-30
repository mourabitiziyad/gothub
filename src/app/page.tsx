import { CommandBar } from "~/components/CommandBar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-slate-400 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="w-1/2">
        <CommandBar />
        </div>
      </div>
    </main>
  );
}
