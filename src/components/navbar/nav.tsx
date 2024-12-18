"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { getCookie } from "../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import { decodeJWT } from "../../../utils/jwt/decodeJWT";

interface Props {
  page: string;
}

function Nav({ page }: Props) {
  const [isLogin, setIsLogin] = useState<boolean>();
  const [username, setUsername] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        setUsername(decodedToken.username); // ดึง username จาก token
        setIsLogin(true); // ผู้ใช้ล็อกอินแล้ว
      }
    } else {
      setIsLogin(false); // ผู้ใช้ยังไม่ได้ล็อกอิน
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // ลบ cookie
    setIsLogin(false);
    setUsername("");
    if (page != "home" && page != "checkpoints" && page != "rule") {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-between text-white text-20">
      <h1 className="font-bold text-[40px]">Logo</h1>

      <div className="flex items-center space-x-20 text-[18px] font-bold">
        <Link
          href="/home"
          className={`home hover:text-[#C8F321] ${
            page === "home" ? "text-[#C8F321]" : ""
          }`}
        >
          หน้าหลัก
        </Link>
        <Link
          href="/rank"
          className={`home hover:text-[#C8F321] ${
            page === "rank" ? "text-[#C8F321]" : ""
          }`}
        >
          แรงค์
        </Link>
        <Link
          href="/checkpoints"
          className={`home hover:text-[#C8F321] ${
            page === "checkpoint" ? "text-[#C8F321]" : ""
          }`}
        >
          ด่าน
        </Link>
        <Link
          href="/rules"
          className={`home hover:text-[#C8F321] ${
            page === "rules" ? "text-[#C8F321]" : ""
          }`}
        >
          กฏการเล่น
        </Link>
        <div>
          {isLogin ? (
            <div className="flex items-center">
              <h1
                className="text-white cursor-pointer"
                style={{
                  userSelect: "none",
                  marginRight: "1rem"
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {username.toUpperCase()}
              </h1>
              {dropdownOpen && (
                <div
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
                      <Link href="#">โปรไฟล์</Link>
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer"
                      onClick={handleLogout} // เมื่อคลิก logout, ลบ token
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

export default Nav;
