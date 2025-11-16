// app/api/speak/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  const { text } = await request.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Phát âm từ tiếng Trung này bằng giọng nữ, chuẩn Bắc Kinh: "${text}"`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!audioBase64) {
    return NextResponse.json({ error: 'Không tạo được âm thanh' }, { status: 500 });
  }

  return NextResponse.json({ audio: audioBase64 });
}