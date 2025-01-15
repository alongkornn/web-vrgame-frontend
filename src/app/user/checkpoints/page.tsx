"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Checkpoints = () => {
  const router = useRouter();

  // รายการหมวดหมู่
  const categories = [
    { name: "โพรเจคไทล์", redirectTo: "/user/checkpoints/projectile" },
    { name: "โมเมนตัมและการชน", redirectTo: "/user/checkpoints/momentum" },
    { name: "แรงและกฎการเคลื่อน", redirectTo: "/user/checkpoints/force" }
  ];

  // ฟังก์ชันสำหรับการเปลี่ยนหน้า
  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-4xl font-bold mb-10">หมวดหมู่</h1>
      <div className="w-full max-w-5xl space-y-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer bg-gray-800 text-white text-xl font-semibold p-6 rounded-lg shadow-md hover:bg-gray-700 transition-all"
            style={{ height: "150px" }}
            onClick={() => handleRedirect(category.redirectTo)}
          >
            <div className="flex items-center justify-center h-full">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkpoints;
