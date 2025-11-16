import CardList from '@/components/CardList';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Flash Card Học Tiếng Trung</h1>
      <CardList />
    </main>
  );
}
