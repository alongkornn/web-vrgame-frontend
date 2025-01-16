"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { DefaultUser, User } from "../../../../utils/user/user";
import {
  Checkpoint,
  DefaultCheckpoint
} from "../../../../utils/checkpoint/checkpoint";

const Profile = () => {
  const [user, setUser] = useState<User>(DefaultUser);
  const [checkpoint, setCheckpoint] = useState<Checkpoint>(DefaultCheckpoint);
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
        if (axios.isAxiosError(error)) {
          console.error("API Error:", error.response?.data || error.message);
        } else {
          console.error("Unknown Error:", error);
        }
        router.push("/login");
      }
    };

    getUser();
  }, [router]);

  useEffect(() => {
    if (user.id) {
      getCheckpointByID(user.id);
    }
  }, [user.id]);

  const getCheckpointByID = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/checkpoint/current/${userId}`
      );

      if (response.status === 200) {
        // ใช้ข้อมูลที่ได้รับจาก API โดยตรง
        const rawCheckpoint: Checkpoint = response.data.data;
        await setCheckpoint(rawCheckpoint);
        console.log("rew checkpoint:", rawCheckpoint);
      } else {
        console.error("Error fetching checkpoint:", response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
      } else {
        console.error("Unknown Error:", error);
      }
    }
  };

  useEffect(() => {
    console.log("checkpoint:", checkpoint);
  }, [checkpoint]);

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
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">รายละเอียด</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            {/* <span className="text-red-500 text-2xl">🔥</span> */}
            <p className="text-gray-400 mt-2 mb-2">คะแนน</p>
            <p>{user.score ? user.score : "0"}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            {/* <span className="text-yellow-500 text-2xl">🏆</span> */}
            <p className="text-gray-400 mt-2 mb-2">จำนวนชนะ</p>
            <p>{0}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            {/* <span className="text-blue-500 text-2xl">💎</span> */}
            <p className="text-gray-400 mt-2 mb-2">ด่านปัจจุบัน</p>
            <p>{checkpoint.name}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            {/* <span className="text-green-500 text-2xl">💰</span> */}
            <p className="text-gray-400 mt-2 mb-2">หมวดหมู่ปัจจุบัน</p>
            <p>{checkpoint.category}</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">Catgatory</h2>
        <div className="flex justify-around">
          <button className="p-4 bg-gray-800 rounded-lg">โพรเจคไทล์</button>
          <button className="p-4 bg-gray-800 rounded-lg">
            โมเมนตัมและการชน
          </button>
          <button className="p-4 bg-gray-800 rounded-lg">
            แรงและกฎการเคลื่อน
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      {/* <div className="mt-8 w-full max-w-lg">
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
      </div> */}
    </div>
  );
};

export default Profile;
