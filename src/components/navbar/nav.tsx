"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

interface Props {
  page: string;
}

function Nav({ page }: Props) {
  const [isLogin, setIsLogin] = useState<boolean>();
  const [username, setUsername] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // ใช้ ref เพื่อเช็คการคลิกภายนอก
  const userMenuRef = useRef<HTMLDivElement | null>(null); // ใช้ ref สำหรับชื่อผู้ใช้และไอคอน

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

    // ฟังก์ชันสำหรับการตรวจจับคลิกภายนอกเมนู dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // ปิดเมนูถ้าคลิกนอกเมนู
      }
    };

    // ฟังการคลิกภายนอกเมื่อ dropdown เปิด
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // ลบ event listener เมื่อ component unmount
    };
  }, [dropdownOpen]);

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return undefined;
  };

  const decodeJWT = (token: string): any => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // ลบ cookie
    setIsLogin(false);
    setUsername("");
  };

  return (
    <div className="flex items-center justify-between text-white text-20 my-8 px-8">
      <h1 className="font-bold text-[40px]">Logo</h1>

      <div className="flex items-center space-x-20 text-[16px] font-bold">
        <Link
          href="/home"
          className={`home hover:text-[#C8F321] ${
            page === "home" ? "text-[#C8F321]" : ""
          }`}
        >
          HOME
        </Link>
        <Link
          href="/rank"
          className={`home hover:text-[#C8F321] ${
            page === "rank" ? "text-[#C8F321]" : ""
          }`}
        >
          RANK
        </Link>
        <Link
          href="/"
          className={`home hover:text-[#C8F321] ${
            page === "checkpoint" ? "text-[#C8F321]" : ""
          }`}
        >
          CHECKPOINT
        </Link>
        <Link
          href="/rules"
          className={`home hover:text-[#C8F321] ${
            page === "rules" ? "text-[#C8F321]" : ""
          }`}
        >
          RULES
        </Link>
        <div>
          {isLogin ? (
            <div className="flex items-center">
              <h1
                className=" cursor-pointer bg-[#F34822] text-white text-[19px] font-bold shadow-lg py-0.5"
                style={{
                  marginRight: "5rem",
                  marginTop: "0.3rem",
                  userSelect: "none",
                  borderRadius: "50px",
                  paddingLeft: "0.7rem",
                  width: 35,
                  height: 35
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {username[0].toUpperCase()}
              </h1>
              {dropdownOpen && (
                <div
                  className="absolute bg-white text-black rounded-md shadow-lg py-2"
                  style={{
                    zIndex: 10,
                    marginTop: "9rem",
                    marginRight: "15rem",
                    paddingRight: "0.99rem",
                    userSelect: "none"
                  }}
                >
                  <ul>
                    <li className="hover:bg-[#BCBCC6] hover:text-white cursor-pointer px-4 py-2">
                      <Link href="#">Profile</Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-[#BCBCC6] hover:text-white cursor-pointer"
                      onClick={handleLogout} // เมื่อคลิก logout, ลบ token
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="bg-[#C8F321] text-black rounded-[20px] px-6 py-2 flex items-center justify-center">
              <Link href="/login">LOGIN</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
