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
    <div>
      <Nav page="home"/>
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
              className="bg-[#ffff] text-black text-[20px] rounded-[20px] px-4 py-2 mt-[90px]"
            >
              LEARN MORE
            </button>
          </div>

          {/* Right Section: Image */}
          <div className="flex-1">
            <img
              src="/vr.svg"
              alt="VR"
              style={{
                width: "1500px", // ขนาดที่ต้องการ
                height: "auto",
                objectFit: "contain" // ให้รูปไม่ยืดหรือเบี้ยว
              }}
            />
          </div>
        </div>
      </div>
      <div className="content text-white mt-[320px]">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default HomePage;
