
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Music, 
  Volume2, 
  VolumeX, 
  Gift, 
  Calendar, 
  Image as ImageIcon, 
  Sparkles,
  MessageSquareHeart,
  ChevronDown,
  Lock,
  Unlock,
  Play,
  Cake
} from 'lucide-react';
import HeartsBackground from './components/HeartsBackground';
import TypeWriter from './components/TypeWriter';
import Counter from './components/Counter';
import { 
  PARTNER_NAME, 
  START_DATE, 
  FIRST_MEETING_DATE, 
  DAILY_MESSAGES, 
  MOOD_MESSAGES,
  MEMORIES,
  SURPRISES
} from './constants';
import { Mood } from './types';
import { generateLoveMessage } from './services/geminiService';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBirthdayMode, setIsBirthdayMode] = useState(true); // Default to birthday for this version
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodMessage, setMoodMessage] = useState<string>('');
  const [dayMessage, setDayMessage] = useState<string>('');
  const [showSurprise, setShowSurprise] = useState(false);
  const [triviaAnswer, setTriviaAnswer] = useState('');
  const [isTriviaSolved, setIsTriviaSolved] = useState(false);
  const [aiLetter, setAiLetter] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  
  // Intro and Audio states
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // New Romantic Instrumental Music Source (Romantic Piano)
  const romanticMusicUrl = "https://cdn.pixabay.com/audio/2022/02/22/audio_d0c6ff1101.mp3";

  // Time-based background
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 18) setIsDark(true);
  }, []);

  // Pick message of the day
  useEffect(() => {
    const todayIndex = new Date().getDate() % DAILY_MESSAGES.length;
    setDayMessage(DAILY_MESSAGES[todayIndex]);
  }, []);

  // Ensure music plays when not muted and intro is gone
  useEffect(() => {
    if (audioRef.current && !showIntro) {
      if (!isMuted) {
        audioRef.current.play().catch(err => {
          console.error("Audio play failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [showIntro, isMuted]);

  const handleStartExperience = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted) {
        audioRef.current.play().catch(e => console.log(e));
      }
    }
  };

  const toggleBirthdayMode = () => {
    setIsBirthdayMode(!isBirthdayMode);
  };

  const handleMoodClick = (mood: Mood) => {
    setSelectedMood(mood);
    const messages = MOOD_MESSAGES[mood];
    setMoodMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleAskGemini = async () => {
    setLoadingAi(true);
    const msg = await generateLoveMessage(selectedMood || undefined);
    setAiLetter(msg);
    setLoadingAi(false);
  };

  const checkTrivia = () => {
    const normalized = triviaAnswer.trim().replace('ي', 'ى').replace('أ', 'ا');
    if (normalized.includes('15') && (normalized.includes('يناير') || normalized.includes('كانون'))) { 
      setIsTriviaSolved(true);
    } else {
      alert('إجابة خاطئة.. جربي تتذكري تاريخ أول لقاء! (١٥ يناير)');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDark ? 'bg-slate-900 text-rose-100' : 'bg-rose-50 text-rose-900'}`}>
      {/* Background Music */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        src={romanticMusicUrl}
      />

      {/* Intro Screen */}
      {showIntro && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center animate-fade-in overflow-hidden transition-colors duration-1000 ${isBirthdayMode ? 'bg-rose-500' : 'bg-pink-600'} text-white`}>
          <HeartsBackground mode="falling" type={isBirthdayMode ? 'birthday' : 'hearts'} />
          <div className="relative z-10 flex flex-col items-center max-w-2xl">
            <div className="text-8xl mb-8 animate-bounce">
              {isBirthdayMode ? '🎂' : '❤️'}
            </div>
            <h1 className="font-calligraphy text-6xl md:text-8xl mb-6 drop-shadow-lg">
              {isBirthdayMode ? 'كل عام وأنتِ بخير يا روحي' : 'إليكِ يا حبيبتي'}
            </h1>
            <p className="text-2xl md:text-3xl font-classic mb-12 opacity-90">
              {isBirthdayMode ? 'اليوم هو أجمل يوم في السنة لأنكِ وُلدتِ فيه' : 'هذه المساحة الصغيرة تعبير عن حبي الكبير'}
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleStartExperience}
                className="group relative px-12 py-6 bg-white text-rose-600 rounded-full font-bold text-2xl shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-110 transition-transform flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-rose-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative z-10">افتحي هديتك {isBirthdayMode ? '🎁' : '💖'}</span>
                <Play className="relative z-10 fill-current" size={28} />
              </button>
              
              <button 
                onClick={toggleBirthdayMode}
                className="text-white/80 hover:text-white flex items-center gap-2 justify-center transition"
              >
                {isBirthdayMode ? <Heart size={18} /> : <Cake size={18} />}
                <span>تبديل إلى {isBirthdayMode ? 'الوضع الرومانسي' : 'وضع عيد الميلاد'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {!showIntro && <HeartsBackground mode="floating" type={isBirthdayMode ? 'birthday' : 'hearts'} />}

      {/* Floating Controls */}
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-4">
        <button 
          onClick={toggleMute}
          title="كتم/تشغيل الموسيقى"
          className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition border border-white/30"
        >
          {isMuted ? <VolumeX className="text-rose-500" /> : <Volume2 className="text-rose-500" />}
        </button>
        <button 
          onClick={() => setIsDark(!isDark)}
          title="تغيير النمط"
          className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition border border-white/30"
        >
          <Sparkles className={isDark ? "text-yellow-400" : "text-rose-500"} />
        </button>
        <button 
          onClick={toggleBirthdayMode}
          title="وضع عيد الميلاد"
          className={`p-3 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 transition border border-white/30 ${isBirthdayMode ? 'bg-yellow-400/30' : 'bg-white/20'}`}
        >
          <Cake className={isBirthdayMode ? "text-yellow-600" : "text-rose-500"} />
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative p-6 text-center">
        <div className="z-10 flex flex-col items-center">
          <div className="heart-pulse text-8xl md:text-9xl mb-8 drop-shadow-2xl">
            {isBirthdayMode ? '🎂' : '❤️'}
          </div>
          <h1 className="font-calligraphy text-5xl md:text-7xl mb-6 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            {PARTNER_NAME}
          </h1>
          <div className="max-w-xl min-h-[100px]">
            {!showIntro && (
              <TypeWriter 
                text={isBirthdayMode 
                  ? "كل عام وأنتِ بقلبي، كل عام وأنتِ فرحة أيامي... ميلادك هو عيد لروحي قبل أن يكون عيداً لكِ."
                  : "كل نبضة في قلبي تناديكِ، وكل سطر أكتبه هو اعتراف جديد بحبي لكِ..."
                } 
              />
            )}
          </div>
          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="text-rose-400" />
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-calligraphy text-center mb-10 flex items-center justify-center gap-3">
          <Calendar className="text-rose-500" /> حكايتنا بالأرقام
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Counter targetDate={START_DATE} label="منذ أن عرفتكِ" />
          <Counter targetDate={FIRST_MEETING_DATE} label="منذ أول لقاء" />
        </div>
      </section>

      {/* Daily Message & Moods */}
      <section className="py-20 px-6 bg-white/10 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-2xl transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles /> {isBirthdayMode ? 'أمنية لكِ اليوم' : 'رسالة اليوم'}
            </h3>
            <p className="text-xl font-classic italic leading-relaxed">
              "{isBirthdayMode ? "أتمنى أن تظلي مشرقة كشمس الصباح، وقلبكِ مليئاً بالحب الذي تستحقينه." : dayMessage}"
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-calligraphy">كيف تشعرين الآن؟</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.values(Mood).map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodClick(mood)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                    selectedMood === mood 
                    ? 'bg-rose-500 border-rose-500 text-white shadow-lg scale-110' 
                    : 'border-rose-300 hover:border-rose-500 hover:text-rose-500'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="mt-8 p-6 bg-white/40 rounded-2xl animate-fade-in">
                <p className="text-lg font-classic text-rose-700 leading-relaxed mb-4">
                  {moodMessage}
                </p>
                <button 
                  onClick={handleAskGemini}
                  className="text-sm flex items-center gap-2 mx-auto text-rose-400 hover:text-rose-600 transition"
                  disabled={loadingAi}
                >
                  <MessageSquareHeart size={16} /> 
                  {loadingAi ? 'جاري التفكير...' : 'اطلبي رسالة خاصة من قلبي'}
                </button>
                {aiLetter && (
                  <div className="mt-4 p-4 border-t border-rose-100 font-classic text-rose-600 italic">
                    {aiLetter}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-calligraphy text-center mb-16 flex items-center justify-center gap-3">
          <ImageIcon className="text-rose-500" /> شريط ذكرياتنا
        </h2>
        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-1/2 before:w-0.5 before:bg-rose-200 before:hidden md:before:block">
          {MEMORIES.map((memory, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="rounded-3xl shadow-xl hover:scale-105 transition duration-500 w-full aspect-video object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-right">
                <span className="text-rose-400 font-bold">{memory.date}</span>
                <h4 className="text-2xl font-bold mt-2 mb-4 text-rose-600">{memory.title}</h4>
                <p className="text-rose-700/80 leading-relaxed">{memory.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surprises Section */}
      <section className="py-20 px-6 bg-rose-100/50">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <h2 className="text-3xl font-calligraphy flex items-center justify-center gap-3">
            <Gift className="text-rose-500" /> مفاجآت لكِ وحدكِ
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-200">
            {!isTriviaSolved ? (
              <div className="space-y-6">
                <p className="text-lg">سؤال صغير لفتح الهدية: متى كان أول يوم تعارفنا فيه؟</p>
                <div className="flex gap-2 justify-center">
                  <input 
                    type="text" 
                    placeholder="مثال: 15 يناير" 
                    value={triviaAnswer}
                    onChange={(e) => setTriviaAnswer(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button 
                    onClick={checkTrivia}
                    className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                  >
                    تأكيد
                  </button>
                </div>
                <p className="text-xs text-rose-300 italic">تلميح: شوفي أول ذكرى فوق!</p>
              </div>
            ) : (
              <div className="animate-bounce">
                <button 
                  onClick={() => setShowSurprise(!showSurprise)}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-8 py-4 bg-white rounded-2xl leading-none flex items-center gap-2">
                    <Gift className="text-rose-500" />
                    <span className="text-rose-700 font-bold">افتحي هديتك الآن!</span>
                  </div>
                </button>
              </div>
            )}

            {showSurprise && isTriviaSolved && (
              <div className="mt-8 p-6 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-300 animate-fade-in">
                <h4 className="text-xl font-bold mb-4">{isBirthdayMode ? 'عيدي هو وجودك..' : 'أنتِ عيدي كل يوم..'}</h4>
                <p className="italic mb-6 leading-relaxed">
                  "شكراً لأنكِ جعلتِ لحياتي معنى. هذه المساحة هي مكانكِ الصغير، سأضيف لها دائماً ما يسعدكِ."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {SURPRISES.map((surprise, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl shadow-sm border border-rose-100 flex flex-col items-center gap-2">
                      {surprise.locked ? <Lock size={20} className="text-gray-400" /> : <Unlock size={20} className="text-green-500" />}
                      <span className="text-sm font-bold">{surprise.title}</span>
                      {surprise.locked ? (
                        <span className="text-xs text-rose-300">يفتح في {surprise.unlockDate}</span>
                      ) : (
                        <p className="text-xs text-rose-500">{surprise.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 text-center border-t border-rose-200 mt-20">
        <p className="font-calligraphy text-2xl text-rose-500 mb-2">أحبكِ دائماً وأبداً</p>
        <p className="text-rose-400 text-sm">صُنع بحب من أجلكِ وحدكِ</p>
        <div className="mt-8 flex justify-center gap-4">
          <Heart className="text-rose-500 fill-current animate-pulse" />
          <Heart className="text-rose-400 fill-current animate-pulse delay-75" />
          <Heart className="text-rose-300 fill-current animate-pulse delay-150" />
        </div>
      </footer>

      {/* Music Playing UI */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-2xl flex items-center gap-3 border border-rose-100">
           <Music className={`text-rose-500 ${isMuted || showIntro ? '' : 'animate-spin-slow'}`} />
           <div className="hidden md:block">
             <p className="text-[10px] text-rose-400 uppercase tracking-widest font-bold">Background Music</p>
             <p className="text-xs text-rose-700 font-bold truncate w-40">
               {isMuted ? 'Muted' : (showIntro ? 'Click to Start' : 'لحن الحب الهادئ')}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
