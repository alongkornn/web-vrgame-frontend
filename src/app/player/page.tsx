"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { User } from "../../../utils/user/user";

function Player() {
  const [data, setData] = useState<User[]>([]);

  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
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
