
export interface Memory {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface Surprise {
  title: string;
  content: string;
  type: 'text' | 'image' | 'voice';
  locked?: boolean;
  unlockDate?: string;
}

export enum Mood {
  MISSING = 'مشتاقتلك',
  LOVE = 'بحبك',
  PROUD = 'فخور فيكي',
}
