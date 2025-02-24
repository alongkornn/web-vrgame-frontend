"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";

export default function Login() {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const router = useRouter();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/login`,
        data,
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        const token = getCookie("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const decodedToken = decodeJWT(token);
        const userRole = decodedToken.role;

        setTimeout(() => {
          if (userRole === "admin") {
            router.push("/admin/home");
          } else if (userRole === "player") {
            router.push("/");
          } else {
            setAlert({ message: "Invalid user role", severity: "error" });
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="text-center bg-white text-[#000] rounded-[20px]"
        style={{
          width: "500px",
          height: "380px"
        }}
      >
        <h1 className="text-[32px] mt-5 font-bold">Sign in</h1>
        <form className="mt-10">
          <label className="mr-3 font-bold">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-2 ml-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
          <br />
          <br />
          <label className="mr-3 font-bold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
        </form>

        <button
          className="mt-8 mb-10 bg-[#C8F321] text-black rounded-[20px] px-6 py-1 font-bold"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="font-bold">
          Don't have an account?{" "}
          <Link className="text-[#4282DA]" href="/register">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
