"use client";
import Nav from "@/components/navbar/nav";
import React, { useEffect, useState } from "react";
import { DefaultUser, User } from "../../../../utils/user/user";
import { useRouter } from "next/navigation";
import axios from "axios";
import { decodeJWT } from "../../../../utils/jwt/decodejwt";
import { getCookie } from "../../../../utils/jwt/getCookie";
import AdminNav from "@/components/navbar/adminNav";

const page = () => {
  const [user, setUser] = useState<User>(DefaultUser);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = decodeJWT(token);

    if (decodedToken.role != "admin") {
      router.push("/login");
      return;
    }

    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/admin/${decodedToken.user_id}`,
          {
            withCredentials: true
          }
        );

        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("API Error:", error.response?.data || error.message);
        } else {
          console.error("Unknown Error:", error);
        }
        router.push("/login");
      }
    };

    getUser();
  }, []);
  return (
    <div>
      <AdminNav />
    </div>
  );
};

export default page;
