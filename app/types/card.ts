export interface Card {
  id: number;
  chinese: string;
  pinyin: string;
  meaning: string;
  status: 'NOT_LEARNED' | 'LEARNING' | 'REVIEW' | 'MASTERED';
}
