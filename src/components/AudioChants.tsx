import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface Mantra {
  id: string;
  name: string;
  shloka: string;
  meaning: string;
  baseFreq: number;
}

const MANTRAS: Mantra[] = [
  {
    id: 'gayatri',
    name: 'गायत्री महामंत्र',
    shloka: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    meaning: 'हे प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा! हमारी बुद्धि को सन्मार्ग पर प्रेरित करें।',
    baseFreq: 136.1 // Om frequency
  },
  {
    id: 'mahamrityunjaya',
    name: 'महामृत्युंजय मंत्र',
    shloka: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    meaning: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो समस्त व्याधियों व भय से मुक्ति प्रदान करते हैं।',
    baseFreq: 108.0
  },
  {
    id: 'bhavani',
    name: 'माँ भवानी स्तुति',
    shloka: 'न तातो न माता न बन्धुर्न दाता, न पुत्रो न पुत्री न भृत्यो न भर्ता। न जाया न विद्या न वृत्तिर्ममैव, गतिस्त्वं गतिस्त्वं त्वमेका भवानि॥',
    meaning: 'हे माँ भवानी! संसार में मेरा कोई अन्य आश्रय नहीं है, केवल आप ही मेरी परम गति और रक्षक हैं।',
    baseFreq: 162.0
  }
];

export const AudioChants: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMantra, setSelectedMantra] = useState<Mantra>(MANTRAS[0]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startChantSound = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop existing if any
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }

      // Create rich meditative drone + harmonic
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 1.5, ctx.currentTime); // Perfect fifth harmonic

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscHarmonic.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio Context not allowed or supported', e);
    }
  };

  const stopChantSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          } catch (err) {}
          oscillatorRef.current = null;
        }
        setIsPlaying(false);
      }, 500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopChantSound();
    } else {
      startChantSound(selectedMantra.baseFreq);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#FFF5F0] via-[#FFF9F5] to-[#FFF5F0] border-y border-[#FF671F]/20 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF671F] text-white flex items-center justify-center text-lg shadow-sm shrink-0">
            🕉️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-[#CC5218]">
                पवित्र वैदिक मंत्र एवं ध्यान ध्वनि (Sacred Vedic Mantra)
              </span>
              <div className="flex gap-1">
                {MANTRAS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMantra(m);
                      if (isPlaying) startChantSound(m.baseFreq);
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all ${
                      selectedMantra.id === m.id
                        ? 'bg-[#CC5218] text-white'
                        : 'bg-white text-[#5C4A3E] border border-[#FF671F]/20 hover:bg-[#FFF5F0]'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-[#2C2420] font-medium mt-1 font-mukta italic max-w-2xl line-clamp-1">
              "{selectedMantra.shloka}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleSound}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              isPlaying
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                : 'bg-[#FF671F] hover:bg-[#CC5218] text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>ध्वनि चालू (Playing 108Hz)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>शांति ध्वनि सुनें (Play Drone)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
