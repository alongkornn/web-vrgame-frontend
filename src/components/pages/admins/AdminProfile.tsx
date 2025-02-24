"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { DefaultUser, User } from "../../../../utils/user/user";

const AdminProfile = () => {
  const [user, setUser] = useState<User>(DefaultUser);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = decodeJWT(token);
    if (decodedToken.role !== "admin") {
      router.push("/login");
      return;
    }

    console.log(decodedToken);
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/admin/${decodedToken.user_id}`,
          {
            withCredentials: true
          }
        );

        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-10">
      <h1 className="text-5xl font-bold text-gray-900">Account</h1>

      {/* Container */}
      <div className="flex w-full max-w-6xl bg-white shadow-md rounded-lg mt-10 p-[5rem] ml-[15rem]">
        {/* Profile Card */}
        <div className="w-1/3 flex flex-col items-center border-r pr-6 font-[10rem]">
          <img
            src="/logo-vr.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
          />
          <h2 className="mt-4 text-xl">
            {user.firstname || ""} {user.lastname || ""}
          </h2>
          <p className="text-gray-500">{user.email || "Location not set"}</p>
        </div>

        {/* Profile Form */}
        <div className="w-2/3 pl-6">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-gray-500 text-sm mb-4">
            The information can be edited
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="border p-2 rounded-md w-full"
              placeholder="First name"
              value={user.firstname}
            />
            <input
              type="text"
              className="border p-2 rounded-md w-full"
              placeholder="Last name"
              value={user.lastname}
            />
            <input
              type="email"
              className="border p-2 rounded-md w-full"
              placeholder="Email address"
              value={user.email}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-md shadow hover:bg-indigo-500">
              Save details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
