"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  page: string;
}

function Nav({ page }: Props) {
  const [isLogin, setIsLogin] = useState<boolean>(false);

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
          href="/player"
          className={`home hover:text-[#C8F321] ${
            page === "player" ? "text-[#C8F321]" : ""
          }`}
        >
          PLAYER
        </Link>
        <Link
          href="/"
          className={`home hover:text-[#C8F321] ${
            page === "rank" ? "text-[#C8F321]" : ""
          }`}
        >
          RANK
        </Link>
        <Link
          href="/manage"
          className={`home hover:text-[#C8F321] ${
            page === "manage" ? "text-[#C8F321]" : ""
          }`}
        >
          MANAGE PLAYER
        </Link>
        <div>
          {isLogin == false ? (
            <button className="bg-[#C8F321] text-black rounded-[20px] px-6 py-2 flex items-center justify-center">
              <Link href="/login">LOGIN</Link>
            </button>
          ) : (
            <h1 className="hover:text-[#C8F321] cursor-pointer">PROFILE</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
