"use client";

import Nav from "@/components/navbar/nav";
import React from "react";

function HomePage() {
  const handleScrollWindow = () => {
    window.scrollBy({
      top: 995, // ระยะห่างที่จะเลื่อนลง (หน่วยเป็นพิกเซล)
      behavior: "smooth" // เลื่อนอย่างนุ่มนวล
    });
  };

  return (
    <div
      style={{
        height: "2000px"
      }}
    >
      <div className="text-white font-bold">
        <div className="flex items-center justify-between ml-[150px]">
          {/* Left Section: Text */}
          <div className="flex-1">
            <h1 className="font-bold text-[56px] mt-[180px]">
              ยินดีต้อนรับเข้าสู่เกมวีอาร์เพื่อเสริมความรู้ทางด้านฟิสิกส์สำหรับ
            </h1>
            <h1 className="text-[56px]">มัธยมศึกษาตอนปลาย</h1>

            <button
              onClick={handleScrollWindow}
              className="bg-[#ffff] text-black text-bold text-[20px] rounded-[20px] px-4 py-2 mt-[90px]"
            >
              เรียนรู้เพิ่มเติม
            </button>
          </div>

          {/* Right Section: Image */}
          <div className="flex-1">
            <img
              src="/background-vr.jpg"
              alt="VR"
              style={{
                width: "890px",
                height: "auto",
                objectFit: "contain",
                marginTop: "3rem",
                boxShadow: "0  30px 15px rgba(0, 0, 0, 0.3)", // ขอบจาง ๆ
                borderRadius: "1rem" // ทำให้ขอบมน (ถ้าต้องการ)
              }}
            />
          </div>
        </div>
      </div>
      <div className="content text-white mt-[360px]">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default HomePage;
