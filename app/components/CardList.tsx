// app/components/CardList.tsx
import { Card } from '../types/card';
import FlashCard from './FlashCard';

export default function CardList({ cards }: { cards: Card[] }) {
  return (
    <div className="flex flex-wrap justify-center min-h-screen">
      {cards.map((card) => (
        <FlashCard
          key={card.id}
          id={card.id}
          chinese={card.chinese}
          pinyin={card.pinyin}
          meaning={card.meaning}
          status={card.status}
        />
      ))}
    </div>
  );
}