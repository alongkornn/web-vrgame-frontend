"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../utils/jwt/decodejwt";
import { DefaultUser, User } from "../../../utils/user/user";

const Profile = () => {
  const [user, setUser] = useState<User>(DefaultUser);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = decodeJWT(token);

    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${decodedToken.user_id}`,
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
        console.error("Error during API request:", error);
        router.push("/login");
      }
    };

    getUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center text-white font-bold mt-10">
      {/* Profile Header */}
      <div className="text-center">
        <div className="flex flex-col items-center">
          <img
            src={"/vercel.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-600"
          />
          <h1 className="mt-4 text-2xl">
            {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {"Always playing strategy games..."}
          </p>
          <p className="mt-3 text-[#BCBCC6]">LEVEL {user.level}</p>
          <div className="w-full max-w-md mt-3 bg-gray-700 rounded-full h-4">
            <div
              className="bg-yellow-400 h-4 rounded-full"
              style={{ width: "30px" }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {370} XP until level {user.level + 1}
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <span className="text-red-500 text-2xl">🔥</span>
            <p className="text-gray-400 mt-2">Day Streak</p>
            <p>{0}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <span className="text-yellow-500 text-2xl">🏆</span>
            <p className="text-gray-400 mt-2">Total Wins</p>
            <p>{0}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <span className="text-blue-500 text-2xl">💎</span>
            <p className="text-gray-400 mt-2">Current Tier</p>
            <p>{"Bronze"}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <span className="text-green-500 text-2xl">💰</span>
            <p className="text-gray-400 mt-2">Money Won</p>
            <p>${0}</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">Catgatory</h2>
        <div className="flex justify-around">
          <button className="p-4 bg-gray-800 rounded-lg">
            Force and Movement
          </button>
          <button className="p-4 bg-gray-800 rounded-lg">Projectile</button>
          <button className="p-4 bg-gray-800 rounded-lg">Momentum</button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Total Play Time</p>
            <p>{0} Hours</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Money Won</p>
            <p>${0}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Last Played</p>
            <p>{"N/A"}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Total Wins</p>
            <p>{0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
