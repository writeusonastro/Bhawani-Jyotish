import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, Calendar, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'gu';
  defaultService?: string;
}

export const PujaAppointmentModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultService
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('मेहसाणा');
  const [consultType, setConsultType] = useState('office'); // 'office' | 'phone' | 'video' | 'puja'
  const [service, setService] = useState(defaultService || 'जन्म कुंडली एवं संपूर्ण जीवन फलादेश');
  const [date, setDate] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:30 PM');
  const [problemNotes, setProblemNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const whatsappMessage = encodeURIComponent(
    `🚩 प्रणाम पंडित जी! मैंने भवानी ज्योतिष केंद्र की वेबसाइट से परामर्श बुक किया है:\n\n👤 नाम: ${name}\n📞 फोन: ${phone}\n📍 शहर: ${city}\n📅 तारीख: ${date} (${timeSlot})\n🔮 सेवा: ${service}\n🌐 परामर्श माध्यम: ${consultType === 'office' ? 'मेहसाणा कार्यालय में व्यक्तिगत भेंट' : 'फोन / वीडियो कॉल'}\n📝 विवरण: ${problemNotes || 'विस्तृत कुंडली विश्लेषण'}\n\nकृपया समय की पुष्टि करें।`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#FF671F]/30 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF5F0] hover:bg-[#FFEAE0] text-[#CC5218] flex items-center justify-center transition-colors border border-[#FF671F]/30"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-2xl mx-auto mb-2 shadow-md">
                🚩
              </div>
              <h3 className="font-yatra text-2xl text-[#CC5218]">
                {lang === 'hi' ? 'ज्योतिषीय परामर्श व पूजा बुकिंग' : 'જ્યોતિષીય પરામર્શ બુકિંગ'}
              </h3>
              <p className="text-xs text-[#665448] mt-1">
                {lang === 'hi'
                  ? 'पंडित श्री विरेंद्र कुमार जोशी जी से प्रत्यक्ष अथवा ऑनलाइन परामर्श'
                  : 'પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી સાથે રૂબરૂ અથવા ઓનલાઇન પરામર્શ'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'परामर्श का प्रकार (Mode)' : 'પરામર્શ પ્રકાર'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultType('office')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      consultType === 'office'
                        ? 'bg-[#FF671F] text-white border-[#CC5218] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#5C4A3E] border-[#FF671F]/20 hover:bg-[#FFF5F0]'
                    }`}
                  >
                    🏢 मेहसाणा कार्यालय (In-Person)
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('phone')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      consultType === 'phone'
                        ? 'bg-[#FF671F] text-white border-[#CC5218] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#5C4A3E] border-[#FF671F]/20 hover:bg-[#FFF5F0]'
                    }`}
                  >
                    📞 फोन / व्हाट्सएप कॉल (Online)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'आपका नाम (Your Name)' : 'તમારું નામ'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. अमित पटेल"
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर (Phone)' : 'મોબાઈલ નંબર'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99090 XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'शहर / गांव (City)' : 'શહેર / ગામ'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="उदा. मेहसाणा / अहमदाबाद"
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'समस्या या सेवा (Service)' : 'સેવા'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  >
                    <option value="जन्म कुंडली एवं संपूर्ण जीवन फलादेश">जन्म कुंडली एवं जीवन फलादेश</option>
                    <option value="विवाह गुण मिलान (36 गुण विचार)">विवाह गुण मिलान (36 गुण)</option>
                    <option value="कालसर्प व मांगलिक दोष निवारण">कालसर्प / मांगलिक दोष निवारण</option>
                    <option value="व्यापार वृद्धि एवं नौकरी समस्या">व्यापार वृद्धि एवं नौकरी</option>
                    <option value="प्रेम विवाह एवं पारिवारिक कलह">प्रेम विवाह एवं पारिवारिक कलह</option>
                    <option value="वैदिक वास्तु शास्त्र एवं गृह शांति">वास्तु शास्त्र एवं गृह शांति</option>
                    <option value="सिद्ध रत्न एवं रुद्राक्ष परामर्श">रत्न एवं रुद्राक्ष परामर्श</option>
                    <option value="नवग्रह शांति पूजा एवं अनुष्ठान">नवग्रह शांति पूजा एवं अनुष्ठान</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'पसंदीदा तारीख (Date)' : 'તારીખ'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2420] mb-1">
                    {lang === 'hi' ? 'समय स्लॉट (Time Slot)' : 'સમય'}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                  >
                    <option value="08:00 AM - 10:00 AM">प्रातः 08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:30 PM">दोपहर 10:00 AM - 12:30 PM</option>
                    <option value="02:00 PM - 04:00 PM">दोपहर 02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">शाम 04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">शाम 06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2C2420] mb-1">
                  {lang === 'hi' ? 'संक्षिप्त विवरण / समस्या (Optional)' : 'ટૂંકી વિગત'}
                </label>
                <textarea
                  rows={2}
                  value={problemNotes}
                  onChange={(e) => setProblemNotes(e.target.value)}
                  placeholder="उदा. नौकरी में रुकावट, विवाह में देरी या कुंडली का मिलान..."
                  className="w-full px-3 py-2 rounded-xl border border-[#FF671F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-[#FFFDF9]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF671F] hover:bg-[#CC5218] text-white font-yatra text-base py-3 rounded-2xl shadow-lg shadow-[#FF671F]/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट सबमिट करें' : 'અપોઇન્ટમેન્ટ સબમિટ કરો'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-yatra text-2xl text-emerald-800">
                {lang === 'hi' ? 'अपॉइंटमेंट अनुरोध प्राप्त हुआ!' : 'અપોઇન્ટમેન્ટ વિનંતી મળી ગઈ!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#665448] mt-2">
                जय माँ भवानी! <strong>{name}</strong> जी, आपका <strong>{date}</strong> ({timeSlot}) का स्लॉट आरक्षित किया गया है।
              </p>
            </div>

            <div className="p-4 bg-[#FFF5F0] rounded-2xl border border-[#FF671F]/30 text-xs text-left space-y-1.5 text-[#5C4A3E]">
              <div><strong>सेवा:</strong> {service}</div>
              <div><strong>माध्यम:</strong> {consultType === 'office' ? 'मेहसाणा कार्यालय (In-Person)' : 'फोन / वीडियो कॉल'}</div>
              <div><strong>पता:</strong> भवानी कृपा कॉम्प्लेक्स, मोढेरा रोड, मेहसाणा (गुजरात)</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>व्हाट्सएप पर तुरंत पुष्टि करें (Send on WhatsApp)</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-white hover:bg-slate-100 text-[#5C4A3E] font-semibold py-2 rounded-xl text-xs border border-slate-200 transition-colors"
              >
                बंद करें (Close)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
