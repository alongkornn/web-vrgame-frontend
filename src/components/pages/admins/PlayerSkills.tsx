"use client";
import React, { useEffect, useState } from "react";
import { User } from "../../../../utils/user/user";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { Search } from "lucide-react";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    //ตรวจสอบว่ามี token หรือไม่
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // ถอดรหัสของ token ที่บันทึกใน cookies
    const decodedToken = decodeJWT(token);

    // ตรวจสอบ role ว่าเป็น admin หรือไม่
    if (decodedToken.role !== "admin") {
      router.push("/login");
      return;
    }

    // ดึงข้อมูล user ทั้งหมด
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/player`,
          {
            withCredentials: true
          }
        );

        if (response.status === 200) {
          const fetchedUsers = response.data.data;

          setUsers(fetchedUsers);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error(
          "API Error:",
          axios.isAxiosError(error)
            ? error.response?.data || error.message
            : error
        );
        router.push("/login");
      }
    };

    fetchUsers();
  }, []);

  // แปลงเวลาในฐานข้อมูล
  const formatDate = (isoString: number) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  // กรอง users ให้แสดงตามที่ค้นหา
  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleOpenPlayerDetail = (user_id: string) => {
    router.push("/admin/manage/" + user_id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex ml-[5rem]">
      {/* Sidebar (อยู่ใน Layout) */}
      <main className="flex-1 p-4 text-black font-bold ml-64 mt-5">
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute right-3 top-3.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created</th>
                {/* <th className="py-3 px-6 text-left">Action</th> */}
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                    onClick={() => handleOpenPlayerDetail(user.id)}
                  >
                    <td className="py-4 px-6 flex items-center">
                      <span>
                        {user.firstname} {user.lastname}
                      </span>
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.role}</td>
                    <td className="py-4 px-6">{formatDate(user.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
