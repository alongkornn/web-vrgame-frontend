"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "../../../utils/user/user";
import { getCookie } from "../../../utils/jwt/getCookie";
import { useRouter } from "next/navigation";
import { decodeJWT } from "../../../utils/jwt/decodejwt";

function Rank() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const userCount = users.findIndex((user) => user.firstname == username);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const protectRoute = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/sort/score",
          {
            withCredentials: true
          }
        );

        if (response.status == 200) {
          setUsers(response.data.data);
          const decodedToken = decodeJWT(token);
          if (decodedToken) {
            setUsername(decodedToken.username);
          }
        } else {
          return router.push("/login");
        }
      } catch (error) {
        console.error("Error during API request:", error);
        router.push("/login");
      }
    };

    protectRoute();
  }, [router]);

  console.log(userCount);
  return (
    <div style={{
      marginTop: "5rem"
    }}>
      <h1 className="text-center mt-5 mb-5 text-[56px] font-bold text-white">
        Score in VR Game
      </h1>
      <div
        className="flex justify-center min-h-screen"
        style={{
          marginTop: "3rem"
        }}
      >
        <div
          className="h-full text-center bg-white rounded-[15px]"
          style={{
            width: "746px"
          }}
        >
          <div className="flex justify-between mb-3 mt-5 font-bold text-[32px]">
            <h1 className="ml-5">Name</h1>
            <h1 className="mr-5">Score</h1>
          </div>
          <div
            className="text-black"
            style={{
              maxHeight: "400px", // ความสูงของ container
              overflowY: "auto" // ใช้ 'auto' เพื่อให้ scrollbar แสดงเมื่อจำเป็น
            }}
          >
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

          {userCount > 9 ? (
            <div
              className="mt-10 flex justify-between font-bold text-[20px] bg-[#C8F321] text-black"
              style={{
                height: "3rem",
                borderBottomRightRadius: "15px",
                borderBottomLeftRadius: "15px",
                paddingTop: "0.3rem"
              }}
            >
              <h1 className="ml-5">
                {userCount + 1}.{username}
              </h1>
              <h1
                style={{
                  marginRight: "4rem"
                }}
              >
                {users[userCount].score == null ? "0" : users[userCount].score}
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Rank;
