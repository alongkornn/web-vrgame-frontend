"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../../utils/api-url/api.url";
import { getId } from "../../../../../utils/params/params";
import { DefaultUser, User } from "../../../../../utils/user/user";
import { useRouter } from "next/navigation";
import { Checkpoint } from "../../../../../utils/checkpoint/checkpoint";

const PlayerDetail = () => {
  const id = getId();

  const [data, setData] = useState<User>(DefaultUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [checkpoint, setCheckpoint] = useState<Checkpoint>();
  const router = useRouter();

  const getUserByID = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/user/${id}`);
      setData(response.data.data);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!confirm("คุณต้องการลบบัญชีนี้จริงหรือไม่?")) return;

    try {
      await axios.delete(`${API_URL}/user/${id}`);
      alert("ลบบัญชีสำเร็จ");
      router.push("/admin/manage");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบบัญชี");
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid or missing ID");
      return;
    }
    getUserByID(id);
  }, [id]);

  useEffect(() => {
    if (data.id) {
      getCheckpointByID(data.id);
    }
  }, [data.id]);

  const getCheckpointByID = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/checkpoint/current/${userId}`
      );

      if (response.status === 200) {
        // ใช้ข้อมูลที่ได้รับจาก API โดยตรง
        const rawCheckpoint: Checkpoint = response.data.data;
        await setCheckpoint(rawCheckpoint);
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        กำลังโหลดข้อมูล...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          รายละเอียดผู้เล่น
        </h1>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">ชื่อ:</span>{" "}
            {data.firstname || "ไม่ทราบชื่อ"}
          </p>
          <p>
            <span className="font-semibold">คะแนน:</span> {data.score || 0}
          </p>
          <p>
            <span className="font-semibold">ด่านปัจจุบัน:</span>{" "}
            {checkpoint?.name || "ยังไม่มีด่านปัจจุบัน"}
          </p>
          <p>
            <span className="font-semibold">ด่านที่เล่นผ่านไปแล้ว:</span>{" "}
            {data.completed_checkpoints && data.completed_checkpoints.length > 0
              ? data.completed_checkpoints.join(", ")
              : "ยังไม่พบด่านที่เล่นผ่านแล้ว"}
          </p>
        </div>
        <button
          onClick={deleteUser}
          className="mt-6 w-full p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          ลบบัญชี
        </button>
      </div>
    </div>
  );
};

export default PlayerDetail;
