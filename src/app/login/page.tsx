"use client";

import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../utils/api-url/api.url";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState({});
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
          withCredentials: true // เปิดการส่งคุกกี้
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        router.push("/home"); // Redirect ไปหน้า /home
      }
    } catch (error) {
      await alert("Fail to login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
