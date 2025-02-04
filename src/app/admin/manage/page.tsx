"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import { User } from "../../../../utils/user/user";
import Link from "next/link";

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
        const response = await axios.get(
          `http://localhost:8000/api/user/player`,
          {
            withCredentials: true
          }
        );

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

    // WebSocket setup
    const socketUrl = "ws://localhost:8000/ws";
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      const updatedUser = JSON.parse(event.data);

      // Update the users list with the updated user score
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log("Reconnecting to WebSocket...");
        new WebSocket(socketUrl); // Reconnect
      }, 5000); // 5 seconds delay before reconnecting
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="p-4 text-black font-bold bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-4">จัดการผู้เล่น</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
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
                  {user.status === "approved" ? (
                    <p className="bg-green-500 text-white py-1 rounded">
                      Approved
                    </p>
                  ) : user.status === "pending" ? (
                    <p className="bg-yellow-500 text-black px-2 py-1 rounded">
                      Pending
                    </p>
                  ) : (
                    <p className="text-gray-500">Unknown Status</p>
                  )}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/admin/manage/${user.id}`} passHref>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
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
