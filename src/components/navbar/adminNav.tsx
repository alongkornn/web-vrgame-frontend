"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Shield, LogOut, Joystick, User } from "lucide-react";

function AdminNav() {
  const router = useRouter();
  const currentPathName = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLHeadingElement>(null);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("Admin");

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

    const protectedPages = ["/user/checkpoints", "/user/rule"];
    if (!protectedPages.includes(currentPathName)) {
      router.push("/login");
    }
  };

  return (
    <div className="w-[350px] h-screen bg-gray-900 text-white flex flex-col p-5 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center space-x-5 mb-5">
        <Shield className="text-white" size={30} />
        <h1 className="font-bold text-[24px]">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 text-[20px]">
        <Link
          href="/admin/home"
          className={`flex items-center space-x-2 p-3 rounded-lg transition ${
            currentPathName === "/admin/home"
              ? "bg-indigo-500"
              : "hover:bg-gray-700"
          }`}
        >
          <Home size={20} />
          <span>Overview</span>
        </Link>

        <Link
          href="/admin/manage"
          className={`flex items-center space-x-2 p-3 rounded-lg transition ${
            currentPathName === "/admin/manage"
              ? "bg-indigo-500"
              : "hover:bg-gray-700"
          }`}
        >
          <Users size={20} />
          <span>Manage User</span>
        </Link>

        <Link
          href="/admin/playerskills"
          className={`flex items-center space-x-2 p-3 rounded-lg transition ${
            currentPathName === "/admin/playerskills"
              ? "bg-indigo-500"
              : "hover:bg-gray-700"
          }`}
        >
          <Joystick size={20} />
          <span>Player Skills</span>
        </Link>

        <Link
          href="/admin/profile"
          className={`flex items-center space-x-2 p-3 rounded-lg transition ${
            currentPathName === "/admin/profile"
              ? "bg-indigo-500"
              : "hover:bg-gray-700"
          }`}
        >
          <User size={20} />
          <span>Account</span>
        </Link>
      </nav>

      {/* User Section */}
      <div className="mt-auto">
        {isLogin ? (
          <div className="relative">
            <h1
              ref={usernameRef}
              className="cursor-pointer text-center py-2 bg-gray-700 rounded transition hover:bg-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {username.toUpperCase()}
            </h1>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute bottom-full mb-2 left-0 right-0 bg-white text-black rounded-md shadow-lg"
              >
                <ul>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                    <Link href="/admin/profile ">
                      <button>Profile</button>
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2"
                    onClick={() => {
                      setIsLogin(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className="w-full bg-indigo-500 text-white rounded px-6 py-2 mt-4">
            <Link href="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminNav;
