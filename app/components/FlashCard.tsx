'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";

interface FlashCardProps {
  id: number;
  chinese: string;
  pinyin: string;
  meaning: string;
  status: "NOT_LEARNED" | "LEARNING" | "REVIEW" | "MASTERED";
}

export default function FlashCard({
  id,
  chinese,
  pinyin,
  meaning,
  status: initialStatus,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { data: session } = useSession();
  const [status, setStatus] = useState(initialStatus);

  const handleClick = async () => {
    setFlipped(!flipped);

    const utterance = new SpeechSynthesisUtterance(chinese);
    utterance.lang = "zh-CN";
    speechSynthesis.speak(utterance);

    if (session && status === "NOT_LEARNED") {
      const newStatus = "LEARNING";
      setStatus(newStatus);
      await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify({ flashcardId: id, status: newStatus }),
      });
    }
  };

  const markAsMastered = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;
    setStatus("MASTERED");
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify({ flashcardId: id, status: "MASTERED" }),
    });
  };

  const markAsReview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;
    setStatus("REVIEW");
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify({ flashcardId: id, status: "REVIEW" }),
    });
  };

  // === MỚI: Reset về NOT_LEARNED ===
  const resetToNotLearned = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;
    setStatus("NOT_LEARNED");
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify({ flashcardId: id, status: "NOT_LEARNED" }),
    });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg p-6 m-3 w-64 h-40 flex flex-col justify-center items-center text-center shadow-xl bg-gray-800 hover:bg-gray-750 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative
                 border-gray-700 data-[status=LEARNING]:border-blue-500 data-[status=REVIEW]:border-orange-500 data-[status=MASTERED]:border-green-500"
      data-status={status}
    >
      {/* Mặt trước */}
      {!flipped ? (
        <div>
          <p className="text-2xl font-bold text-yellow-300">{chinese}</p>
          <p className="text-lg mt-2 text-gray-300">{pinyin}</p>
        </div>
      ) : (
        <div>
          <p className="text-xl font-bold text-green-400">{meaning}</p>
        </div>
      )}

      {/* ===== 3 NÚT KHI LẬT THẺ ===== */}
      {session && flipped && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          {/* Đã thuộc */}
          {status !== "MASTERED" && (
            <button
              onClick={markAsMastered}
              className="relative overflow-hidden px-3 py-1.5 text-[11px] font-semibold tracking-wider
                         bg-green-500/25 border border-green-400/50 backdrop-blur-lg rounded-xl
                         shadow-md shadow-green-500/20 hover:bg-green-500/40 hover:border-green-300/70
                         hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300
                         before:absolute before:inset-0 before:bg-white/20
                         before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-sm leading-none">✓</span> Đã thuộc
              </span>
            </button>
          )}

          {/* Ôn lại */}
          {status !== "REVIEW" && (
            <button
              onClick={markAsReview}
              className="relative overflow-hidden px-3 py-1.5 text-[11px] font-semibold tracking-wider
                         bg-orange-500/25 border border-orange-400/50 backdrop-blur-lg rounded-xl
                         shadow-md shadow-orange-500/20 hover:bg-orange-500/40 hover:border-orange-300/70
                         hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300
                         before:absolute before:inset-0 before:bg-white/20
                         before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-sm leading-none">↻</span> Ôn lại
              </span>
            </button>
          )}

          {/* === MỚI: Xóa tiến độ (chỉ hiện khi REVIEW hoặc MASTERED) === */}
          {(status === "REVIEW" || status === "MASTERED") && (
            <button
              onClick={resetToNotLearned}
              className="relative overflow-hidden px-3 py-1.5 text-[11px] font-semibold tracking-wider
                         bg-red-500/25 border border-red-400/50 backdrop-blur-lg rounded-xl
                         shadow-md shadow-red-500/20 hover:bg-red-500/40 hover:border-red-300/70
                         hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300
                         before:absolute before:inset-0 before:bg-white/20
                         before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-sm leading-none">Reset</span>
              </span>
            </button>
          )}
        </div>
      )}

      {/* Icon trạng thái góc trên phải */}
      {session && (
        <div className="absolute top-2 right-3 text-xl font-bold opacity-80">
          {status === "MASTERED" ? "✓" : 
           status === "LEARNING" ? "↻" : 
           status === "REVIEW" ? "!" : ""}
        </div>
      )}
    </div>
  );
}