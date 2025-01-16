"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navbar/nav";
import AdminNav from "@/components/navbar/adminNav";
import { getCookie } from "../../utils/jwt/getCookie"; // ฟังก์ชั่นที่ใช้ดึง cookie
import { jwtDecode } from "jwt-decode"; // ใช้สำหรับถอดรหัส JWT

export default function NavWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenNavPaths = [
    "/login",
    "/register",
    "/admin/home",
    "/admin/manage"
  ];
  const hiddenNavUserPaths = ["/user/home", "/user/rank", "/user/profile"];

  // ดึง JWT Token จาก cookie
  const token = getCookie("token"); // คาดว่า token เก็บใน cookie ชื่อ "token"
  let userRole = null;

  // ถอดรหัส JWT Token ถ้ามี
  if (token) {
    const decodedToken: any = jwtDecode(token);
    userRole = decodedToken.role; // สมมติว่า role อยู่ใน token
  }

  return (
    <>
      {/* ตรวจสอบว่าไม่อยู่ในเส้นทางที่ไม่ต้องการ navbar */}
      {!hiddenNavPaths.includes(pathname) &&
        !hiddenNavUserPaths.includes(pathname) && (
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
