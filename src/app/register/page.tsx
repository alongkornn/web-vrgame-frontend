"use client";

import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/auth/register`,
      data
    );

    if (response.data.status !== "success") {
      await alert("Somthing went wrong");
    }

    await alert(response.data.message);
  };

  return (
    <>
      <div>
        <label htmlFor="">First Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="">Class</label>
        <input
          type="text"
          name="class"
          placeholder="Class"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="">Number</label>
        <input
          type="text"
          name="number"
          placeholder="Number"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button onClick={handleSubmit}>Register</button>
    </>
  );
}
