"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DefaultInput } from "../../../utils/input-form/defaultinput";

export default function Page() {
  const [data, setData] = useState(DefaultInput);
  const [isValidEmail, setIsValidEmail] = useState(true); // สถานะ
  const [isValidPassword, setIsValidPassword] = useState(true); // สถานะ
  const router = useRouter();

  // ตรวจสอบอีเมล
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ตรวจสอบรหัสผ่าน
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "email") {
      setIsValidEmail(validateEmail(value)); // ตรวจสอบอีเมล
    }

    if (name === "password") {
      setIsValidPassword(validatePassword(value)); // ตรวจสอบรหัสผ่าน
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      alert("กรุณากรอกอีเมลที่ถูกต้อง!");
      return;
    }

    if (!isValidPassword) {
      alert("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร!");
      return;
    }

    if (!data.firstname || !data.lastname) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/register`,
        data
      );

      if (response.status === 200) {
        alert(response.data.message);
        router.push("/login"); // Redirect ไปหน้า /login
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="text-center bg-white rounded-[20px] text-[#000]"
        style={{
          width: "500px",
          height: "520px"
        }}
      >
        <h1 className="text-[32px] mt-5 font-bold">Sign up</h1>
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <span className="mr-3 font-bold">Firstname</span>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={data.firstname}
              onChange={handleChange}
              className="p-2 ml-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                width: "300px"
              }}
            />
          </div>

          <div className="mb-4">
            <span className="mr-3 font-bold">Lastname</span>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={data.lastname}
              onChange={handleChange}
              className="p-2 ml-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                width: "300px"
              }}
            />
          </div>

          <div className="mb-4">
            <span className="mr-3 font-bold">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                isValidEmail
                  ? "border-gray-300 focus:ring-blue-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              style={{
                width: "300px",
                marginLeft: "3.5rem"
              }}
            />
            {!isValidEmail && (
              <p className="text-red-500 mt-1">รูปแบบอีเมลไม่ถูกต้อง</p>
            )}
          </div>

          <div className="mb-4">
            <span className="mr-3 font-bold">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className={`p-2 ml-6 border rounded-md focus:outline-none focus:ring-2 ${
                isValidPassword
                  ? "border-gray-300 focus:ring-blue-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
              style={{
                width: "300px"
              }}
            />
            {!isValidPassword && (
              <p className="text-red-500 mt-1">
                รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 bg-[#C8F321] text-black rounded-[20px] px-6 py-1 font-bold"
            disabled={!isValidEmail || !isValidPassword}
          >
            Register
          </button>
        </form>

        <p className="font-bold mt-5">
          Already have an account?{" "}
          <Link className="text-[#4282DA]" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
