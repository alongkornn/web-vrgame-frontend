"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import { User } from "../../../../utils/user/user";
import { useParams } from "next/navigation";

function Player() {
  const params = useParams() as Record<string, string | undefined>;
  const id = params.id as string;

  const [data, setData] = useState<User>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    class: "",
    number: "",
    score: 0,
    completedCheckpoint: []
  });

  const getUserByID = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${id}`);

      setData(response.data.data); // fix data.map() is not a function
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserByID(id);
  }, []);

  return (
    <div className="text-center my-20">
      <h1>
        Name : {data.firstname} {data.lastname}
      </h1>
      <h1>Score : {data.score}</h1>
      <h1>
        Current Checkpoint :{" "}
        {data.currentCheckpoint == null ? (
          <p>undefind</p>
        ) : (
          data.currentCheckpoint.name
        )}
      </h1>
      <h1>
        Completed Checkpoint :
        {!data.completedCheckpoint || data.completedCheckpoint.length === 0 ? (
          <p>You don't have completed checkpoint</p>
        ) : (
          data.completedCheckpoint.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))
        )}
      </h1>
    </div>
  );
}

export default Player;
