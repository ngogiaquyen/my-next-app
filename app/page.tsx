// app/page.tsx
import CardList from "@/app/components/CardList";
import StatsPanel from "@/app/components/StatsPanel";
import { getFlashCards } from "./lib/getFlashCards";

export default async function Home() {
  const cards = await getFlashCards();

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Tiêu đề nhỏ gọn */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Flashcard 中文
        </h1>
      </div>

      {/* Danh sách thẻ - chừa chỗ trên để panel trượt xuống */}
      <div className="px-4 pt-4">
        <CardList cards={cards} />
      </div>

      {/* Panel trượt từ trên xuống */}
      <StatsPanel cards={cards} />
    </main>
  );
}