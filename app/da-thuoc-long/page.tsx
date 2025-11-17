import CardList from "../components/CardList";
import { getFlashCardsByStatus } from "../lib/getFlashCardsByStatus";

export default async function ChuaHocPage() {

  const cards = await getFlashCardsByStatus("MASTERED");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-yellow-300">
        Đã thuộc
      </h1>
      <CardList cards={cards} />
    </main>
  );
}
