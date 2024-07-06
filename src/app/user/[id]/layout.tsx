import React from "react";
import Header from "~/components/Header";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      {/* <Header params={params} /> */}
      {children}
    </div>
  );
}
