import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';

interface DoshGuideProps {
  lang: Language;
  isDark?: boolean;
}

const DOSHAS = [
  {
    id: 'kalsarp',
    nameHi: 'कालसर्प दोष (Kalsarp Dosh)',
    nameGu: 'કાલસર્પ દોષ',
    nameEn: 'Kalsarp Dosh',
    descriptionHi: 'जब कुंडली में राहु और केतु के मध्य सभी सात ग्रह आ जाते हैं, तब कालसर्प योग का निर्माण होता है।',
    descriptionGu: 'જ્યારે કુંડળીમાં રાહુ અને કેતુ વચ્ચે બધા સાત ગ્રહો આવી જાય છે, ત્યારે કાલસર્પ યોગ સર્જાય છે.',
    descriptionEn: 'Formed when all seven celestial planets are hemmed between Rahu and Ketu in the birth chart.',
    symptoms: [
      'कठिन परिश्रम के बावजूद सफलता में बार-बार अंतिम समय पर अड़चन आना',
      'स्वप्न में बार-बार सर्प, जल में डूबना अथवा ऊंचाई से गिरना दिखाई देना',
      'मानसिक अशांति, अनिद्रा और व्यर्थ का भय बना रहना',
      'संतान कष्ट अथवा वंश वृद्धि में रुकावट'
    ],
    symptomsEn: [
      'Repeated setbacks at the final moment despite strenuous labor',
      'Recurrent dreams of serpents, drowning in water, or falling from heights',
      'Mental restlessness, insomnia, and unexplained anxieties',
      'Obstacles in progeny or lineage continuity'
    ],
    types: ['अनंत कालसर्प', 'कुलिक', 'वासुकि', 'शंखपाल', 'पद्म', 'महापद्म', 'तक्षक', 'कर्कोटक', 'शंखचूड़', 'घातक', 'विषधर', 'शेषनाग कालसर्प'],
    typesEn: ['Anant Kalsarp', 'Kulik', 'Vasuki', 'Shankhpal', 'Padma', 'Mahapadma', 'Takshak', 'Karkotak', 'Shankhchud', 'Ghatak', 'Vishdhar', 'Sheshnag'],
    remedies: [
      'सिद्ध महामृत्युंजय मंत्र का 1,25,000 जप अनुष्ठान',
      'नाग पंचमी अथवा सावन के सोमवार को चांदी के नाग-नागिन का दान',
      'भगवान शिव का गन्ने के रस व पंचामृत से रुद्राभिषेक',
      'राहु-केतु शांति महायज्ञ एवं शनिवार को काले तिल का दान'
    ],
    remediesEn: [
      '1,25,000 chants Mahamrityunjaya Mantra ritual ceremony',
      'Offering consecrated silver serpent pair on Nag Panchami or Shravan Mondays',
      'Panchamrit & sugarcane juice Rudrabhishek to Lord Shiva',
      'Rahu-Ketu Shanti Mahayagya & black sesame charity on Saturdays'
    ]
  },
  {
    id: 'manglik',
    nameHi: 'मांगलिक दोष (Manglik Dosh)',
    nameGu: 'માંગલિક દોષ',
    nameEn: 'Manglik Dosh',
    descriptionHi: 'लग्न, चतुर्थ, सप्तम, अष्टम अथवा द्वादश भाव में मंगल ग्रह के स्थित होने पर मांगलिक दोष बनता है।',
    descriptionGu: 'લગ્ન, ચતુર્થ, સપ્તમ, અષ્ટમ અથવા દ્વાદશ ભાવમાં મંગળ ગ્રહ હોવાથી માંગલિક દોષ બને છે.',
    descriptionEn: 'Arises when fiery Mars is placed in the 1st, 4th, 7th, 8th, or 12th houses of the horoscope.',
    symptoms: [
      'विवाह में अत्यधिक विलंब होना अथवा तय रिश्ता बार-बार टूट जाना',
      'दांपत्य जीवन में कलह, क्रोध, मतभेद और तालमेल की कमी',
      'पति अथवा पत्नी के स्वास्थ्य में लगातार गिरावट रहना',
      'रक्त संबंधी विकार अथवा अचानक दुर्घटना का भय'
    ],
    symptomsEn: [
      'Severe delays in marriage or recurring broken engagements',
      'Marital discord, sudden temperamental flare-ups, and compatibility conflicts',
      'Persistent health ailments for the spouse',
      'Vulnerability to blood disorders or sudden accidental injuries'
    ],
    types: ['लग्न मांगलिक', 'चतुर्थ भाव मांगलिक', 'सप्तम भाव मांगलिक (अत्यधिक प्रभावी)', 'अष्टम भाव मांगलिक', 'द्वादश भाव मांगलिक'],
    typesEn: ['1st House Manglik', '4th House Manglik', '7th House Manglik (Potent)', '8th House Manglik', '12th House Manglik'],
    remedies: [
      'कुंभ विवाह / अर्क विवाह / विष्णु प्रतिमा विवाह शास्त्रीय विधि से',
      'प्रतिदिन हनुमान चालीसा एवं सुंदरकांड का पाठ',
      'मंगलवार को लाल मसूर की दाल, लाल चंदन व गुड़ का दान',
      'सवा सात रत्ती का इटालियन लाल मूंगा (विशेष परामर्श उपरांत) धारण करना'
    ],
    remediesEn: [
      'Kumbh Vivah / Ark Vivah scriptural consecrated pre-nuptial ceremony',
      'Daily recitation of Hanuman Chalisa and Sunderkand hymns',
      'Charity of red lentils (masoor), red sandalwood, and jaggery on Tuesdays',
      'Wearing natural energized Italian Red Coral upon precise birth-chart appraisal'
    ]
  },
  {
    id: 'pitra',
    nameHi: 'पितृ दोष (Pitra Dosh)',
    nameGu: 'પિતૃ દોષ',
    nameEn: 'Pitra Dosh',
    descriptionHi: 'पूर्वजों के प्रति तृप्ति न होने अथवा नवम भाव (भाग्य/धर्म भाव) के पीड़ित होने पर पितृ दोष बनता है।',
    descriptionGu: 'પૂર્વજો પ્રત્યે તૃપ્તિ ન હોવાથી અથવા નવમ ભાવ પીડિત થવાથી પિતૃ દોષ સર્જાય છે.',
    descriptionEn: 'Manifests when ancestral rites are incomplete or when the 9th house of fortune is afflicted by malefic nodes.',
    symptoms: [
      'परिवार में मांगलिक कार्यों में लगातार व्यवधान आना',
      'संतान हीनता अथवा योग्य संतान होने के बाद भी क्लेश',
      'घर में हमेशा कोई न कोई सदस्य अस्वस्थ रहना',
      'व्यापार में बिना किसी कारण के अचानक भारी आर्थिक नुकसान'
    ],
    symptomsEn: [
      'Persistent delays and barriers in auspicious ceremonies within the household',
      'Difficulty in conceiving progeny or familial bitterness despite able heirs',
      'Unbroken chain of ailments affecting one family member after another',
      'Unexplained, recurring business capital losses'
    ],
    types: ['मातृ पितृ दोष', 'भ्रातृ पितृ दोष', 'आत्म पितृ दोष', 'नाग जनित पितृ दोष'],
    typesEn: ['Matru Pitra Dosh', 'Bhratru Pitra Dosh', 'Atma Pitra Dosh', 'Sarpa-related Pitra Dosh'],
    remedies: [
      'त्रिपिंडी श्राद्ध अथवा नारायण बलि अनुष्ठान',
      'अमावस्या के दिन पितरों के निमित्त खीर व ब्राह्मण भोजन',
      'पीपल के वृक्ष की प्रतिदिन सेवा व जल में कच्चा दूध अर्पित करना',
      'गौशाला में गायों को हरा चारा व गुड़ खिलाना'
    ],
    remediesEn: [
      'Tripindi Shradh or Narayan Bali sanctified ancestral rites',
      'Serving kheer and meals to Brahmins on Amavasya (new moon) days',
      'Daily offering of raw milk and water to the sacred Peepal tree',
      'Feeding fresh green fodder and jaggery to sacred cows at Gaushalas'
    ]
  },
  {
    id: 'sade-sati',
    nameHi: 'शनि साढ़े साती एवं ढैय्या (Shani Sade Sati)',
    nameGu: 'શનિ સાડા સાતી અને ઢૈય્યા',
    nameEn: 'Shani Sade Sati & Dhaiya',
    descriptionHi: 'जब गोचर में शनिदेव जन्म चंद्र राशि से 12वें, लग्न अथवा द्वितीय भाव में भ्रमण करते हैं।',
    descriptionGu: 'જ્યારે શનિદેવ જન્મ ચંદ્ર રાશિથી 12મા, લગ્ન અથવા બીજા ભાવમાં ગોચર કરે છે.',
    descriptionEn: 'Occurs during the transit of Saturn through the 12th, 1st, and 2nd houses from the natal Moon.',
    symptoms: [
      'अचानक नौकरी छूटना अथवा व्यापार में भारी घाटा',
      'झूठे आरोप, मुकदमेबाजी अथवा सामाजिक अपयश का भय',
      'हड्डियों, जोड़ों व स्नायु तंत्र में पीड़ा',
      'परिवार व मित्रों द्वारा सहयोग न मिलना'
    ],
    symptomsEn: [
      'Sudden job disruption or steep loss in commercial ventures',
      'Baseless accusations, litigation, or concern regarding social reputation',
      'Chronic pain in bones, joints, knees, and the nervous system',
      'Feeling isolated with unforthcoming assistance from allies'
    ],
    types: ['प्रथम चरण (उदयमान)', 'द्वितीय चरण (शिखर - सर्वाधिक कठिन)', 'तृतीय चरण (अस्तगामी / उतरती साढ़े साती)'],
    typesEn: ['Phase 1 (Rising)', 'Phase 2 (Peak - Most Intensive)', 'Phase 3 (Setting / Departing)'],
    remedies: [
      'शनिवार को पीपल के नीचे सरसों के तेल का चौमुखा दीपक जलाना',
      'शनि चालीसा एवं दशरथ कृत शनि स्तोत्र का नित्य पाठ',
      'काले कुत्ते को सरसों के तेल से चुपड़ी रोटी खिलाना',
      'काले घोड़े की नाल का छल्ला मध्यमा अंगुली में धारण करना'
    ],
    remediesEn: [
      'Lighting a 4-wick mustard oil lamp beneath a sacred Peepal tree on Saturdays',
      'Daily recitation of Shani Chalisa and King Dasharatha’s Shani Stotram',
      'Feeding mustard-oil coated bread to black canines',
      'Wearing an authentic energized black horseshoe ring on the middle finger'
    ]
  },
  {
    id: 'nazar-energy',
    nameHi: 'नकारात्मक ऊर्जा एवं नज़र दोष (Negative Energy & Nazar Dosh)',
    nameGu: 'નકારાત્મક ઊર્જા અને નજર દોષ',
    nameEn: 'Negative Energy & Evil Eye (Nazar Dosh)',
    descriptionHi: 'घर, व्यापार अथवा व्यक्तिगत आभा मंडल (Aura) पर नकारात्मक तरंगों, बुरी नज़र एवं अज्ञात भय के प्रभाव का वैदिक शांति विधान।',
    descriptionGu: 'ઘર, વ્યવસાય અથવા વ્યક્તિગત ઓરા (Aura) પર નકારાત્મક તરંગો, બૂરી નજર અને અજ્ઞાત ભયના પ્રભાવનું વૈદિક શાંતિ વિધાન.',
    descriptionEn: 'Scriptural Vedic protection and aura cleansing against negative vibrations, evil eye afflictions, and unexplained household tensions.',
    symptoms: [
      'अचानक अच्छा-भला चलता व्यापार ठप हो जाना अथवा बार-बार अकारण ग्राहक टूटना',
      'घर में प्रवेश करते ही सिर भारी होना, घुटन, अशांति अथवा अकारण चिड़चिड़ापन',
      'छोटे बच्चों का बिना किसी शारीरिक रोग के लगातार रोना अथवा अचानक चौंक कर उठना',
      'घर में शुभ व मांगलिक कार्यों में लगातार व्यवधान अथवा अकारण नुकसान'
    ],
    symptomsEn: [
      'Sudden stalling of flourishing business or unexplained disruption in client flow',
      'Heaviness, anxiety, restlessness, or sudden irritability upon entering the premises',
      'Infants crying persistently or startling abruptly without any underlying medical condition',
      'Recurring inexplicable obstacles and disruptions during auspicious family endeavors'
    ],
    types: ['व्यापारिक नज़र दोष', 'गृह वास्तु नकारात्मक ऊर्जा', 'शिशु / बालक नज़र दोष', 'व्यक्तिगत आभा मंडल (Aura) विकार'],
    typesEn: ['Commercial & Business Nazar', 'Residential Spatial Energy Distortion', 'Infant / Child Evil Eye Affliction', 'Personal Aura Disturbance'],
    remedies: [
      'सिद्ध महामृत्युंजय मंत्र एवं माँ बगलामुखी सात्विक कवच का नित्य पाठ',
      'घर में संध्या समय देशी गाय के कंडे पर कपूर, शुद्ध गूगल एवं लोबान की धूप प्रज्वलित करना',
      'मुख्य द्वार पर पंचमुखी हनुमान जी का चित्र एवं अभिमंत्रित नज़र सुरक्षा यंत्र स्थापित करना',
      'पूर्णिमा व अमावस्या पर घर में गंगाजल, गोमूत्र एवं समुद्री नमक का छिड़काव'
    ],
    remediesEn: [
      'Scriptural recitation of energized Mahamrityunjaya Mantra and Maa Baglamukhi Protective Stotra',
      'Evening fumigation with pure natural camphor, guggul, and loban resins on dried cow dung cakes',
      'Consecrating Panchamukhi Hanuman energized talisman at the primary threshold',
      'Sprinkling holy Gangajal, Gomutra, and natural rock salt solution during Amavasya and Purnima'
    ]
  },
  {
    id: 'griha-klesh',
    nameHi: 'गृह क्लेश एवं दांपत्य शांति (Family Harmony & Marital Peace)',
    nameGu: 'ગૃહ ક્લેશ અને દાંપત્ય શાંતિ',
    nameEn: 'Family Discord & Marital Harmony',
    descriptionHi: 'दांपत्य जीवन में अनबन, वैवाहिक संवादहीनता, पारिवारिक सदस्यों में कटुता एवं अकारण मनमुटाव दूर करने का ज्योतिषीय समाधान।',
    descriptionGu: 'દાંપત્ય જીવનમાં અણબનાવ, વૈવાહિક સંવાદહીનતા અને પરિવારમાં કડવાશ દૂર કરવાનું જ્યોતિષીય સમાધાન.',
    descriptionEn: 'Vedic planetary remedies to resolve marital friction, restore mutual trust, eliminate family toxicity, and nurture emotional warmth.',
    symptoms: [
      'छोटी-छोटी बातों पर पति-पत्नी के मध्य उग्र विवाद, कटुता एवं संवाद हीनता',
      'एक-दूसरे के प्रति अकारण संदेह, सम्मान की कमी अथवा मनमुटाव बने रहना',
      'पारिवारिक सदस्यों के मध्य अलगाव और घर में हमेशा तनाव का माहौल',
      'विवाह टूटने की कगार पर पहुंच जाना अथवा वैवाहिक सुख का अभाव'
    ],
    symptomsEn: [
      'Trivial disputes escalating into fiery hostility, bitterness, and long silences between spouses',
      'Unfounded suspicion, lack of mutual emotional resonance, or persistent coldness',
      'Chronic tension and friction among joint family members eroding domestic tranquility',
      'Marriage hovering on the brink of breakdown or persistent emotional estrangement'
    ],
    types: ['दांपत्य मतभेद दोष', 'सप्तम भाव (विवाह भाव) पीड़ित योग', 'शुक्र-गुरु अशांति दोष', 'पारिवारिक वास्तु सामंजस्य अभाव'],
    typesEn: ['Marital Disconnect Dosha', 'Afflicted 7th House Placement', 'Imbalanced Venus-Jupiter Synergy', 'Domestic Spatial Vastu Imbalance'],
    remedies: [
      'प्राकृतिक सिद्ध गौरी-शंकर रुद्राक्ष का विधिपूर्वक पूजन व धारण',
      'शुक्रवार को माँ लक्ष्मी व भगवान विष्णु को मखाने की खीर का भोग एवं कनकधारा स्तोत्र पाठ',
      'बेडरूम के वास्तु दोष का निवारण एवं ईशान कोण (North-East) को पूर्ण स्वच्छ व हल्का रखना',
      'पति-पत्नी की जन्म कुंडलियों के आधार पर सप्तमेश शांति एवं नवग्रह सामंजस्य पूजा'
    ],
    remediesEn: [
      'Energizing and wearing a consecrated natural Gauri-Shankar Rudraksha bead',
      'Offering makhana kheer to Goddess Lakshmi & Lord Vishnu on Fridays with Kanakadhara Stotram',
      'Balancing master bedroom Vastu dynamics and maintaining the Northeast quadrant clean and uncluttered',
      'Customized 7th Lord strengthening and Navagraha harmony rituals tailored to both horoscopes'
    ]
  },
  {
    id: 'shatru-badha',
    nameHi: 'शत्रु बाधा एवं अज्ञात भय निवारण (Shatru Badha & Fear Protection)',
    nameGu: 'શત્રુ બાધા અને અજ્ઞાત ભય નિવારણ',
    nameEn: 'Shatru Badha & Unexplained Anxiety',
    descriptionHi: 'व्यावसायिक ईर्ष्या, गुप्त विरोधियों के कुचक्र, झूठे विवादों तथा अज्ञात भय, घबराहट व अनिद्रा से मुक्ति हेतु सात्विक वैदिक रक्षा विधान।',
    descriptionGu: 'વ્યાવસાયિક ઈર્ષ્યા, ગુપ્ત વિરોધીઓના ષડયંત્ર, વિવાદો તેમજ અજ્ઞાત ભય અને અનિદ્રામાંથી મુક્તિ માટે સાત્વિક વૈદિક રક્ષા વિધાન.',
    descriptionEn: 'Authentic scriptural invocations to dissolve hidden workplace rivalries, overcome baseless litigations, and overcome mental panic.',
    symptoms: [
      'व्यापार अथवा कार्यक्षेत्र में ईर्ष्यालु व्यक्तियों द्वारा लगातार अड़चनें पैदा करना',
      'व्यर्थ के मुकदमों, कानूनी उलझनों अथवा सामाजिक बदनामी का भय बना रहना',
      'रात को सोते समय अचानक घबराहट, पसीना आना, अनिद्रा अथवा अज्ञात भय',
      'सफलता के निकट पहुंचते ही किसी गुप्त विरोध या षड्यंत्र का शिकार होना'
    ],
    symptomsEn: [
      'Persistent friction, sabotage, or hostility instigated by envious workplace competitors',
      'Trapped in baseless litigations, governmental audits, or anxieties regarding social defamation',
      'Sudden palpitations, nocturnal anxieties, insomnia, or oppressive dread during the night',
      'Encountering covert roadblocks right when on the verge of substantial milestones'
    ],
    types: ['व्यावसायिक ईर्ष्या बाधा', 'षष्ठम भाव (शत्रु भाव) पीड़ित दोष', 'चंद्र-राहु ग्रहण जनित भय', 'गुप्त विरोधी कुचक्र'],
    typesEn: ['Commercial Jealousy Impediments', 'Afflicted 6th House Planetary Dynamics', 'Moon-Rahu Eclipse Induced Anxiety', 'Covert Professional Obstacles'],
    remedies: [
      'माँ बगलामुखी एवं संकटमोचन हनुमानाष्टक का नित्य श्रवण व पाठ',
      'हनुमान बाहुक का पाठ एवं मंगलवार को चमेली के तेल व सिंदूर का अर्पण',
      'पंडित जी द्वारा सिद्ध अभिमंत्रित वैदिक रक्षा कवच धारण करना',
      'शनिवार को कालभैरव अष्टक का पाठ एवं बेसहारा पशुओं को भोजन कराना'
    ],
    remediesEn: [
      'Daily recitation or listening of Maa Baglamukhi and Sankat Mochan Hanumanashtak',
      'Hanuman Bahuk recitations and offering pure jasmine oil and vermilion on Tuesdays',
      'Adorning an authentic energized Vedic Raksha Kavach consecrated by Pandit Ji',
      'Reciting Kaal Bhairav Ashtakam on Saturdays and feeding stray animals'
    ]
  }
];

export const DoshNivaranGuide: React.FC<DoshGuideProps> = ({ lang, isDark = false }) => {
  const [activeDoshId, setActiveDoshId] = useState<string>('kalsarp');
  const activeDosh = DOSHAS.find((d) => d.id === activeDoshId) || DOSHAS[0];

  const getDoshName = (dosh: typeof DOSHAS[0]) => {
    if (lang === 'en') return dosh.nameEn;
    if (lang === 'hi') return dosh.nameHi;
    return dosh.nameGu;
  };

  const getDoshDesc = (dosh: typeof DOSHAS[0]) => {
    if (lang === 'en') return dosh.descriptionEn;
    if (lang === 'hi') return dosh.descriptionHi;
    return dosh.descriptionGu;
  };

  const getSymptoms = (dosh: typeof DOSHAS[0]) => {
    return lang === 'en' ? dosh.symptomsEn : dosh.symptoms;
  };

  const getRemedies = (dosh: typeof DOSHAS[0]) => {
    return lang === 'en' ? dosh.remediesEn : dosh.remedies;
  };

  const getTypes = (dosh: typeof DOSHAS[0]) => {
    return lang === 'en' ? dosh.typesEn : dosh.types;
  };

  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-rose-950/40 text-rose-300 border-rose-500/30' 
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>
            {lang === 'en'
              ? 'Vedic Astrological Dosha Guide & Protection'
              : lang === 'hi'
              ? 'शास्त्रीय दोष निवारण एवं वैदिक रक्षा विधान'
              : 'શાસ્ત્રીય દોષ નિવારણ તેમજ વૈદિક રક્ષા વિધાન'}
          </span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'en'
            ? 'Kalsarp, Manglik, Nazar Dosh & Griha Klesh Shanti'
            : lang === 'hi'
            ? 'कालसर्प, मांगलिक, नज़र दोष व गृह क्लेश शांति'
            : 'કાલસર્પ, માંગલિક, નજર દોષ અને ગૃહ ક્લેશ શાંતિ'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'en'
            ? 'Recognize key symptoms of planetary afflictions or negative energies and undergo authentic scriptural peace rituals performed by Pandit Ji'
            : lang === 'hi'
            ? 'कुंडली के ग्रह दोषों व नकारात्मक ऊर्जा के लक्षण पहचानें और पंडित जी द्वारा शास्त्रोक्त वैदिक शांति कराएं'
            : 'કુંડળીના ગ્રહ દોષો તેમજ નકારાત્મક ઊર્જાના લક્ષણો ઓળખો અને શાસ્ત્રોક્ત વૈદિક શાંતિ કરાવો'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {DOSHAS.map((dosh) => (
          <button
            key={dosh.id}
            type="button"
            onClick={() => setActiveDoshId(dosh.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeDoshId === dosh.id
                ? 'bg-gradient-to-r from-[#FF671F] to-[#CC5218] text-white shadow-lg shadow-[#FF671F]/30 scale-105'
                : isDark 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 shadow-sm'
                  : 'bg-white hover:bg-[#FFF5F0] text-stone-950 border border-[#FF671F]/20 shadow-sm'
            }`}
          >
            {getDoshName(dosh)}
          </button>
        ))}
      </div>

      {/* Active Dosh Detail Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 transition-all ${
        isDark 
          ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40' 
          : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
      }`}>
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b ${
          isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
        }`}>
          <div>
            <h3 className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
              {getDoshName(activeDosh)}
            </h3>
            <p className={`text-xs sm:text-sm font-medium mt-1 max-w-2xl ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
              {getDoshDesc(activeDosh)}
            </p>
          </div>

          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              lang === 'en'
                ? `Pranam Pandit Ji! I notice symptoms of ${activeDosh.nameEn} in my chart. Please guide me regarding remedies and shanti puja.`
                : `प्रणाम पंडित जी! मेरी कुंडली में ${activeDosh.nameHi} के लक्षण हैं। कृपया निवारण एवं शांति अनुष्ठान हेतु मार्गदर्शन करें।`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-amber-200" />
            <span>{lang === 'en' ? 'Remedy Guidance on WhatsApp' : lang === 'hi' ? 'दोष निवारण सलाह लें' : 'દોષ નિવારણ સલાહ મેળવો'}</span>
            <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symptoms */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-rose-950/30 border-rose-500/30' : 'bg-rose-50/60 border-rose-200/70'
          }`}>
            <h4 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>
                {lang === 'en'
                  ? 'Key Symptoms & Life Impact'
                  : lang === 'hi'
                  ? 'दोष के प्रमुख लक्षण एवं दुष्प्रभाव'
                  : 'દોષના મુખ્ય લક્ષણો'}
              </span>
            </h4>
            <ul className={`space-y-2 text-xs sm:text-sm font-medium ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
              {getSymptoms(activeDosh).map((sym, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Remedies */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200/70'
          }`}>
            <h4 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>
                {lang === 'en'
                  ? 'Authentic Scriptural Vedic Remedies'
                  : lang === 'hi'
                  ? 'अचूक शास्त्रोक्त वैदिक निवारण'
                  : 'શાસ્ત્રોક્ત વૈદિક નિવારણ'}
              </span>
            </h4>
            <ul className={`space-y-2 text-xs sm:text-sm font-medium ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
              {getRemedies(activeDosh).map((rem, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">🚩</span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Types / Categories */}
        <div className={`p-4 rounded-2xl border ${
          isDark ? 'bg-stone-800/70 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
        }`}>
          <span className={`font-bold text-xs sm:text-sm block mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
            📋 {lang === 'en' ? 'Prominent Categories / Types of this Dosha:' : 'इस दोष के प्रमुख प्रकार (Categories):'}
          </span>
          <div className="flex flex-wrap gap-2">
            {getTypes(activeDosh).map((t, idx) => (
              <span key={idx} className={`text-xs px-3 py-1 rounded-full font-bold shadow-2xs border ${
                isDark 
                  ? 'bg-stone-700 text-stone-100 border-stone-600' 
                  : 'bg-white text-stone-950 border-[#FF671F]/30'
              }`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency Help Banner */}
        <div className={`pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border text-xs sm:text-sm ${
          isDark 
            ? 'bg-stone-800/80 border-amber-500/20 text-stone-200' 
            : 'bg-[#FFF5F0] border-[#FF671F]/30 text-stone-950'
        }`}>
          <div className="text-center sm:text-left">
            <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
              {lang === 'en' ? 'Does your birth chart carry this Dosha?' : 'क्या आपकी कुंडली में यह दोष है?'}
            </span>
            <p className={`font-medium ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
              {lang === 'en'
                ? 'Request a thorough examination of your Janam Kundli by Pandit Ji and learn infallible peace rituals.'
                : 'पंडित जी से अपनी कुंडली का सूक्ष्म परीक्षण कराएं और अचूक उपाय जानें।'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2.5 shrink-0">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap text-xs sm:text-sm shrink-0"
              title={`पंडित जी को सीधे कॉल करें: ${ASTROLOGER_INFO.phonePrimary}`}
            >
              <Phone className="w-4 h-4 shrink-0 text-white" />
              <span className="whitespace-nowrap font-mono font-bold tracking-normal">{ASTROLOGER_INFO.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                lang === 'en'
                  ? `Pranam Pandit Ji! I would like to get my Janam Kundli inspected regarding "${activeDosh.nameEn}".`
                  : `प्रणाम पंडित जी! मुझे "${activeDosh.nameHi}" के संबंध में अपनी कुंडली की जांच करानी है।`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap text-xs sm:text-sm shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-white" />
              <span className="whitespace-nowrap font-bold">{lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
