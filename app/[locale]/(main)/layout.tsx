import type { Metadata } from "next";

// Components
import { BaseNavbar, BaseFooter } from "@/app/components";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BaseNavbar />

      <div className="flex flex-col">{children}</div>

      <BaseFooter />
    </>
  );
}
