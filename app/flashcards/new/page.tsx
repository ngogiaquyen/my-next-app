'use client';
import FlashCardForm from '@/components/FlashCardForm';
import Link from 'next/link';

export default function NewFlashCardPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Thêm Flash Card Mới</h1>
      <FlashCardForm />
      <div className="text-center mt-4">
        <Link href="/flashcards" className="text-blue-500 hover:underline">
          Quay lại danh sách
        </Link>
      </div>
    </main>
  );
}
