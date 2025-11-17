"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(prev=> !prev);
  return (
    <div className="flex">
      {/* Nút toggle: chỉ hiện logo khi Sidebar đóng */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed top-4 left-4 z-50 shadow transition"
        >
          <img
            className="w-10 h-10 object-contain"
            src="/images/wyn_rm.png"
            alt="logo"
          />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} handleOpen={handleOpen} />

      {/* Nội dung chính */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
