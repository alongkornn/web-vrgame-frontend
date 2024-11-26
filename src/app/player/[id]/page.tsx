"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import { User } from "../../../../utils/user/user";

function Player({ params }: { params: { id: string } }) {
  const [data, setData] = useState<User>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    class: "",
    number: "",
    score: 0,
  });

  const getUserByID = async (id: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/get/user/${id}`
      );

      setData(response.data.data); // คาดว่าข้อมูล user อยู่ใน response.data.data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserByID(params.id);
  }, []);

  return (
    <div className="text-center my-20">
      <h1>
        Name : {data.firstname} {data.lastname}
      </h1>
      <h1>
        Score : {data.score}
      </h1>
      <h1>
        Name : {data.firstname} {data.lastname}
      </h1>
      <h1>
        Name : {data.firstname} {data.lastname}
      </h1>
    </div>
  );
}

export default Player;
