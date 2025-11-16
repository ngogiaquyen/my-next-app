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
      className="cursor-pointer border rounded-lg p-6 m-2 w-64 h-40 flex flex-col justify-center items-center text-center shadow-lg bg-white hover:shadow-xl transition"
    >
      {flipped ? (
        <div>
          <p className="text-xl font-bold">{meaning}</p>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold">{chinese}</p>
          <p className="text-lg mt-2">{pinyin}</p>
        </div>
      )}
    </div>
  );
}
