"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { getCookie } from "../../../utils/jwt/getCookie";
import { decodeJWT } from "../../../utils/jwt/decodejwt";
import { usePathname, useRouter } from "next/navigation";

function AdminNav() {
  const router = useRouter();
  const currentPathName = usePathname();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");
      if (token) {
        const decodedToken = decodeJWT(token);
        if (decodedToken) {
          setUsername(decodedToken.username);
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
      }
    }
  }, [currentPathName]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        usernameRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !usernameRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setIsLogin(false);
    setUsername("");

    const protectedPages = ["/user/home", "/user/checkpoints", "/user/rule"];
    if (!protectedPages.includes(currentPathName)) {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-between text-white text-20">
      <h1 className="font-bold text-[40px]">Logo</h1>

      <div className="flex items-center space-x-20 text-[18px] font-bold">
        <Link
          href="/admin/home"
          className={`home hover:text-[#C8F321] ${
            currentPathName === "/admin/home" ? "text-[#C8F321]" : ""
          }`}
        >
          หน้าหลัก
        </Link>
        <Link
          href="/admin/rank"
          className={`home hover:text-[#C8F321] ${
            currentPathName === "/admin/rank" ? "text-[#C8F321]" : ""
          }`}
        >
          แรงค์
        </Link>
        <Link
          href="/admin/checkpoints"
          className={`home hover:text-[#C8F321] ${
            currentPathName === "/admin/checkpoints" ? "text-[#C8F321]" : ""
          }`}
        >
          ด่าน
        </Link>
        <Link
          href="/admin/rule"
          className={`home hover:text-[#C8F321] ${
            currentPathName === "/admin/rule" ? "text-[#C8F321]" : ""
          }`}
        >
          กฏการเล่น
        </Link>
        <div>
          {isLogin ? (
            <div className="flex items-center">
              <h1
                ref={usernameRef}
                className="text-white cursor-pointer"
                style={{
                  userSelect: "none",
                  marginRight: "2.5rem"
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {username.toUpperCase()}
              </h1>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute bg-white text-black rounded-md"
                  style={{
                    zIndex: 10,
                    marginTop: "8.2rem",
                    right: "1rem",
                    paddingTop: "0.5rem",
                    userSelect: "none",
                    width: "9.4rem",
                    textAlign: "center"
                  }}
                >
                  <ul>
                    <li className="cursor-pointer px-4 py-2">
                      <Link href="/admin/profile">โปรไฟล์</Link>
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      ออกจากระบบ
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="bg-[#C8F321] text-black rounded-[20px] px-6 py-2 flex items-center justify-center">
              <Link href="/login">เข้าสู่ระบบ</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
