"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

import { User } from "../../../utils/user/user";
import { API_URL } from "../../../utils/api-url/api.url";

function Player() {
  const [data, setData] = useState<User[]>([]);

  const fetch = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      Player
      <div className="text-center my-20 ">
        {data.map((item, index) => (
          <div key={index}>
            <Link href={`/player/${item.id}`} className="text-2xl my-10">
              {item.firstname} {item.lastname}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Player;
