import React, { useState } from 'react';
import { Send, Sparkles, User, Bot, AlertCircle, Phone, MessageCircle, RefreshCw } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { generateVedicAstrologyGuidance } from '../utils/vedicAstrologyEngine';

interface Message {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
}

interface AskAstrologerProps {
  lang: 'hi' | 'gu';
  initialQuery?: string;
  isDark?: boolean;
}

const COMMON_QUESTIONS = [
  "विवाह में विलंब हो रहा है, योग्य जीवनसाथी कब मिलेगा?",
  "व्यापार में लगातार घाटा हो रहा है, क्या उपाय करें?",
  "सरकारी नौकरी या मनचाही पदोन्नति का योग कब है?",
  "कुंडली में मांगलिक दोष या कालसर्प दोष का प्रभाव कैसे दूर करें?",
  "विदेश यात्रा या पीआर (PR) के योग कब बन रहे हैं?",
  "संतान प्राप्ति में बाधा आ रही है, कौन सा अनुष्ठान करें?"
];

export const AskAstrologer: React.FC<AskAstrologerProps> = ({ lang, initialQuery, isDark = false }) => {
  const [question, setQuestion] = useState(initialQuery || '');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'astrologer',
      text: '🚩 जय माँ भवानी! मैं भवानी ज्योतिष केंद्र, मेहसाणा से आचार्य जी का डिजिटल वैदिक सहायक हूँ। आप विवाह, करियर, व्यापार, स्वास्थ्य, मांगलिक दोष या किसी भी समस्या के संबंध में प्रश्न पूछ सकते हैं।',
      timestamp: 'अभी'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (queryText?: string) => {
    const textToSend = queryText || question;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await fetch('/api/astrology/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          lang: lang === 'hi' ? 'हिंदी' : 'गुजराती'
        })
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'astrologer',
        text: data.answer || '🚩 माँ भवानी की कृपा से आपकी समस्या का शीघ्र समाधान होगा। विस्तृत परामर्श हेतु पंडित जी से संपर्क करें।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("API route unavailable (static hosting mode), utilizing client-side Vedic intelligence:", err);
      // Smart Vedic client-side fallback (ideal for GitHub Pages / Hostinger Static Hosting)
      const offlineAnswer = generateVedicAstrologyGuidance(textToSend, lang);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'astrologer',
        text: offlineAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`py-8 px-4 max-w-5xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-purple-950/40 text-purple-300 border-purple-500/30' 
            : 'bg-purple-50 text-purple-700 border-purple-200'
        }`}>
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{lang === 'hi' ? '24x7 वैदिक AI ज्योतिषी परामर्श' : '24x7 વૈદિક AI જ્યોતિષી પરામર્શ'}</span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'hi' ? 'पूछें ज्योतिषी से (तत्काल समाधान)' : 'પૂછો જ્યોતિષીને (ત્વરિત સમાધાન)'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'hi'
            ? 'पाराशर वैदिक ज्योतिष एवं ग्रह-नक्षत्रों के आधार पर अपने प्रश्नों का त्वरित एवं प्रामाणिक मार्गदर्शन पाएं'
            : 'શાસ્ત્રોક્ત વૈદિક જ્યોતિષ આધારિત તમારા પ્રશ્નોનું ત્વરિત અને સચોટ માર્ગદર્શન મેળવો'}
        </p>
      </div>

      {/* Suggested Quick Questions */}
      <div className="mb-6">
        <span className={`text-xs font-bold block mb-2 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
          {lang === 'hi' ? '💡 अक्सर पूछे जाने वाले प्रश्न (Quick Select):' : '💡 સામાન્ય પ્રશ્નો:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(q)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all text-left shadow-sm font-bold border ${
                isDark 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 hover:text-amber-300 border-stone-700 hover:border-amber-400' 
                  : 'bg-white hover:bg-[#FFF5F0] text-stone-950 hover:text-[#CC5218] border-[#FF671F]/30 hover:border-[#FF671F]'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className={`rounded-3xl border shadow-xl overflow-hidden flex flex-col h-[520px] transition-all ${
        isDark 
          ? 'bg-stone-900 border-amber-500/20 shadow-black/40' 
          : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
      }`}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#FF671F] to-[#CC5218] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-amber-300">
              🔱
            </div>
            <div>
              <h4 className="font-yatra text-lg leading-tight">
                {lang === 'hi' ? 'भवानी ज्योतिष - वैदिक समाधान' : 'ભવાની જ્યોતિષ - વૈદિક સમાધાન'}
              </h4>
              <span className="text-xs text-amber-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ऑनलाइन सक्रिय (Online)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-white text-xs font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">कॉल करें</span>
            </a>
          </div>
        </div>

        {/* Message History */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${
          isDark ? 'bg-stone-950/70' : 'bg-[#FFFDF9]'
        }`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'astrologer' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-sm shrink-0 mt-1 shadow-sm font-bold">
                  ॐ
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#FF671F] text-white rounded-br-none'
                    : isDark 
                      ? 'bg-stone-800 text-stone-100 border border-amber-500/20 rounded-bl-none font-medium'
                      : 'bg-white text-stone-950 border border-[#FF671F]/20 rounded-bl-none font-medium'
                }`}
              >
                <div className="whitespace-pre-line font-mukta">{msg.text}</div>
                <span
                  className={`text-[10px] block mt-1.5 text-right ${
                    msg.sender === 'user' 
                      ? 'text-amber-100' 
                      : isDark ? 'text-stone-400 font-bold' : 'text-stone-900 font-bold'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-sm shrink-0">
                ॐ
              </div>
              <div className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
                isDark 
                  ? 'bg-stone-800 border-amber-500/20 text-amber-300' 
                  : 'bg-white border-[#FF671F]/20 text-[#CC5218]'
              }`}>
                <RefreshCw className="w-4 h-4 animate-spin text-[#FF671F]" />
                <span>ग्रह-नक्षत्रों की गणना एवं फलादेश तैयार हो रहा है...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className={`p-3 sm:p-4 border-t flex items-center gap-2 ${
            isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-[#FF671F]/15'
          }`}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={lang === 'hi' ? 'अपना ज्योतिषीय प्रश्न यहाँ लिखें (उदा. शादी कब होगी?)...' : 'તમારો પ્રશ્ન અહીં લખો...'}
            className={`flex-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-xs sm:text-sm font-medium ${
              isDark 
                ? 'bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-400' 
                : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-950 placeholder:text-stone-600'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-[#FF671F] hover:bg-[#CC5218] disabled:opacity-50 text-white font-bold px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">पूछें</span>
          </button>
        </form>
      </div>

      {/* Footer Support Strip */}
      <div className={`mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-semibold ${
        isDark 
          ? 'bg-stone-900 border-amber-500/20 text-stone-200' 
          : 'bg-[#FFF5F0] border-[#FF671F]/25 text-stone-950'
      }`}>
        <div className="flex items-center gap-2">
          <span>🚩</span>
          <span>
            {lang === 'hi'
              ? 'गंभीर समस्याओं या विस्तृत कुंडली परामर्श के लिए पंडित जी से सीधे संपर्क करें'
              : 'ગંભીર સમસ્યાઓ માટે પંડિતજીને રૂબરૂ અથવા ફોન પર સંપર્ક કરો'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>कॉल करें</span>
          </a>
          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी! मुझे अपनी जन्म कुंडली के संबंध में परामर्श चाहिए।')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>व्हाट्सएप</span>
          </a>
        </div>
      </div>
    </div>
  );
};
