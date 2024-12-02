"use client";

import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../utils/api-url/api.url";
import { useRouter } from "next/router";

export default function Page() {
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      if (response.status === 200) {
        alert(response.data.message);
        router.push("/home"); // Redirect ไปหน้า /home
      }
    } catch (error) {
      await alert("Fail to login");
    }
  };

  return (
    <>
      <form>
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
      </form>
      <button onClick={handleSubmit}>Login</button>
    </>
  );
}
