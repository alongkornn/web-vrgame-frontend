"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/register`,
        data
      );

      if (response.status === 200) {
        await alert(response.data.message);
        router.push("/login"); // Redirect ไปหน้า /login
      }
    } catch (error) {
      await alert("Email is already");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="text-center bg-white rounded-[20px] text-[#000]"
        style={{
          width: "500px",
          height: "620px"
        }}
      >
        <h1 className="text-[32px] mt-5 font-bold">Sign up</h1>
        <form className="mt-10">
          <span className="mr-3 font-bold">Firstname</span>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={(e) => handleChange(e)}
            className="p-2 ml-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
          <br />
          <br />

          <span className="mr-3 font-bold">Lastname</span>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => handleChange(e)}
            className="p-2 ml-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
          <br />
          <br />

          <span className="mr-3 font-bold">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px",
              marginLeft: "3.5rem"
            }}
          />
          <br />
          <br />

          <span className="mr-3 font-bold">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            className="p-2 ml-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
          <br />
          <br />

          <span className="mr-3 font-bold">Class</span>
          <input
            type="text"
            name="class"
            placeholder="Class"
            onChange={(e) => handleChange(e)}
            className="p-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px",
              marginLeft: "3.5rem"
            }}
          />
          <br />
          <br />

          <span className="mr-3 font-bold">Number</span>
          <input
            type="text"
            name="number"
            placeholder="Number"
            onChange={(e) => handleChange(e)}
            className="p-2 ml-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: "300px"
            }}
          />
        </form>

        <button
          className="mt-8  bg-[#C8F321] text-black rounded-[20px] px-6 py-1 font-bold"
          onClick={handleSubmit}
        >
          Register
        </button>

        <p className="font-bold mt-5">
          Alread have an account?{" "}
          <Link className="text-[#4282DA]" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
