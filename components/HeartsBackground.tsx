
import React, { useEffect, useState } from 'react';

interface Props {
  mode?: 'floating' | 'falling';
  type?: 'hearts' | 'birthday';
}

const HeartsBackground: React.FC<Props> = ({ mode = 'floating', type = 'hearts' }) => {
  const [elements, setElements] = useState<{ id: number; left: string; size: string; duration: string; delay: string; content: string }[]>([]);

  const heartIcons = ['❤️', '💖', '💝', '✨'];
  const birthdayIcons = ['🎈', '🎁', '🎂', '🎉', '🧸', '🧁', '✨', '💖'];

  useEffect(() => {
    const icons = type === 'birthday' ? birthdayIcons : heartIcons;
    const newElements = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 25 + 15}px`,
      duration: `${Math.random() * (mode === 'falling' ? 5 : 10) + 5}s`,
      delay: `${Math.random() * 8}s`,
      content: icons[Math.floor(Math.random() * icons.length)]
    }));
    setElements(newElements);
  }, [mode, type]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>
        {`
          @keyframes falling {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
          }
          .falling-item {
            position: absolute;
            pointer-events: none;
            animation: falling linear infinite;
            top: -50px;
          }
          @keyframes floating {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          .floating-item {
            position: absolute;
            pointer-events: none;
            animation: floating linear infinite;
            bottom: -50px;
          }
        `}
      </style>
      {elements.map((el) => (
        <div
          key={el.id}
          className={`${mode === 'falling' ? 'falling-item' : 'floating-item'} transition-all duration-1000`}
          style={{
            left: el.left,
            fontSize: el.size,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        >
          {el.content}
        </div>
      ))}
    </div>
  );
};

export default HeartsBackground;
