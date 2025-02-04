"use client";
import Nav from "@/components/navbar/nav";
import React, { useEffect, useState } from "react";
import { DefaultUser, User } from "../../../../utils/user/user";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import AdminNav from "@/components/navbar/adminNav";

const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [adminCount, setAdminCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = decodeJWT(token);

    if (decodedToken.role != "admin") {
      router.push("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user`, {
          withCredentials: true
        });

        if (response.status === 200) {
          const fetchedUsers = response.data.data;

          const sortedUsers = fetchedUsers.sort((a: any, b: any) => {
            if (a.role === "admin" && b.role !== "admin") {
              return -1; // admin มาก่อน
            }
            if (a.role !== "admin" && b.role === "admin") {
              return 1; // player มาหลัง
            }
            return 0; // หากเป็น admin หรือ player เหมือนกัน ให้ไม่ต้องเปลี่ยนลำดับ
          });
          setUsers(sortedUsers);

          const admins = fetchedUsers.filter(
            (user: any) => user.role === "admin"
          ).length;
          const players = fetchedUsers.filter(
            (user: any) => user.role === "player"
          ).length;

          setAdminCount(admins);
          setPlayerCount(players);
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

    fetchUsers();
  }, []);
  return (
    <div className="p-4 text-black font-bold bg-gray-100 min-h-screen mt-5">
      <div className="mb-6 flex space-x-4">
        <div className="bg-gray-200 p-4 rounded flex-1 text-center">
          <p>Total Users: {users.length}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded flex-1 text-center">
          <p>Admins: {adminCount}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded flex-1 text-center">
          <p>Players: {playerCount}</p>
        </div>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstname} {user.lastname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
