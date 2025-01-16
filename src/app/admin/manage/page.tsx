"use client";
import AdminNav from "@/components/navbar/adminNav";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import { User } from "../../../../utils/user/user";

const ManageUser = () => {
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
          setUsers(fetchedUsers);

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

  const handleEdit = (userId: any) => {
    // Implement edit functionality
    console.log("Edit user", userId);
  };

  return (
    <div className="p-4 text-black font-bold bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-4">Manage Users</h1>

      <div className="mb-6">
        <p>Total Users: {users.length}</p>
        <p>Admins: {adminCount}</p>
        <p>Players: {playerCount}</p>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
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

export default ManageUser;
