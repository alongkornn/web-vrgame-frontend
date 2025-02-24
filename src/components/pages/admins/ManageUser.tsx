"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import { User } from "../../../../utils/user/user";
import Link from "next/link";
import { Search } from "lucide-react";

const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/player`,
          {
            withCredentials: true
          }
        );
        console.log("response : ", response);

        if (response.status === 200) {
          const fetchedUsers = response.data.data;
          setUsers(fetchedUsers);
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

  const filteredUsers = users
    .filter((user) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((user) => (statusFilter ? user.status === statusFilter : true));

  const formatDate = (isoString: number) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  // console.log("completed_checkpoint", users[0].completed_checkpoint)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (สมมติว่ามันอยู่ใน Layout แล้ว) */}
      {/* Main Content */}
      <main className="flex-1 p-4 text-black font-bold ml-[23rem]">
        <h1 className="text-2xl mt-5 mb-10">Manage User</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          {/* Search Input */}
          <div className="relative w-[400px]">
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

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Created</th>
                <th className="py-3 px-6 text-left">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <span>
                        {user.firstname} {user.lastname}
                      </span>
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`
                          inline-block px-3 py-1 text-white text-sm rounded-full
                          ${
                            user.status === "approved"
                              ? "bg-green-500"
                              : user.status === "pending"
                              ? "bg-yellow-500"
                              : user.status === "refunded"
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }
                        `}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">{formatDate(user.created_at)}</td>
                    <td className="px-4 py-6">
                      <Link href={`/admin/manage/${user.id}`} passHref>
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-[10px] hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                    </td>
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

export default ManageUser;
