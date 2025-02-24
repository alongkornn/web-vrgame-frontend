"use client";
import React, { useEffect, useState } from "react";
import { User } from "../../../../utils/user/user";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { Users, ShieldCheck, Gamepad2, Search } from "lucide-react";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [adminCount, setAdminCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [search, setSearch] = useState("");

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
        const response = await axios.get(`http://localhost:8000/api/user`, {
          withCredentials: true
        });

        if (response.status === 200) {
          const fetchedUsers = response.data.data;

          const sortedUsers = fetchedUsers.sort((a: any, b: any) => {
            if (a.role === "admin" && b.role !== "admin") return -1;
            if (a.role !== "admin" && b.role === "admin") return 1;
            return 0;
          });
          setUsers(sortedUsers);

          setAdminCount(
            fetchedUsers.filter((user: any) => user.role === "admin").length
          );
          setPlayerCount(
            fetchedUsers.filter((user: any) => user.role === "player").length
          );
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

  const formatDate = (isoString: number) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex ml-[5rem]">
      {/* Sidebar (อยู่ใน Layout) */}
      <main className="flex-1 p-4 text-black font-bold ml-64 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ml-[15rem] mb-5">
          {/* Total Users */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-semibold">
                Total Users
              </p>
              <h2 className="text-2xl font-bold">{users.length}</h2>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Users size={24} />
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-semibold">
                Admins
              </p>
              <h2 className="text-2xl font-bold">{adminCount}</h2>
            </div>
            <div className="bg-green-500 text-white p-3 rounded-full">
              <ShieldCheck size={24} />
            </div>
          </div>

          {/* Players */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-semibold">
                Players
              </p>
              <h2 className="text-2xl font-bold">{playerCount}</h2>
            </div>
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <Gamepad2 size={24} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-4">
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
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
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
