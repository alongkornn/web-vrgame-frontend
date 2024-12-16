"use client";

import Nav from "@/components/navbar/nav";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "../../../utils/user/user";

function Rank() {
  const [users, setUsers] = useState<User[]>([]);
  let count = 1;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/user");
    setUsers(response.data.data);
  };

  console.log(users);

  return (
    <div className="text-white">
      <Nav page="rank" />
      <div className="flex justify-center min-h-screen">
        <div
          className="h-full text-center bg-white text-[#000] rounded-[20px]"
          style={{
            width: "500px"
          }}
        >
          <ul>
            {users.map((item, index) => (
              <div key={index}>
                {item.firstname} {item.lastname} {item.score}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Rank;
