import React, { useState } from 'react';
import { KundliInput, KundliResult } from '../types/astrology';
import { calculateVedicKundli } from '../utils/vedicCalculations';
import { INDIAN_CITIES, ASTROLOGER_INFO } from '../data/astrologyData';
import { KundliChartVisualizer } from './KundliChartVisualizer';
import { ScrollText, Sparkles, AlertTriangle, ShieldCheck, Gem, Phone, MessageCircle, Printer, CheckCircle, Share2, Download } from 'lucide-react';

interface KundliGeneratorProps {
  lang: 'hi' | 'gu';
  onAskAI: (context: string) => void;
  isDark?: boolean;
}

export const KundliGenerator: React.FC<KundliGeneratorProps> = ({ lang, onAskAI, isDark = false }) => {
  const [formData, setFormData] = useState<KundliInput>({
    name: 'राहुल पटेल',
    gender: 'male',
    day: 15,
    month: 8,
    year: 1996,
    hour: 14,
    minute: 30,
    cityName: 'मेहसाणा (Mehsana)',
    state: 'गुजरात (Gujarat)'
  });

  const [result, setResult] = useState<KundliResult | null>(() => calculateVedicKundli(formData));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculateVedicKundli(formData);
    setResult(calculated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 mb-2">
          <ScrollText className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'वैदिक जन्म कुंडली चक्र' : 'વૈદિક જન્મ કુંડળી ચક્ર'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'ऑनलाइन जन्म कुंडली एवं फलादेश' : 'ઓનલાઇન જન્મ કુંડળી અને ફલાદેશ'}
        </h2>
        <p className="text-sm text-[#665448]">
          {lang === 'hi'
            ? 'अपनी जन्म तारीख, समय एवं स्थान दर्ज कर तुरंत शास्त्रोक्त लग्न चक्र, ग्रह स्थिति व महादशा प्राप्त करें'
            : 'તમારી જન્મ તારીખ, સમય અને સ્થળ દાખલ કરી તરત જ શાસ્ત્રોક્ત લગ્ન ચક્ર અને મહાદશા મેળવો'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 sticky top-24">
            <h3 className="font-yatra text-xl text-[#CC5218] mb-4 pb-2 border-b border-[#FF671F]/15 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF671F]" />
              <span>{lang === 'hi' ? 'जन्म विवरण दर्ज करें' : 'જન્મ વિગત દાખલ કરો'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'पूरा नाम (Full Name)' : 'પૂરું નામ'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  placeholder="उदा. राहुल पटेल"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'लिंग (Gender)' : 'લિંગ'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  >
                    <option value="male">{lang === 'hi' ? 'पुरुष (Male)' : 'પુરુષ'}</option>
                    <option value="female">{lang === 'hi' ? 'महिला (Female)' : 'મહિલા'}</option>
                    <option value="other">{lang === 'hi' ? 'अन्य' : 'અન્ય'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'जन्म वर्ष (Year)' : 'જન્મ વર્ષ'}
                  </label>
                  <input
                    type="number"
                    min="1940"
                    max="2030"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 1996 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'जन्म तारीख (Day)' : 'જન્મ તારીખ'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    required
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'जन्म महीना (Month)' : 'જન્મ મહિનો'}
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  >
                    {['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'].map((m, i) => (
                      <option key={m} value={i + 1}>{i + 1} - {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'समय: घंटा (24 Hr)' : 'કલાક (0-23)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    required
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'मिनट (Minute)' : 'મિનિટ (0-59)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    required
                    value={formData.minute}
                    onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'जन्म स्थान (Birth Place)' : 'જન્મ સ્થળ'}
                </label>
                <select
                  value={formData.cityName}
                  onChange={(e) => {
                    const city = INDIAN_CITIES.find(c => c.name === e.target.value);
                    setFormData({
                      ...formData,
                      cityName: e.target.value,
                      state: city ? city.state : 'गुजरात'
                    });
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                >
                  {INDIAN_CITIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name} - {c.state}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF671F] hover:bg-[#CC5218] text-white font-yatra text-base py-3 rounded-2xl shadow-lg shadow-[#FF671F]/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{lang === 'hi' ? 'कुंडली चक्र बनाएं' : 'કુંડળી ચક્ર બનાવો'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Results & Visual Chart (7 cols) */}
        {result && (
          <div className="lg:col-span-7 space-y-6">
            {/* Summary Highlights */}
            <div className="bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5">
              <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-[#FF671F]/15">
                <div>
                  <h3 className="font-yatra text-2xl text-[#CC5218]">
                    {formData.name} की जन्म कुंडली
                  </h3>
                  <p className="text-xs text-[#7A685B]">
                    {formData.day}/{formData.month}/{formData.year}, {formData.hour}:{formData.minute.toString().padStart(2, '0')} | {formData.cityName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-2 rounded-xl bg-[#FFF5F0] hover:bg-[#FFEAE0] text-[#CC5218] border border-[#FF671F]/30 transition-colors"
                    title="प्रिंट या पीडीएफ सेव करें"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.manglikStatus.includes('Non') 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : result.manglikStatus.includes('Partial')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}>
                    {result.manglikStatus}
                  </span>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-center">
                <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#FF671F]/20">
                  <span className="text-[11px] text-[#7A685B] block">{lang === 'hi' ? 'लग्न (Ascendant)' : 'લગ્ન'}</span>
                  <span className="font-bold text-sm text-[#CC5218]">{result.ascendantRashi.split(' ')[0]}</span>
                </div>

                <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#FF671F]/20">
                  <span className="text-[11px] text-[#7A685B] block">{lang === 'hi' ? 'चंद्र राशि (Moon Sign)' : 'ચંદ્ર રાશિ'}</span>
                  <span className="font-bold text-sm text-[#CC5218]">{result.moonRashi.split(' ')[0]}</span>
                </div>

                <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#FF671F]/20">
                  <span className="text-[11px] text-[#7A685B] block">{lang === 'hi' ? 'नक्षत्र (Nakshatra)' : 'નક્ષત્ર'}</span>
                  <span className="font-bold text-sm text-[#2C2420]">{result.nakshatra.split(' ')[0]} (चरण {result.nakshatraCharan})</span>
                </div>

                <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#FF671F]/20">
                  <span className="text-[11px] text-[#7A685B] block">{lang === 'hi' ? 'वर्तमान महादशा' : 'મહાદશા'}</span>
                  <span className="font-bold text-sm text-[#2C2420]">{result.currentDasha} ({result.dashaEndYear} तक)</span>
                </div>
              </div>

              {/* Interactive Kundli Chart Visualizer (North & South Indian + Clickable Houses) */}
              <div className="my-6">
                <KundliChartVisualizer
                  planets={result.planets}
                  ascendantRashi={result.ascendantRashi}
                  lang={lang}
                  isDark={isDark}
                />
              </div>

              {/* Planetary Positions Table */}
              <div className="overflow-x-auto">
                <h4 className="font-bold text-sm text-[#CC5218] mb-2">
                  {lang === 'hi' ? 'ग्रह स्थिति एवं भाव विवरण (Planetary Degrees)' : 'ગ્રહ સ્થિતિ અને ભાવ વિગત'}
                </h4>
                <table className="w-full text-xs text-left border-collapse border border-[#FF671F]/20">
                  <thead>
                    <tr className="bg-[#FFF5F0] text-[#CC5218]">
                      <th className="p-2 border border-[#FF671F]/20">ग्रह (Planet)</th>
                      <th className="p-2 border border-[#FF671F]/20">राशि (Rashi)</th>
                      <th className="p-2 border border-[#FF671F]/20">अंश (Degree)</th>
                      <th className="p-2 border border-[#FF671F]/20">भाव (House)</th>
                      <th className="p-2 border border-[#FF671F]/20">स्थिति (Dignity)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.planets.map((p) => (
                      <tr key={p.planet} className="hover:bg-[#FFFDF9]">
                        <td className="p-2 border border-[#FF671F]/20 font-semibold">{p.planet}</td>
                        <td className="p-2 border border-[#FF671F]/20">{p.rashi}</td>
                        <td className="p-2 border border-[#FF671F]/20">{p.degree}°</td>
                        <td className="p-2 border border-[#FF671F]/20">{p.house} भाव</td>
                        <td className="p-2 border border-[#FF671F]/20 font-medium text-[#7A5218]">{p.dignity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Life Predictions & Vedic Remedies */}
            <div className="bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 space-y-4">
              <h3 className="font-yatra text-xl text-[#CC5218] pb-2 border-b border-[#FF671F]/15 flex items-center gap-2">
                <Gem className="w-5 h-5 text-[#FF671F]" />
                <span>{lang === 'hi' ? 'व्यक्तिगत जीवन फलादेश एवं उपाय' : 'વ્યક્તિગત જીવન ફલાદેશ અને ઉપાય'}</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-[#FFFDF9] rounded-2xl border border-[#FF671F]/20">
                  <span className="font-bold text-[#CC5218] block mb-1">🌟 सामान्य स्वभाव एवं भाग्योदय</span>
                  <p className="text-[#2C2420] leading-relaxed">{result.lifePrediction.general}</p>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">💼 करियर एवं धन लाभ</span>
                  <p className="text-[#4A3B2C] leading-relaxed">{result.lifePrediction.career}</p>
                </div>

                <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-1">❤️ वैवाहिक जीवन व संबंध</span>
                  <p className="text-[#4A282C] leading-relaxed">{result.lifePrediction.marriage}</p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-1">🌿 स्वास्थ्य एवं आयु</span>
                  <p className="text-[#1B3F2E] leading-relaxed">{result.lifePrediction.health}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#FFF5F0] to-[#FFEBE0] rounded-2xl border border-[#FF671F]/40">
                  <span className="font-bold text-[#CC5218] block mb-2">🚩 अनुशंसित वैदिक उपाय एवं रत्न</span>
                  <ul className="space-y-1.5 text-[#2C2420]">
                    {result.lifePrediction.recommendedUpay.map((upay, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                        <span>{upay}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-2 border-t border-[#FF671F]/20 text-xs font-semibold text-[#CC5218]">
                    अनुकूल रत्न: {result.lifePrediction.luckyGem} | मंत्र: {result.lifePrediction.luckyMantra}
                  </div>
                </div>
              </div>

              {/* Action row to consult or ask AI */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onAskAI(`मेरी कुंडली लग्न ${result.ascendantRashi}, चंद्र राशि ${result.moonRashi}, नक्षत्र ${result.nakshatra} है। कृपया मेरे करियर और विवाह के विषय में विस्तार से मार्गदर्शन करें।`)}
                  className="flex-1 bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'इस कुंडली पर AI ज्योतिषी से पूछें' : 'આ કુંડળી પર પ્રશ્ન પૂછો'}</span>
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मैंने भवानी ज्योतिष वेबसाइट पर अपनी कुंडली (${formData.name}, ${result.ascendantRashi} लग्न, ${result.moonRashi} राशि) बनाई है। मुझे विस्तृत परामर्श चाहिए।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'पंडित जी से व्हाट्सएप पर बात करें' : 'પંડિતજી સાથે વાત કરો'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
