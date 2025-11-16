'use client';
import FlashCard from './FlashCard';

interface FlashCardItem {
  id: number;
  chinese: string;
  pinyin: string;
  meaning: string;
}

interface CardListProps {
  cards: FlashCardItem[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <div className="flex flex-wrap justify-center min-h-screen bg-gray-900 p-6">
      {cards.map((card) => (
        <FlashCard
          key={card.id}
          chinese={card.chinese}
          pinyin={card.pinyin}
          meaning={card.meaning}
        />
      ))}
    </div>
  );
}