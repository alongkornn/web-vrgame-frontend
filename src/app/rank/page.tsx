"use client";

import Nav from "@/components/navbar/nav";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "../../../utils/user/user";
import { getCookie } from "../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";

function Rank() {
  const [users, setUsers] = useState<User[]>([]);
  let score;
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    }
    getUsers();
  }, [router]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/user");
    setUsers(response.data.data);
  };

  return (
    <div className="text-white">
      <Nav page="rank" />
      <h1 className="text-center mt-5 mb-5 text-[56px] font-bold">
        Score in VR Game
      </h1>
      <div className="flex justify-center min-h-screen">
        <div
          className="h-full text-center bg-white text-[#000] rounded-[15px]"
          style={{
            width: "746px"
          }}
        >
          <div className="flex justify-between mb-3 mt-5 font-bold text-[32px]">
            <h1 className="ml-5">Name</h1>
            <h1 className="mr-5">Score</h1>
          </div>
          <ul>
            {users.map((item, index) => (
              <div
                key={index}
                className="flex justify-between font-bold text-[20px] mb-3"
              >
                <h1 className="ml-5">
                  {index + 1}.{item.firstname}
                </h1>
                <h1
                  style={{
                    marginRight: "4rem"
                  }}
                >
                  {item.score == null ? "0" : item.score}
                </h1>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Rank;
function decodeJWT(token: string) {
  throw new Error("Function not implemented.");
}
