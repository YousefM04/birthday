
import React from 'react';
import { Memory, Mood, Surprise } from './types';

export const PARTNER_NAME = "يا روحي";
export const START_DATE = new Date('2023-01-15T00:00:00'); // التاريخ الذي تعرفتم فيه
export const FIRST_MEETING_DATE = new Date('2023-02-14T18:30:00');

export const DAILY_MESSAGES = [
  "أنتِ أجمل ما حدث في حياتي اليوم وكل يوم.",
  "ابتسامتكِ هي شروق الشمس الخاص بي.",
  "أحبكِ أكثر مما تعتقدين، وأقل مما تستحقين.",
  "كل دقيقة معكِ هي ذكرى سأحتفظ بها للأبد.",
  "شكراً لأنكِ كنتِ دائماً هنا، بجانبي وبقلبي.",
  "أنتِ لستِ فقط حبيبتي، أنتِ موطني.",
];

export const MOOD_MESSAGES: Record<Mood, string[]> = {
  [Mood.MISSING]: [
    "المسافات لا تعني شيئاً عندما تكون القلوب قريبة.",
    "أعد الساعات حتى أراكِ مجدداً.",
    "مكانكِ الفارغ بجانبي يملأه الشوق إليكِ."
  ],
  [Mood.LOVE]: [
    "كلمة أحبك قليلة جداً على ما أشعر به تجاهك.",
    "أنتِ اختياري الأول والأخير.",
    "كل نبضة في قلبي تنطق باسمك."
  ],
  [Mood.PROUD]: [
    "أنتِ امرأة قوية، ملهمة، ومذهلة.",
    "أنا فخور جداً بكل ما تحققينه.",
    "استمري في التألق، فالعالم يحتاج لنورك."
  ]
};

export const MEMORIES: Memory[] = [
  {
    date: '15 يناير 2023',
    title: 'أول رسالة',
    description: 'اليوم اللي بدأ فيه كل شيء، الكلمات البسيطة اللي غيرت حياتي.',
    image: 'https://picsum.photos/seed/love1/800/600'
  },
  {
    date: '14 فبراير 2023',
    title: 'أول لقاء',
    description: 'العالم توقف للحظة لما عيوني شافوا عيونك لأول مرة.',
    image: 'https://picsum.photos/seed/love2/800/600'
  },
  {
    date: '10 مايو 2023',
    title: 'رحلتنا الأولى',
    description: 'الضحك اللي ما وقف، والأماكن اللي خلدت ذكرياتنا.',
    image: 'https://picsum.photos/seed/love3/800/600'
  }
];

export const SURPRISES: Surprise[] = [
  {
    title: "رسالة سرية",
    content: "أنتِ القصة التي لا أريدها أن تنتهي أبداً.",
    type: 'text'
  },
  {
    title: "مفاجأة 2024",
    content: "هذه الرسالة ستفتح في ليلة رأس السنة!",
    type: 'text',
    locked: true,
    unlockDate: '2024-12-31'
  }
];
