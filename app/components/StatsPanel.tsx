// app/components/StatsPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/types/card";
import { HiOutlineChartBar } from "react-icons/hi";

export default function StatsPanel({ cards }: { cards: Card[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile một cách mượt mà (client-side only)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = {
    total: cards.length,
    notLearned: cards.filter((c) => c.status === "NOT_LEARNED").length,
    learning: cards.filter((c) => c.status === "LEARNING").length,
    review: cards.filter((c) => c.status === "REVIEW").length,
    mastered: cards.filter((c) => c.status === "MASTERED").length,
  };

  const percent = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-2xl z-40 transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel chính */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-transform duration-500 ease-out pointer-events-none
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="pointer-events-auto bg-white/10 backdrop-blur-3xl border-b border-white/10 rounded-b-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30" />

          <div className="relative px-6 pt-20 pb-16">
            <div className="grid grid-cols-5 gap-4 text-center">
              {[
                { label: "Tổng", value: stats.total, color: "text-white/90" },
                { label: "Mới", value: stats.notLearned, color: "text-white/70" },
                { label: "Học", value: stats.learning, color: "text-cyan-300" },
                { label: "Ôn", value: stats.review, color: "text-orange-300" },
                { label: "Thuộc", value: stats.mastered, color: "text-green-300" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-xs font-medium text-white/60 tracking-wider uppercase">
                    {item.label}
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex justify-between items-end mb-3 px-2">
                <span className="text-sm font-medium text-white/70">Tiến độ học</span>
                <span className="text-2xl font-bold text-green-400">{percent}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20 mx-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1200 ease-out relative overflow-hidden"
                  style={{ width: `${percent}%` }}
                >
                  {percent > 0 && percent < 100 && (
                    <div className="absolute inset-0 bg-white/20 animate-shimmer-slow" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nút toggle – Responsive vị trí */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed z-50 
          ${isMobile 
            ? "bottom-22 left-2 w-[43px] h-[43px] rounded-full shadow-2xl"   // Mobile: FAB dưới phải
            : "top-4 right-4 w-11 h-11 rounded-full"                 // Desktop: góc trên phải
          }
          bg-white/20 backdrop-blur-3xl border border-white/30
          flex items-center justify-center
          hover:bg-white/30 active:scale-90 
          transition-all duration-300
          group
        `}
        aria-label="Mở thống kê"
      >
        <HiOutlineChartBar 
          className={`text-white/90 transition-all duration-300 group-hover:text-white
            ${isMobile ? "w-6 h-6" : "w-6 h-6"}
          `}
        />
        {/* Vòng sáng khi đang mở */}
        <span className={`absolute inset-0 rounded-full bg-white/20 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
      </button>
    </>
  );
}