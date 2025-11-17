'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FlashCardFormProps {
  initialData?: { id?: number; chinese?: string; pinyin?: string; meaning?: string };
}

export default function FlashCardForm({ initialData }: FlashCardFormProps) {
  const router = useRouter();
  const [chinese, setChinese] = useState(initialData?.chinese || '');
  const [pinyin, setPinyin] = useState(initialData?.pinyin || '');
  const [meaning, setMeaning] = useState(initialData?.meaning || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = initialData?.id ? 'PUT' : 'POST';
    const body = initialData?.id
      ? { id: initialData.id, chinese, pinyin, meaning }
      : { chinese, pinyin, meaning };

    await fetch('/api/flashcards', { method, body: JSON.stringify(body) });
    router.push('/flashcards');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-96 mx-auto p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <input
        placeholder="Chinese"
        value={chinese}
        onChange={(e) => setChinese(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        placeholder="Pinyin"
        value={pinyin}
        onChange={(e) => setPinyin(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        placeholder="Meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition duration-200"
      >
        {initialData?.id ? 'Update' : 'Add'} Flashcard
      </button>
    </form>
  );
}