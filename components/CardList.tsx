'use client';

import FlashCard from './FlashCard';
import { words } from '@/data/words';

export default function CardList() {
  return (
    <div className="flex flex-wrap justify-center">
      {words.map((word) => (
        <FlashCard
          key={word.id}
          chinese={word.chinese}
          pinyin={word.pinyin}
          meaning={word.meaning}
        />
      ))}
    </div>
  );
}
