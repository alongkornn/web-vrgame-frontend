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
          { withCredentials: true }
        );

        console.log("API Response:", response.data.data); // ✅ Debug API Response

        if (response.status === 200) {
          setUser({
            ...response.data.data,
            completedCheckpoint: response.data.data.completedCheckpoint || []
          });
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("API Error:", error);
        router.push("/login");
      }
    };

    getUser();

    // WebSocket setup
    const socketUrl = "ws://localhost:8000/ws";
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      try {
        const updatedUser = JSON.parse(event.data);
        console.log("WebSocket Updated User:", updatedUser); // ✅ Debug ตรงนี้

        setUser((prevUser) => ({
          ...prevUser,
          completedCheckpoint: updatedUser.completedCheckpoints || []
        }));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log("Reconnecting to WebSocket...");
        new WebSocket(socketUrl); // Reconnect
      }, 3000); // 5 seconds delay before reconnecting
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close(); // Clean up on unmount
    };
  }, []);

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
        setCheckpoint(response.data.data);
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

  console.log("Rendering completedCheckpoint:", user.completed_checkpoints);

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
            {user.firstname?.toUpperCase() || ""}{" "}
            {user.lastname?.toUpperCase() || ""}
          </h1>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">รายละเอียด</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mt-2 mb-2">คะแนน</p>
            <p>{user.score || "0"}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mt-2 mb-2">จำนวนชนะ</p>
            <p>0</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mt-2 mb-2">ด่านปัจจุบัน</p>
            <p>{checkpoint?.name || "N/A"}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mt-2 mb-2">หมวดหมู่ปัจจุบัน</p>
            <p>{checkpoint?.category || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl mb-4">ด่านที่เล่นผ่านแล้ว</h2>
        <div className="flex justify-around p-4 bg-gray-800 rounded-lg">
          {user.completed_checkpoints &&
          user.completed_checkpoints.length > 0 ? (
            user.completed_checkpoints.map((checkpoint, index) => (
              <button key={index}>
                {checkpoint.name}({checkpoint.category})
              </button>
            ))
          ) : (
            <button>ไม่มี</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
