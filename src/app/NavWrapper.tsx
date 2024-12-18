"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navbar/nav";

export default function NavWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenNavPaths = ["/login", "/register"];

  return (
    <>
      {!hiddenNavPaths.includes(pathname) && <Nav />}
      {children}
    </>
  );
}
