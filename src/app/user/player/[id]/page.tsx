"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { User, DefaultUser } from "../../../../../utils/user/user";
import { getId } from "../../../../../utils/params/params";
import { API_URL } from "../../../../../utils/api-url/api.url";

function Player() {
  const id = getId();

  const [data, setData] = useState<User>(DefaultUser);

  const getUserByID = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);

      setData(response.data.data); // fix data.map() is not a function
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("Invalid in missing ID");
      return;
    }

    getUserByID(id);
  }, [id]);

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
