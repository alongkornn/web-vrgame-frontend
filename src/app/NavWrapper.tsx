"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Nav from "@/components/navbar/nav";
import AdminNav from "@/components/navbar/adminNav";
import { getCookie } from "../../utils/jwt/getCookie";
import { jwtDecode } from "jwt-decode";

export default function NavWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenNavUserPaths = ["/login", "/register"];

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // ดึง Token เฉพาะบน Client
    const token = getCookie("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken.role || null);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <>
      {/* ตรวจสอบว่าไม่อยู่ในเส้นทางที่ไม่ต้องการ navbar */}
      {!hiddenNavUserPaths.includes(pathname) && (
        <>
          {/* แสดง Navbar ของ Admin ถ้า role เป็น admin */}
          {userRole === "admin" && <AdminNav />}

          {/* แสดง Navbar ของ Player ถ้า role เป็น player */}
          {userRole === "player" && <Nav />}
        </>
      )}
      {children}
    </>
  );
}
