"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../utils/api-url/api.url";
import { DefaultUser, User } from "../../../../utils/user/user";
import { useRouter } from "next/navigation";
import { Checkpoint } from "../../../../utils/checkpoint/checkpoint";
import { UserIcon, StarIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Bar } from "react-chartjs-2"; // ใช้ Bar สำหรับกราฟแท่ง
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// ตั้งค่า Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PlayerDetail = ({ id }: any) => {
  const [data, setData] = useState<User>(DefaultUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [checkpoint, setCheckpoint] = useState<Checkpoint>();
  const [chartData, setChartData] = useState<any>({});
  const router = useRouter();

  const getUserByID = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/user/${id}`);
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
      await axios.delete(`http://localhost:8000/api/user/${id}`);
      alert("ลบบัญชีสำเร็จ");
      router.push("/admin/manage");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบบัญชี");
    }
  };

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

  const generateCategoryScores = () => {
    // กำหนดคะแนนเต็มในแต่ละหมวดหมู่
    const categories = [
      "โพรเจกไทล์",
      "โมเมนตัมและการชน",
      "แรงและกฎการเคลื่อนที่"
    ];
    const categoryScores: { [key: string]: number } = {
      โพรเจกไทล์: 0,
      โมเมนตัมและการชน: 0,
      แรงและกฎการเคลื่อนที่: 0
    };

    const completedCheckpoints = data.completed_checkpoint || [];
    // นับคะแนนในแต่ละหมวดหมู่
    completedCheckpoints.forEach((completed) => {
      if (categories.includes(completed.category)) {
        categoryScores[completed.category] += completed.score;
      }
    });

    return categoryScores;
  };

  const generateChartData = () => {
    const categoryScores = generateCategoryScores();

    // ตรวจสอบหมวดหมู่ที่ผู้เล่นไม่ได้เล่น
    const labels: string[] = []; // กำหนดประเภทเป็น array ของ string
    const dataValues: number[] = []; // กำหนดประเภทเป็น array ของ number
    const backgroundColor: string[] = []; // กำหนดประเภทเป็น array ของ string (สี)
    const borderColor: string[] = [];

    ["โพรเจกไทล์", "โมเมนตัมและการชน", "แรงและกฎการเคลื่อนที่"].forEach(
      (category) => {
        if (categoryScores[category] > 0) {
          labels.push(category);
          dataValues.push(categoryScores[category]);
          backgroundColor.push("rgba(54, 162, 235, 0.5)"); // เปลี่ยนเป็นสีน้ำเงิน
          borderColor.push("rgba(54, 162, 235, 1)"); // ขอบสีเข้มขึ้น
        } else {
          labels.push(`${category} (ที่ว่าง)`);
          dataValues.push(0); // ไม่มีคะแนน
          backgroundColor.push("rgba(200, 200, 200, 0.5)"); // สีสำหรับหมวดหมู่ที่ยังไม่ได้เล่น
          borderColor.push("rgba(200, 200, 200, 1)"); // สีเส้นกราฟสำหรับหมวดหมู่ที่ยังไม่ได้เล่น
        }
      }
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "คะแนนรวมในแต่ละหมวดหมู่",
          data: dataValues,
          backgroundColor,
          borderColor,
          borderWidth: 1,
          barThickness: 90 
        }
      ]
    });
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

  useEffect(() => {
    generateChartData();
  }, [data.completed_checkpoint]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        กำลังโหลดข้อมูล...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl ml-[16rem]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          รายละเอียดผู้เล่น
        </h1>

        <div className="space-y-5 text-lg">
          <p className="flex items-center gap-2">
            <UserIcon className="w-6 h-6 text-gray-600" />
            <span className="font-semibold">ชื่อ:</span>{" "}
            {data.firstname || "ไม่ทราบชื่อ"}
          </p>

          <p className="flex items-center gap-2">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold">คะแนน:</span> {data.score || 0}
          </p>

          <p className="flex items-center gap-2">
            <MapPinIcon className="w-6 h-6 text-blue-500" />
            <span className="font-semibold">ด่านปัจจุบัน:</span>{" "}
            {checkpoint?.name && checkpoint?.category
              ? `ด่านที่ ${checkpoint.name} หมวดหมู่ ${checkpoint.category}`
              : "ยังไม่มีด่านปัจจุบัน"}
          </p>

          <div>
            <span className="font-semibold block mb-2">
              ด่านที่เล่นผ่านไปแล้ว:
            </span>
            {data.completed_checkpoint &&
            data.completed_checkpoint.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {data.completed_checkpoint.map((completed, index) => (
                  <li key={index}>
                    <span className="font-medium">ด่านที่:</span>{" "}
                    {completed.name}{" "}
                    <span className="font-medium">หมวดหมู่:</span>{" "}
                    {completed.category}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">ยังไม่พบด่านที่เล่นผ่านแล้ว</p>
            )}
          </div>
        </div>

        {/* กราฟแสดงคะแนนตามหมวดหมู่ */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            กราฟคะแนนตามหมวดหมู่
          </h2>
          <Bar data={chartData} />
        </div>

        <button
          onClick={deleteUser}
          className="mt-6 w-full p-4 bg-red-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition duration-300"
        >
          <Trash2Icon className="w-6 h-6" />
          ลบบัญชี
        </button>
      </div>
    </div>
  );
};

export default PlayerDetail;
