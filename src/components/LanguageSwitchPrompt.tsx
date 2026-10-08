import React, { useState, useEffect } from 'react';
import { Globe, X, Check } from 'lucide-react';
import { Language } from '../types/astrology';
import { isManualLanguageSelected } from '../utils/languageDetector';

interface LanguageSwitchPromptProps {
  lang: Language;
  setLang: (l: Language) => void;
  userZone?: string; // 'gujarat' | 'north_india' | 'south_india' | 'abroad'
}

export const LanguageSwitchPrompt: React.FC<LanguageSwitchPromptProps> = ({
  lang,
  setLang,
  userZone = 'gujarat',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user already explicitly manually selected their language via the header switcher, don't nag them
    if (isManualLanguageSelected()) return;

    // Check if user dismissed prompt in this session
    try {
      const dismissed = sessionStorage.getItem('bhawani_lang_prompt_dismissed');
      if (dismissed === 'true') return;
    } catch {
      // continue
    }

    // Show prompt specifically for Gujarat audience (where both Gujarati and Hindi speakers coexist)
    const isGujarat = userZone === 'gujarat';
    if (isGujarat) {
      // Short delay for smooth appearance after page loads
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [userZone]);

  if (!isVisible) return null;

  const handleSwitch = (newLang: Language) => {
    setLang(newLang);
    setIsVisible(false);
    try {
      sessionStorage.setItem('bhawani_lang_prompt_dismissed', 'true');
    } catch {}
  };

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('bhawani_lang_prompt_dismissed', 'true');
    } catch {}
  };

  return (
    <aside 
      aria-label="Language selection banner"
      className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
    >
      <div className="bg-gradient-to-r from-[#070b1e] via-[#0d143a] to-[#070b1e] text-white p-3 sm:p-3.5 rounded-2xl border-2 border-[#ffd236]/40 shadow-2xl shadow-black/80 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f99c00] to-[#ffd236] text-black flex items-center justify-center shrink-0 shadow-sm font-black text-xs">
            <Globe className="w-4 h-4 text-black animate-pulse" />
          </div>
          
          <div className="text-xs sm:text-[13px] leading-tight min-w-0">
            {lang === 'gu' ? (
              <div>
                <span className="text-[#ffd236] font-bold">📍 ગુજરાત / गुजरात</span>
                <span className="block text-slate-200 text-[11px] sm:text-xs mt-0.5">
                  यदि आप <strong className="text-amber-300">हिंदी</strong> में पढ़ना चाहते हैं तो यहाँ बदलें:
                </span>
              </div>
            ) : lang === 'hi' ? (
              <div>
                <span className="text-[#ffd236] font-bold">📍 गुजरात / ગુજરાત</span>
                <span className="block text-slate-200 text-[11px] sm:text-xs mt-0.5">
                  જો તમે <strong className="text-amber-300">ગુજરાતી</strong>માં વાંચવા માંગતા હો તો:
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[#ffd236] font-bold">📍 Regional Language</span>
                <span className="block text-slate-300 text-[11px] sm:text-xs mt-0.5">
                  हिंदी या ગુજરાતી में पढ़ें:
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {lang === 'gu' ? (
            <button
              type="button"
              onClick={() => handleSwitch('hi')}
              className="bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] hover:scale-105 active:scale-95 text-black font-black text-xs px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <span>हिंदी करें</span>
            </button>
          ) : lang === 'hi' ? (
            <button
              type="button"
              onClick={() => handleSwitch('gu')}
              className="bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] hover:scale-105 active:scale-95 text-black font-black text-xs px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <span>ગુજરાતી કરો</span>
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleSwitch('hi')}
                className="bg-gradient-to-r from-[#f99c00] to-[#ffd236] text-black font-bold text-[11px] px-2 py-1 rounded cursor-pointer"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleSwitch('gu')}
                className="bg-gradient-to-r from-[#f99c00] to-[#ffd236] text-black font-bold text-[11px] px-2 py-1 rounded cursor-pointer"
              >
                ગુજ
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            title="बंद करें (Close)"
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
