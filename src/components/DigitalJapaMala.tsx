import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Volume2, VolumeX, Flame, Award, Heart, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalJapaMalaProps {
  lang: 'hi' | 'gu';
  isDark?: boolean;
}

interface JapaMantra {
  id: string;
  nameHi: string;
  nameGu: string;
  deityHi: string;
  deityGu: string;
  sanskrit: string;
  frequency: number;
}

const MANTRAS: JapaMantra[] = [
  {
    id: 'gayatri',
    nameHi: 'गायत्री महामंत्र',
    nameGu: 'ગાયત્રી મહામંત્ર',
    deityHi: 'मां गायत्री / सूर्य देव',
    deityGu: 'મા ગાયત્રી / સૂર્ય દેવ',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    frequency: 432
  },
  {
    id: 'mahamrityunjaya',
    nameHi: 'महामृत्युंजय मंत्र',
    nameGu: 'મહામૃત્યુંજય મંત્ર',
    deityHi: 'भगवान शिव (आरोग्य एवं रक्षा)',
    deityGu: 'ભગવાન શિવ (આરોગ્ય રક્ષા)',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    frequency: 528
  },
  {
    id: 'shiva',
    nameHi: 'शिव पंचाक्षर मंत्र',
    nameGu: 'શિવ પંચાક્ષર મંત્ર',
    deityHi: 'देवाधिदेव महादेव',
    deityGu: 'દેવાધિદેવ મહાદેવ',
    sanskrit: 'ॐ नमः शिवाय॥',
    frequency: 272
  },
  {
    id: 'ganesh',
    nameHi: 'श्री गणेश बीज मंत्र',
    nameGu: 'શ્રી ગણેશ બીજ મંત્ર',
    deityHi: 'विघ्नहर्ता श्री गणेश',
    deityGu: 'વિઘ્નહર્તા શ્રી ગણેશ',
    sanskrit: 'ॐ गं गणपतये नमः॥',
    frequency: 396
  },
  {
    id: 'krishna',
    nameHi: 'हरे कृष्ण महामंत्र',
    nameGu: 'હરે કૃષ્ણ મહામંત્ર',
    deityHi: 'श्री राधा-कृष्ण',
    deityGu: 'શ્રી રાધા-કૃષ્ણ',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
    frequency: 639
  },
  {
    id: 'durga',
    nameHi: 'दुर्गा नवार्ण मंत्र',
    nameGu: 'દુર્ગા નવર્ણ મંત્ર',
    deityHi: 'मां भवानी जगदम्बा',
    deityGu: 'મા ભવાની જગદંબા',
    sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥',
    frequency: 741
  }
];

export const DigitalJapaMala: React.FC<DigitalJapaMalaProps> = ({ lang, isDark = false }) => {
  const [selectedMantra, setSelectedMantra] = useState<JapaMantra>(MANTRAS[0]);
  const [count, setCount] = useState<number>(0);
  const [completedMalas, setCompletedMalas] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play pleasant acoustic tone on bead click
  const playBeadChime = (freq: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.35);
    } catch (e) {}
  };

  const handleNextBead = () => {
    playBeadChime(selectedMantra.frequency);

    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch (e) {}
    }

    if (count + 1 === 108) {
      setCount(0);
      setCompletedMalas((prev) => prev + 1);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF671F', '#D4AF37', '#10b981', '#dc2626', '#fbbf24']
        });
      } catch (e) {}
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  // Auto-chant loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoChanting) {
      timer = setInterval(() => {
        handleNextBead();
      }, 2400);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoChanting, count, selectedMantra]);

  const percentage = Math.round((count / 108) * 100);

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 mb-2">
          <Flame className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'आध्यात्मिक साधना एवं जप' : 'આધ્યાત્મિક સાધના અને જપ'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'डिजिटल १०८ जप माला' : 'ડિજિટલ ૧૦૮ જપ માળા'}
        </h2>
        <p className="text-sm text-stone-900 font-medium">
          {lang === 'hi'
            ? 'ग्रह शांति, मानसिक एकाग्रता एवं आत्म-कल्याण हेतु 108 मंत्रों का नित्य जाप करें'
            : 'ગ્રહ શાંતિ અને માનસિક એકાગ્રતા માટે 108 મંત્રોનો નિત્ય જાપ કરો'}
        </p>
      </div>

      {/* Japa Box */}
      <div 
        className={`rounded-3xl p-6 sm:p-10 border shadow-2xl transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-slate-900/95 border-amber-500/30 text-amber-100 shadow-amber-950/40' 
            : 'bg-white border-[#FF671F]/25 text-stone-950 shadow-[#FF671F]/10'
        }`}
      >
        {/* Mantra Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#CC5218] dark:text-amber-400 uppercase tracking-wider mb-2.5">
            {lang === 'hi' ? 'मंत्र का चयन करें:' : 'મંત્ર પસંદ કરો:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {MANTRAS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMantra(m);
                  setIsAutoChanting(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedMantra.id === m.id
                    ? 'bg-[#FF671F] text-white shadow-md scale-105 border border-amber-600'
                    : isDark
                    ? 'bg-slate-800 text-stone-300 border border-slate-700 hover:bg-slate-700'
                    : 'bg-[#FFF5F0] text-stone-950 border border-[#FF671F]/30 hover:bg-[#FFEAE0]'
                }`}
              >
                {lang === 'hi' ? m.nameHi : m.nameGu}
              </button>
            ))}
          </div>
        </div>

        {/* Current Sanskrit Mantra Display Card */}
        <div 
          className={`p-5 rounded-2xl text-center shadow-inner mb-8 border ${
            isDark 
              ? 'bg-slate-950 border-amber-500/40 text-amber-100' 
              : 'bg-gradient-to-r from-[#CC5218] to-[#FF671F] text-white border-amber-300'
          }`}
        >
          <span className="text-[11px] bg-black/25 text-amber-200 px-3 py-0.5 rounded-full border border-amber-300/30">
            {lang === 'hi' ? selectedMantra.deityHi : selectedMantra.deityGu}
          </span>
          <p className="font-serif text-base sm:text-xl font-bold mt-2.5 leading-relaxed">
            "{selectedMantra.sanskrit}"
          </p>
        </div>

        {/* Core Mala Ring & Bead Button */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                className={isDark ? 'stroke-slate-800' : 'stroke-[#FFEAE0]'}
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="stroke-[#FF671F] transition-all duration-200"
                strokeWidth="7"
                strokeDasharray="326.7"
                strokeDashoffset={326.7 - (326.7 * count) / 108}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Center Bead Tap Button */}
            <button
              type="button"
              onClick={handleNextBead}
              className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#CC5218] via-[#FF671F] to-amber-400 p-2 shadow-2xl hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center text-white border-4 border-amber-200 cursor-pointer"
              title="Tap to Chant 1 Bead"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-stone-900 to-stone-950 flex flex-col items-center justify-center p-3 text-center shadow-inner">
                <span className="text-xs text-amber-400 font-medium tracking-wide">
                  {lang === 'hi' ? 'स्पर्श करें (Tap)' : 'સ્પર્શ કરો (Tap)'}
                </span>
                <div className="text-4xl sm:text-5xl font-yatra text-amber-100 my-1">
                  {count}
                  <span className="text-base text-amber-400/80 font-sans">/108</span>
                </div>
                <span className="text-[11px] text-amber-300 font-medium">
                  {percentage}% {lang === 'hi' ? 'पूर्ण' : 'પૂર્ણ'}
                </span>
              </div>
            </button>
          </div>

          {/* Stats & Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold border ${isDark ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-[#FFF5F0] border-[#FF671F]/30 text-[#CC5218]'}`}>
              <Award className="w-4 h-4 text-[#FF671F]" />
              <span>
                {lang === 'hi' ? 'संपूर्ण मालाएं: ' : 'સંપૂર્ણ માળા: '}
                <strong className="text-sm font-yatra">{completedMalas}</strong>
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                soundEnabled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-stone-100 text-stone-600 border-stone-300 dark:bg-slate-800 dark:text-stone-400'
              }`}
              title="ध्वनि चालू/बंद"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? (lang === 'hi' ? 'ध्वनि चालू' : 'ધ્વનિ ચાલુ') : (lang === 'hi' ? 'ध्वनि म्यूट' : 'ધ્વનિ બંધ')}</span>
            </button>

            {/* Reset Counter */}
            <button
              type="button"
              onClick={handleReset}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-stone-300 hover:bg-slate-700' 
                  : 'bg-white border-stone-400 text-stone-950 hover:bg-stone-50'
              }`}
              title="काउंट रीसेट करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'रीसेट' : 'રીસેટ'}</span>
            </button>

            {/* Auto Chant Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoChanting(!isAutoChanting)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow ${
                isAutoChanting
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-[#FF671F] hover:bg-[#CC5218] text-white'
              }`}
            >
              {isAutoChanting 
                ? (lang === 'hi' ? 'रोकें (Stop Auto)' : 'રોકો (Stop Auto)') 
                : (lang === 'hi' ? '⚡ स्वतः जप (Auto)' : '⚡ આપમેળે જપ')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
