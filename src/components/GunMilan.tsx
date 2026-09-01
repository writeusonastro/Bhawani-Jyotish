import React, { useState, useEffect } from 'react';
import { GunMilanResult } from '../types/astrology';
import { calculateGunMilan } from '../utils/vedicCalculations';
import { RASHIS, NAKSHATRAS, ASTROLOGER_INFO } from '../data/astrologyData';
import { HeartHandshake, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GunMilanProps {
  lang: 'hi' | 'gu';
  onOpenBooking: () => void;
}

export const GunMilan: React.FC<GunMilanProps> = ({ lang, onOpenBooking }) => {
  const [boyName, setBoyName] = useState('वर (अमित)');
  const [girlName, setGirlName] = useState('वधू (प्रिया)');
  const [boyRashiIdx, setBoyRashiIdx] = useState(0); // Mesha
  const [girlRashiIdx, setGirlRashiIdx] = useState(4); // Simha
  const [boyNakshatraIdx, setBoyNakshatraIdx] = useState(0); // Ashwini
  const [girlNakshatraIdx, setGirlNakshatraIdx] = useState(9); // Magha

  const [result, setResult] = useState<GunMilanResult | null>(() => 
    calculateGunMilan(boyName, girlName, boyRashiIdx, girlRashiIdx, boyNakshatraIdx, girlNakshatraIdx)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateGunMilan(boyName, girlName, boyRashiIdx, girlRashiIdx, boyNakshatraIdx, girlNakshatraIdx);
    setResult(res);

    if (res.totalGunas >= 24) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-rose-200 mb-2">
          <HeartHandshake className="w-4 h-4 text-rose-600" />
          <span>{lang === 'hi' ? 'वैदिक विवाह अष्टकूट मिलान' : 'વૈદિક લગ્ન અષ્ટકૂટ મિલાન'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'कुंडली मिलान (36 गुण विचार)' : 'કુંડળી મિલાન (36 ગુણ વિચાર)'}
        </h2>
        <p className="text-sm text-[#665448]">
          {lang === 'hi'
            ? 'वर एवं वधू के जन्म नक्षत्र व राशि अनुसार 36 गुणों, नाड़ी दोष, भकूट दोष एवं दांपत्य सुख का प्रामाणिक मिलान'
            : 'વર અને કન્યાના નક્ષત્ર અને રાશિ અનુસાર 36 ગુણો અને દાંપત્ય સુખનું શાસ્ત્રોક્ત મિલાન'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form (5 cols) */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCalculate} className="bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 space-y-5">
            <h3 className="font-yatra text-xl text-[#CC5218] pb-2 border-b border-[#FF671F]/15 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF671F]" />
              <span>{lang === 'hi' ? 'वर-वधू विवरण दर्ज करें' : 'વર-કન્યા વિગત દાખલ કરો'}</span>
            </h3>

            {/* Boy Details */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-3">
              <div className="font-bold text-xs sm:text-sm text-blue-900 flex items-center gap-2">
                <span>👦</span>
                <span>{lang === 'hi' ? 'वर का विवरण (Groom Details)' : 'વરની વિગત'}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'वर का नाम' : 'વરનું નામ'}
                </label>
                <input
                  type="text"
                  required
                  value={boyName}
                  onChange={(e) => setBoyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="वर का नाम"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'वर की राशि' : 'વરની રાશિ'}
                  </label>
                  <select
                    value={boyRashiIdx}
                    onChange={(e) => setBoyRashiIdx(parseInt(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {RASHIS.map((r, idx) => (
                      <option key={r.id} value={idx}>{r.symbol} {r.nameHi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'वर का नक्षत्र' : 'વરનું નક્ષત્ર'}
                  </label>
                  <select
                    value={boyNakshatraIdx}
                    onChange={(e) => setBoyNakshatraIdx(parseInt(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {NAKSHATRAS.map((nak, idx) => (
                      <option key={nak} value={idx}>{nak.split(' ')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Girl Details */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/60 space-y-3">
              <div className="font-bold text-xs sm:text-sm text-rose-900 flex items-center gap-2">
                <span>👧</span>
                <span>{lang === 'hi' ? 'वधू का विवरण (Bride Details)' : 'કન્યાની વિગત'}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'वधू का नाम' : 'કન્યાનું નામ'}
                </label>
                <input
                  type="text"
                  required
                  value={girlName}
                  onChange={(e) => setGirlName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  placeholder="वधू का नाम"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'वधू की राशि' : 'કન્યાની રાશિ'}
                  </label>
                  <select
                    value={girlRashiIdx}
                    onChange={(e) => setGirlRashiIdx(parseInt(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-rose-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    {RASHIS.map((r, idx) => (
                      <option key={r.id} value={idx}>{r.symbol} {r.nameHi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'वधू का नक्षत्र' : 'કન્યાનું નક્ષત્ર'}
                  </label>
                  <select
                    value={girlNakshatraIdx}
                    onChange={(e) => setGirlNakshatraIdx(parseInt(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-rose-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    {NAKSHATRAS.map((nak, idx) => (
                      <option key={nak} value={idx}>{nak.split(' ')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF671F] to-[#CC5218] hover:from-[#CC5218] hover:to-[#FF671F] text-white font-yatra text-base py-3 rounded-2xl shadow-lg shadow-[#FF671F]/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5 text-amber-200" />
              <span>{lang === 'hi' ? '36 गुण मिलान देखें' : '36 ગુણ મિલાન જુઓ'}</span>
            </button>
          </form>
        </div>

        {/* Results Column (7 cols) */}
        {result && (
          <div className="lg:col-span-7 space-y-6">
            {/* Top Score Banner */}
            <div className="bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#FF671F]/15">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-[#7A685B] uppercase tracking-wider block mb-1">
                    {result.boyName} + {result.girlName}
                  </span>
                  <h3 className="font-yatra text-2xl sm:text-3xl text-[#CC5218]">
                    {result.verdict}
                  </h3>
                  <p className="text-xs text-[#5C4A3E] mt-1">
                    वर: {result.boyRashi} ({result.boyNakshatra.split(' ')[0]}) | वधू: {result.girlRashi} ({result.girlNakshatra.split(' ')[0]})
                  </p>
                </div>

                {/* Score badge circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex flex-col items-center justify-center shadow-lg shadow-[#FF671F]/30 border-4 border-amber-300 shrink-0">
                  <span className="font-yatra text-3xl sm:text-4xl leading-none">{result.totalGunas}</span>
                  <span className="text-[10px] text-amber-200 font-bold tracking-widest mt-0.5">/ 36 गुण</span>
                </div>
              </div>

              {/* Major Dosha Check Badges */}
              <div className="grid grid-cols-3 gap-2 py-4 text-center">
                <div className={`p-2.5 rounded-xl border text-xs font-bold ${result.isNadiDosh ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                  {result.isNadiDosh ? '⚠️ नाड़ी दोष (उपाय अपेक्षित)' : '✅ नाड़ी अनुकूल'}
                </div>

                <div className={`p-2.5 rounded-xl border text-xs font-bold ${result.isBhakootDosh ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                  {result.isBhakootDosh ? '⚠️ भकूट दोष विचारणीय' : '✅ भकूट अनुकूल'}
                </div>

                <div className={`p-2.5 rounded-xl border text-xs font-bold ${result.isGanaDosh ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                  {result.isGanaDosh ? '⚠️ गण दोष' : '✅ गण मैत्री उत्तम'}
                </div>
              </div>

              {/* 8 Kootas Detailed Matrix */}
              <div className="mt-2">
                <h4 className="font-bold text-sm text-[#CC5218] mb-2">
                  {lang === 'hi' ? 'अष्टकूट 36 गुण विस्तृत विभाजन' : 'અષ્ટકૂટ 36 ગુણ વિગત'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-[#FF671F]/20">
                    <thead>
                      <tr className="bg-[#FFF5F0] text-[#CC5218]">
                        <th className="p-2 border border-[#FF671F]/20">कूट (Koota)</th>
                        <th className="p-2 border border-[#FF671F]/20">क्षेत्र (Meaning)</th>
                        <th className="p-2 border border-[#FF671F]/20 text-center">प्राप्त गुण</th>
                        <th className="p-2 border border-[#FF671F]/20">फलादेश प्रभाव</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.kootas.map((k) => (
                        <tr key={k.name} className="hover:bg-[#FFFDF9]">
                          <td className="p-2 border border-[#FF671F]/20 font-semibold text-[#2C2420]">{k.name}</td>
                          <td className="p-2 border border-[#FF671F]/20 text-[#665448]">{k.description}</td>
                          <td className="p-2 border border-[#FF671F]/20 text-center font-bold text-[#CC5218]">
                            {k.obtained} / {k.maximum}
                          </td>
                          <td className="p-2 border border-[#FF671F]/20 text-[#5C4A3E]">{k.impact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Astrological Recommendations */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/30 space-y-2">
                <span className="font-bold text-xs sm:text-sm text-[#CC5218] block">
                  🚩 ज्योतिषीय परामर्श एवं समाधान
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#2C2420]">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA row */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="flex-1 bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'विवाह परामर्श बुक करें' : 'લગ્ન પરામર્શ બુક કરો'}</span>
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मैंने ${result.boyName} और ${result.girlName} का गुण मिलान किया है (${result.totalGunas}/36 गुण)। कृपया व्यक्तिगत विवाह परामर्श प्रदान करें।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर कुंडली भेजें' : 'કુંડળી મોકલો'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
