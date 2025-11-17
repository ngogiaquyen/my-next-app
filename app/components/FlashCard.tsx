// app/components/FlashCard.tsx
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface FlashCardProps {
  id: number;
  chinese: string;
  pinyin: string;
  meaning: string;
  status: 'NOT_LEARNED' | 'LEARNING' | 'REVIEW' | 'MASTERED';
}

export default function FlashCard({ id, chinese, pinyin, meaning, status: initialStatus }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { data: session } = useSession();
  const [status, setStatus] = useState(initialStatus);

  // Viền màu theo trạng thái (giữ nguyên logic cũ)
  const borderClass = {
    NOT_LEARNED: 'border-gray-700',
    LEARNING: 'border-blue-500',
    REVIEW: 'border-orange-500',
    MASTERED: 'border-green-500',
  }[status];

  const handleClick = async () => {
    setFlipped(!flipped);

    // Đọc tiếng Trung
    const utterance = new SpeechSynthesisUtterance(chinese);
    utterance.lang = 'zh-CN';
    speechSynthesis.speak(utterance);

    // Tự động đánh dấu LEARNING nếu là lần đầu click
    if (session && status === 'NOT_LEARNED') {
      const newStatus = 'LEARNING';
      setStatus(newStatus);
      await fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify({ flashcardId: id, status: newStatus }),
      });
    }
  };

  const markAsMastered = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;
    setStatus('MASTERED');
    await fetch('/api/progress', {
      method: 'POST',
      body: JSON.stringify({ flashcardId: id, status: 'MASTERED' }),
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border ${borderClass} rounded-lg p-6 m-3 w-64 h-40 flex flex-col justify-center items-center text-center shadow-xl bg-gray-800 hover:bg-gray-750 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative`}
    >
      {/* Mặt trước */}
      {!flipped ? (
        <div>
          <p className="text-2xl font-bold text-yellow-300">{chinese}</p>
          <p className="text-lg mt-2 text-gray-300">{pinyin}</p>
        </div>
      ) : (
        /* Mặt sau */
        <div>
          <p className="text-xl font-bold text-green-400">{meaning}</p>
          
          {/* Nút "Đã thuộc" chỉ hiện khi đã đăng nhập và chưa mastered */}
          {session && status !== 'MASTERED' && (
            <button
              onClick={markAsMastered}
              className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
            >
              Đã thuộc
            </button>
          )}
        </div>
      )}

      {/* Icon nhỏ góc trên bên phải (chỉ hiện khi đăng nhập) */}
      {session && (
        <div className="absolute top-2 right-3 text-xl font-bold opacity-80">
          {status === 'MASTERED' ? '✓' : 
           status === 'LEARNING' ? '↻' : 
           status === 'REVIEW' ? '!' : ''}
        </div>
      )}
    </div>
  );
}