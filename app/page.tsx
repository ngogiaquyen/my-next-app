// app/page.tsx
import CardList from '@/app/components/CardList';
import { getFlashCards } from './lib/getFlashCards';

export default async function Home() {
  const cards = await getFlashCards();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8">
      <CardList cards={cards} />
    </main>
  );
}