'use client';
import { useState } from 'react';

interface FlashCardProps {
  chinese: string;
  pinyin: string;
  meaning: string;
}

export default function FlashCard({ chinese, pinyin, meaning }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer border border-gray-700 rounded-lg p-6 m-3 w-64 h-40 flex flex-col justify-center items-center text-center shadow-xl bg-gray-800 hover:bg-gray-750 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      {flipped ? (
        <div>
          <p className="text-xl font-bold text-green-400">{meaning}</p>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold text-yellow-300">{chinese}</p>
          <p className="text-lg mt-2 text-gray-300">{pinyin}</p>
        </div>
      )}
    </div>
  );
}