
import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: Date;
  label: string;
}

const Counter: React.FC<Props> = ({ targetDate, label }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - targetDate.getTime();

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-rose-100 flex flex-col items-center">
      <h3 className="text-rose-700 font-bold mb-4 text-lg">{label}</h3>
      <div className="flex gap-4 text-center">
        <div>
          <span className="block text-3xl font-bold text-rose-600">{time.days}</span>
          <span className="text-xs text-rose-400">يوم</span>
        </div>
        <div>
          <span className="block text-3xl font-bold text-rose-600">{time.hours}</span>
          <span className="text-xs text-rose-400">ساعة</span>
        </div>
        <div>
          <span className="block text-3xl font-bold text-rose-600">{time.minutes}</span>
          <span className="text-xs text-rose-400">دقيقة</span>
        </div>
        <div>
          <span className="block text-3xl font-bold text-rose-600 text-rose-400">{time.seconds}</span>
          <span className="text-xs text-rose-300">ثانية</span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
