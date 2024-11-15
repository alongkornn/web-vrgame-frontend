"use client";

import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState([{}]);

  const handleChage = (e: any) => {
    setData(() => [
      {
        ...data,
        [e.target.name]: e.target.value
      }
    ]);
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      data
    );

    if (response.data.message !== "success") {
      await alert("Fail to login");
    }

    await alert(response.data.message);
  };

  console.log(data);

  return (
    <>
      <form>
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChage(e)}
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChage(e)}
        />
      </form>
    </>
  );
}
