import CardList from '@/components/CardList';

async function getFlashCards() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/flashcards`, {
    cache: 'no-store', // Đảm bảo luôn lấy dữ liệu mới (tùy nhu cầu)
  });
  if (!res.ok) {
    console.error('Failed to fetch flashcards');
    return [];
  }
  return res.json();
}

export default async function Home() {
  const cards = await getFlashCards();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-yellow-300 drop-shadow-md">
        Flash Card Học Tiếng Trung
      </h1>
      <CardList cards={cards} />
    </main>
  );
}