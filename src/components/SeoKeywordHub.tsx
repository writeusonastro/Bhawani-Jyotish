import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  Globe2, 
  HelpCircle, 
  BookOpen, 
  Phone, 
  MessageCircle,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface SeoKeywordHubProps {
  lang: Language;
  setActiveTab: (tab: string) => void;
}

interface SeoTopicGroup {
  id: string;
  categoryName: {
    hi: string;
    gu: string;
    en: string;
  };
  icon: string;
  targetTab: string;
  badge: string;
  keywords: {
    phrase: string;
    targetTab: string;
    tagHi: string;
    tagGu: string;
    tagEn: string;
  }[];
  quickSummary: {
    hi: string;
    gu: string;
    en: string;
  };
}

const SEO_TOPIC_GROUPS: SeoTopicGroup[] = [
  {
    id: 'love-relationship-solution',
    categoryName: {
      hi: '१. लव प्रॉब्लम सॉल्यूशन एवं प्रेम विवाह समस्या समाधान',
      gu: '૧. લવ પ્રોબ્લેમ સોલ્યુશન અને પ્રેમ લગ્ન સમસ્યા સમાધાન',
      en: '1. Love Problem Solution & Love Marriage Specialist'
    },
    icon: '💖',
    targetTab: 'services',
    badge: '#1 High Search Rank',
    quickSummary: {
      hi: 'प्रेम विवाह में रुकावट, अंतरजातीय विवाह (Intercaste Marriage), रूठे साथी को मनाना, माता-पिता की सहमति, दांपत्य कलह व तलाक से रक्षा हेतु १००% सात्विक वैदिक ज्योतिषीय अनुष्ठान।',
      gu: 'પ્રેમ લગ્નમાં અડચણ, આંતરજ્ઞાતીય લગ્ન, સંબંધોમાં ગેરસમજ, માતા-પિતાની સહમતિ અને તલાકથી રક્ષણ માટે ૧૦૦% સાત્વિક વૈદિક ઉપાય.',
      en: 'Top ranked authentic Vedic astrology remedies for love marriage delays, intercaste marriage obstacles, family consent, and emotional relationship reconciliation.'
    },
    keywords: [
      { phrase: 'Love Problem Solution Astrologer', targetTab: 'services', tagHi: 'लव प्रॉब्लम सॉल्यूशन ज्योतिषी', tagGu: 'લવ પ્રોબ્લેમ સોલ્યુશન જ્યોતિષી', tagEn: 'Love Problem Solution' },
      { phrase: 'Love Marriage Specialist Astrologer', targetTab: 'services', tagHi: 'प्रेम विवाह विशेषज्ञ ज्योतिषी', tagGu: 'પ્રેમ લગ્ન સ્પેશિયાલિસ્ટ જ્યોતિષી', tagEn: 'Love Marriage Specialist' },
      { phrase: 'Satvik Vashikaran Specialist Astrologer', targetTab: 'services', tagHi: 'सात्विक वशीकरण विशेषज्ञ ज्योतिषी', tagGu: 'સાત્વિક વશીકરણ સ્પેશિયાલિસ્ટ જ્યોતિષ', tagEn: 'Satvik Vashikaran Specialist' },
      { phrase: 'Vashikaran Specialist for Love Problem', targetTab: 'services', tagHi: 'प्रेम समस्या हेतु वशीकरण उपाय', tagGu: 'પ્રેમ સમસ્યા વશીકરણ ઉપાય', tagEn: 'Love Vashikaran Solution' },
      { phrase: 'Get Love Back by Vedic Astrology Remedies', targetTab: 'services', tagHi: 'रूठे साथी को मनाने के सात्विक उपाय', tagGu: 'સંબંધ પુનઃ જોડવાના વૈદિક ઉપાય', tagEn: 'Get Love Back Astrology' },
      { phrase: 'Khoya Pyar Pane Ke Jyotish Upay', targetTab: 'services', tagHi: 'खोया प्यार वापस पाने के अचूक उपाय', tagGu: 'ખોવાયેલો પ્રેમ પરત મેળવવાના ઉપાય', tagEn: 'Reconcile Lost Love' },
      { phrase: 'Pati Vashikaran Satvik Upay', targetTab: 'services', tagHi: 'पति वशीकरण सात्विक वैदिक उपाय', tagGu: 'પતિ વશીકરણ સાત્વિક ઉપાય', tagEn: 'Husband Attraction Vedic Upay' },
      { phrase: 'Patni Vashikaran Prem Vardhak Upay', targetTab: 'services', tagHi: 'पत्नी वशीकरण प्रेम वर्धक उपाय', tagGu: 'પત્ની વશીકરણ પ્રેમ વર્ધક ઉપાય', tagEn: 'Wife Love Harmony Upay' },
      { phrase: 'Intercaste Love Marriage Problem Solution', targetTab: 'gun-milan', tagHi: 'अंतरजातीय प्रेम विवाह उपाय', tagGu: 'આંતરજ્ઞાતીય પ્રેમ લગ્ન ઉપાય', tagEn: 'Intercaste Marriage Solution' },
      { phrase: 'Parents Approval for Love Marriage Astrology', targetTab: 'gun-milan', tagHi: 'प्रेम विवाह में माता-पिता की सहमति', tagGu: 'પ્રેમ લગ્નમાં માતા-પિતાની સંમતિ', tagEn: 'Parents Approval for Marriage' },
      { phrase: 'Prem Vivah Me Rukawat Dur Karne Ke Upay', targetTab: 'services', tagHi: 'प्रेम विवाह में बाधा निवारण', tagGu: 'પ્રેમ લગ્નમાં અવરોધ નિવારણ', tagEn: 'Remove Love Marriage Hurdles' },
      { phrase: 'Breakup Problem Solution Pandit Ji', targetTab: 'services', tagHi: 'ब्रेकअप समस्या समाधान', tagGu: 'બ્રેકઅપ સમસ્યા સમાધાન', tagEn: 'Breakup Problem Solution' },
      { phrase: 'One Sided Love Problem Solution Jyotish', targetTab: 'services', tagHi: 'एकतरफा प्रेम निवारण उपाय', tagGu: 'એકતરફી પ્રેમ નિવારણ ઉપાય', tagEn: 'One Sided Love Remedies' },
      { phrase: 'Relationship Misunderstanding Astrological Solution', targetTab: 'services', tagHi: 'रिश्तों में गलतफहमी दूर करने के उपाय', tagGu: 'સંબંધોમાં ગેરસમજ દૂર કરવાના ઉપાય', tagEn: 'Relationship Harmony' },
      { phrase: 'Kamdev Rati Mantra Vedic Upay for Love', targetTab: 'services', tagHi: 'कामदेव-रति वैदिक मंत्र साधना', tagGu: 'કામદેવ-રતિ વૈદિક મંત્ર સાધના', tagEn: 'Vedic Love Remedies' },
      { phrase: 'Mohini Vashikaran Mantra Specialist Astrologer', targetTab: 'services', tagHi: 'मोहिनी वशीकरण विशेषज्ञ ज्योतिषी', tagGu: 'મોહિની વશીકરણ સ્પેશિયાલિસ્ટ જ્યોતિષી', tagEn: 'Mohini Vashikaran Specialist' },
      { phrase: 'Kamakhya Vashikaran Siddha Upay', targetTab: 'services', tagHi: 'कामाख्या वशीकरण सिद्ध सात्विक उपाय', tagGu: 'કામાખ્યા વશીકરણ સિદ્ધ ઉપાય', tagEn: 'Kamakhya Vashikaran' },
      { phrase: 'Boyfriend Girlfriend Vashikaran Astrologer', targetTab: 'services', tagHi: 'बॉयफ्रेंड-गर्लफ्रेंड वशीकरण समाधान', tagGu: 'બોયફ્રેન્ડ-ગર્લફ્રેન્ડ વશીકરણ સમાધાન', tagEn: 'Boyfriend Girlfriend Vashikaran' },
      { phrase: 'Manpasand Shadi Me Rukawat Ke Upay', targetTab: 'gun-milan', tagHi: 'मनपसंद शादी में रुकावट के उपाय', tagGu: 'મનપસંદ લગ્નમાં અડચણ નિવારણ', tagEn: 'Manpasand Shadi Remedies' },
      { phrase: 'Talaq Rokne Ke Jyotish Upay Stop Divorce', targetTab: 'services', tagHi: 'तलाक रोकने के अचूक उपाय', tagGu: 'તલાક રોકવાના શાસ્ત્રોક્ત ઉપાય', tagEn: 'Stop Divorce Astrology' },
      { phrase: 'Ex Lover Back in 24 Hours Astrology Remedies', targetTab: 'services', tagHi: 'रूठे प्रेमी को मनाने के तीव्र उपाय', tagGu: 'રૂઠેલા પ્રેમીને મનાવવાના ઉપાય', tagEn: 'Ex Love Back Fast' },
      { phrase: 'Love Problem Solution in Hindi & Gujarati', targetTab: 'services', tagHi: 'लव प्रॉब्लम सॉल्यूशन हिंदी व गुजराती', tagGu: 'લવ પ્રોબ્લેમ સોલ્યુશન ગુજરાતી', tagEn: 'Hindi Love Problem Solution' },
      { phrase: 'Prem Vivah Me Parivar Ko Razi Karne Ke Upay', targetTab: 'services', tagHi: 'प्रेम विवाह हेतु परिवार को राजी करने के उपाय', tagGu: 'પ્રેમ લગ્ન માટે પરિવારને મનાવવાના ઉપાય', tagEn: 'Convince Family for Marriage' },
      { phrase: 'Love Marriage Specialist in Ahmedabad Gujarat', targetTab: 'city-centers', tagHi: 'अहमदाबाद गुजरात प्रेम विवाह विशेषज्ञ', tagGu: 'અમદાવાદ ગુજરાત પ્રેમ લગ્ન સ્પેશિયાલિસ્ટ', tagEn: 'Ahmedabad Love Astrologer' },
      { phrase: 'Love Problem Solution Astrologer in USA UK Canada', targetTab: 'international', tagHi: 'विदेश NRI लव प्रॉब्लम सॉल्यूशन', tagGu: 'વિદેશ NRI લવ પ્રોબ્લેમ સોલ્યુશન', tagEn: 'NRI Love Problem Solution' },
      { phrase: 'Shastrokt Vivah Badha Nivaran Mantra', targetTab: 'services', tagHi: 'शास्त्रोक्त विवाह बाधा निवारण मंत्र', tagGu: 'શાસ્ત્રોક્ત લગ્ન બાધા નિવારણ મંત્ર', tagEn: 'Marriage Obstacle Removal' }
    ]
  },
  {
    id: 'husband-addiction-peace',
    categoryName: {
      hi: '२. पति व्यसन मुक्ति एवं गृह क्लेश शांति निवारण',
      gu: '૨. પતિ વ્યસન મુક્તિ અને ગૃહ કંકાસ શાંતિ નિવારણ',
      en: '2. Husband De-Addiction & Domestic Peace Astrology'
    },
    icon: '🛡️',
    targetTab: 'services',
    badge: 'High Search Priority',
    quickSummary: {
      hi: 'पति की मदिरापान (शराब) व नशीले पदार्थों की लत छुड़ाने, राहु-शनि दोष शांति, घर के रोज-रोज के झगड़े व क्लेश समाप्त कर परिवार में सुख-शांति व समृद्धि लाने के शास्त्रोक्त सात्विक उपाय।',
      gu: 'પતિની દારૂ કે વ્યસનની લત છોડાવવા, રાહુ-શનિ દોષ શાંતિ અને ઘરમાં રોજ-રોજના કંકાસથી મુક્તિ મેળવી સુખ-શાંતિ સ્થાપિત કરવાના શાસ્ત્રોક્ત ઉપાય.',
      en: 'High search volume Vedic astrology solutions for husband alcohol addiction, bad habits, aggressive behavior, Rahu dosha pacification, and lasting domestic peace.'
    },
    keywords: [
      { phrase: 'Pati Ki Daru Chudane Ke Jyotish Upay', targetTab: 'services', tagHi: 'पति की शराब छुड़ाने के ज्योतिष उपाय', tagGu: 'પતિની દારૂ છોડાવવાના જ્યોતિષ ઉપાય', tagEn: 'Husband Alcohol Remedy' },
      { phrase: 'Husband Alcohol Addiction Astrology Remedy', targetTab: 'services', tagHi: 'पति मदिरा व्यसन मुक्ति ज्योतिष उपाय', tagGu: 'પતિ દારૂ વ્યસન મુક્તિ ઉપાય', tagEn: 'Husband Addiction Remedies' },
      { phrase: 'Pati Ko Nasha Chudane Ke Totke Vaidik Upay', targetTab: 'services', tagHi: 'पति को नशा मुक्त करने के सात्विक उपाय', tagGu: 'પતિને નશા મુક્ત કરવાના સાત્વિક ઉપાય', tagEn: 'Vedic De-Addiction Upay' },
      { phrase: 'Grih Klesh Shanti Vedic Jyotish Upay', targetTab: 'services', tagHi: 'गृह क्लेश शांति वैदिक अनुष्ठान', tagGu: 'ગૃહ કંકાસ શાંતિ વૈદિક અનુષ્ઠાન', tagEn: 'Grih Klesh Shanti' },
      { phrase: 'Husband Wife Dispute & Fight Solution Astrology', targetTab: 'services', tagHi: 'पति-पत्नी विवाद व कलह शांति', tagGu: 'પતિ-પત્ની ઝઘડા નિવારણ', tagEn: 'Husband Wife Dispute' },
      { phrase: 'Stop Domestic Fights & Violence Astrology', targetTab: 'services', tagHi: 'घर में रोज-रोज के झगड़े बंद करने के उपाय', tagGu: 'ઘરમાં દરરોજના કંકાસ બંધ કરવાના ઉપાય', tagEn: 'Stop Domestic Discord' },
      { phrase: 'Rahu Shani Graha Shanti for Addiction Relief', targetTab: 'services', tagHi: 'राहु-शनि ग्रह शांति व्यसन मुक्ति', tagGu: 'રાહુ-શનિ ગ્રહ શાંતિ વ્યસન મુક્તિ', tagEn: 'Rahu Shani Shanti' },
      { phrase: 'Family Peace & De Addiction Mahamrityunjay Upay', targetTab: 'services', tagHi: 'महामृत्युंजय सिद्ध रक्षा कवच अनुष्ठान', tagGu: 'મહામૃત્યુંજય રક્ષા કવચ અનુષ્ઠાન', tagEn: 'Mahamrityunjay Armor' },
      { phrase: 'Pati Ki Buri Sangat Chhudane Ke Upay', targetTab: 'services', tagHi: 'पति की बुरी संगत व लत छुड़ाने के उपाय', tagGu: 'પતિની ખરાબ સંગત છોડાવવાના ઉપાય', tagEn: 'Remove Bad Influences' },
      { phrase: 'Home Prosperity & Peace Vedic Remedies', targetTab: 'services', tagHi: 'घर में बरकत व शांति के वैदिक उपाय', tagGu: 'ઘરમાં બરકત અને શાંતિના વૈદિક ઉપાય', tagEn: 'Home Harmony Astrology' },
      { phrase: 'Sharab Chudane Ke Gharelu va Jyotish Upay', targetTab: 'services', tagHi: 'शराब छुड़ाने के घरेलू व ज्योतिष उपाय', tagGu: 'દારૂ છોડાવવાના ઘરેલું અને જ્યોતિષ ઉપાય', tagEn: 'De-Addiction Astrology Upay' },
      { phrase: 'Pati Ka Gussa Shant Karne Ke Upay', targetTab: 'services', tagHi: 'पति का क्रोध व गुस्सा शांत करने के उपाय', tagGu: 'પતિનો ક્રોધ શાંત કરવાના ઉપાય', tagEn: 'Pacify Husband Anger' },
      { phrase: 'Ghar Me Sukh Shanti Ke Saral Upay', targetTab: 'services', tagHi: 'घर में सुख-शांति व कलह मुक्ति उपाय', tagGu: 'ઘરમાં સુખ-શાંતિ અને કલહ મુક્તિ ઉપાય', tagEn: 'Domestic Harmony Remedies' },
      { phrase: 'Dampatya Klesh Nivaran Mahahavan', targetTab: 'services', tagHi: 'दांपत्य क्लेश निवारण महाहवन', tagGu: 'દાંપત્ય કલેશ નિવારણ મહાહવન', tagEn: 'Marital Peace Havan' }
    ]
  },
  {
    id: 'par-stree-sautan-nivaran',
    categoryName: {
      hi: '३. पर-स्त्री संबंध निवारण एवं दांपत्य रक्षा महाअनुष्ठान',
      gu: '૩. પરસ્ત્રી સંબંધ નિવારણ અને દાંપત્ય સુરક્ષા અનુષ્ઠાન',
      en: '3. Husband Extra-Marital Affair & Marital Defense'
    },
    icon: '💍',
    targetTab: 'services',
    badge: 'High Conversion Search',
    quickSummary: {
      hi: 'पति का पराई स्त्री या बाहरी आकर्षण में भटकाव रोकना, सौतन से छुटकारा, शुक्र-राहु युति दोष शांति, दांपत्य में पुनः एकनिष्ठ प्रेम व विश्वास जगाने और तलाक से रक्षा के गुप्त वैदिक अनुष्ठान।',
      gu: 'પતિનું પરસ્ત્રી કે બાહ્ય આકર્ષણ દૂર કરવું, સૌતનથી મુક્તિ, શુક્ર-રાહુ દોષ શાંતિ અને દાંપત્ય જીવનમાં એકનિષ્ઠ પ્રેમ સ્થાપિત કરવાના શાસ્ત્રોક્ત ઉપાય.',
      en: 'Vedic rituals to stop husband extra-marital affairs, remove third-party interference, pacify afflicted Venus-Rahu placements, and secure eternal marital fidelity.'
    },
    keywords: [
      { phrase: 'Husband Extra Marital Affair Astrological Solution', targetTab: 'services', tagHi: 'पति पर-स्त्री भटकाव मुक्ति उपाय', tagGu: 'પતિ પરસ્ત્રી આકર્ષણ મુક્તિ ઉપાય', tagEn: 'Husband Affair Remedy' },
      { phrase: 'Sautan Se Chutkara Pane Ke Vaidik Upay', targetTab: 'services', tagHi: 'सौतन से छुटकारा पाने के वैदिक उपाय', tagGu: 'સૌતનથી મુક્તિ મેળવવાના વૈદિક ઉપાય', tagEn: 'Sautan Se Chutkara Upay' },
      { phrase: 'Pati Ko Dusri Aurat Se Alag Karne Ke Upay', targetTab: 'services', tagHi: 'पति को दूसरी औरत से अलग करने के सात्विक उपाय', tagGu: 'પતિને અન્ય સ્ત્રીથી દૂર કરવાના ઉપાય', tagEn: 'Stop Extramarital Bond' },
      { phrase: 'Stop Husband Affair & Save Marriage Astrology', targetTab: 'services', tagHi: 'पति का अफेयर छुड़वाकर दांपत्य रक्षा', tagGu: 'દાંપત્ય જીવન બચાવવા માટે અચૂક ઉપાય', tagEn: 'Save Marriage from Affair' },
      { phrase: 'Pati Ka Moh Bhang Karne Ke Satvik Upay', targetTab: 'services', tagHi: 'पति का पराई स्त्री से मोह भंग उपाय', tagGu: 'પતિનો અન્ય સ્ત્રી તરફ મોહભંગ ઉપાય', tagEn: 'Remove Husband Attraction' },
      { phrase: 'Protect Marriage from Third Person Interference', targetTab: 'services', tagHi: 'तीसरे व्यक्ति का हस्तक्षेप रोकने के उपाय', tagGu: 'ત્રીજી વ્યક્તિનું હસ્તક્ષેપ રોકવાના ઉપાય', tagEn: 'Third Party Removal' },
      { phrase: 'Stop Divorce Caused by Affair Astrology', targetTab: 'services', tagHi: 'अफेयर के कारण तलाक रोकने के ज्योतिष उपाय', tagGu: 'તલાક અટકાવવાના શાસ્ત્રોક્ત ઉપાય', tagEn: 'Prevent Divorce' },
      { phrase: 'Shukra Rahu Dosha Shanti For Faithful Husband', targetTab: 'services', tagHi: 'शुक्र-राहु दोष शांति महाअनुष्ठान', tagGu: 'શુક્ર-રાહુ દોષ શાંતિ અનુષ્ઠાન', tagEn: 'Venus Rahu Shanti' },
      { phrase: 'Gauri Shankar Rudraksha For Marital Fidelity', targetTab: 'gemstones', tagHi: 'गौरी-शंकर रुद्राक्ष दांपत्य रक्षा', tagGu: 'ગૌરી-શંકર રુદ્રાક્ષ દાંપત્ય રક્ષા', tagEn: 'Gauri Shankar Rudraksha' },
      { phrase: 'Reignite Lost Love Between Husband and Wife', targetTab: 'services', tagHi: 'पति-पत्नी में खोया प्रेम व विश्वास लौटाएं', tagGu: 'પતિ-પત્નીમાં ખોવાયેલો પ્રેમ પરત લાવો', tagEn: 'Rebuild Marital Trust' },
      { phrase: 'Pati Ko Par Stree Se Door Rakhne Ke Upay', targetTab: 'services', tagHi: 'पति को पराई स्त्री से दूर रखने के उपाय', tagGu: 'પતિને પરસ્ત્રીથી દૂર રાખવાના ઉપાય', tagEn: 'Keep Husband Loyal' },
      { phrase: 'Sautan Se Mukti Pane Ke Jyotish Upay', targetTab: 'services', tagHi: 'सौतन से मुक्ति व दांपत्य सुरक्षा', tagGu: 'સૌતન મુક્તિ અને દાંપત્ય સુરક્ષા', tagEn: 'Sautan Mukti Jyotish' },
      { phrase: 'Divorce Rokne Aur Shadi Bachane Ke Upay', targetTab: 'services', tagHi: 'तलाक रोकने और शादी बचाने के उपाय', tagGu: 'તલાક રોકવા અને લગ્ન બચાવવાના ઉપાય', tagEn: 'Stop Divorce Remedies' },
      { phrase: 'Pati Ki Bewafai Dur Karne Ke Satvik Upay', targetTab: 'services', tagHi: 'पति की बेवफाई दूर कर प्रेम जगाने के उपाय', tagGu: 'પતિની બેવફાઈ દૂર કરી પ્રેમ સ્થાપવાનો ઉપાય', tagEn: 'Cure Husband Infidelity' }
    ]
  },
  {
    id: 'child-sanskar-education',
    categoryName: {
      hi: '४. जिद्दी व अनियंत्रित संतान सुधार एवं सद्बुद्धि अनुष्ठान',
      gu: '૪. જીદ્દી અને અનિયંત્રિત બાળક સુધાર તથા સદ્બુદ્ધિ અનુષ્ઠાન',
      en: '4. Stubborn Child Guidance & Studies Focus Remedies'
    },
    icon: '🎓',
    targetTab: 'services',
    badge: 'Trending Parent Query',
    quickSummary: {
      hi: 'बच्चा कहना न मानता हो, अत्यधिक जिद्दी या गुस्सैल हो, मोबाइल फोन की लत, गलत संगत या पढ़ाई से ध्यान भटकता हो—बुध-बृहस्पति शांति, सरस्वती अनुष्ठान व सात्विक संस्कार वैदिक उपाय।',
      gu: 'બાળક કહ્યામાં ન હોય, અત્યંત જિદ્દી કે ક્રોધી સ્વભાવ, મોબાઇલની લત, ખરાબ સંગત કે ભણતરમાં એકાગ્રતા ન હોવાના સરસ્વતી-બુધ વૈદિક ઉપાય.',
      en: 'Proven Vedic astrological remedies for disobedient and stubborn children, severe screen/mobile addiction, peer pressure/bad company, and academic concentration.'
    },
    keywords: [
      { phrase: 'Bacha Kehna Na Manta Ho To Jyotish Upay', targetTab: 'services', tagHi: 'बच्चा कहना न माने तो ज्योतिष उपाय', tagGu: 'બાળક કહ્યામાં ન હોય તો જ્યોતિષ ઉપાય', tagEn: 'Disobedient Child Remedies' },
      { phrase: 'Stubborn Child Anger & Disobedience Astrology', targetTab: 'services', tagHi: 'जिद्दी बच्चे का गुस्सा शांत करने के उपाय', tagGu: 'જીદ્દી બાળકનો ક્રોધ શાંત કરવાના ઉપાય', tagEn: 'Stubborn Child Guidance' },
      { phrase: 'Jiddi Bache Ko Sudharne Ke Jyotish Upay', targetTab: 'services', tagHi: 'जिद्दी संतान सुधार वैदिक उपाय', tagGu: 'જીદ્દી સંતાન સુધાર વૈદિક ઉપાય', tagEn: 'Child Sanskar Jyotish' },
      { phrase: 'Child Study Concentration Saraswati Upay', targetTab: 'services', tagHi: 'पढ़ाई में एकाग्रता व सरस्वती उपाय', tagGu: 'ભણતરમાં એકાગ્રતા સરસ્વતી ઉપાય', tagEn: 'Child Studies Focus Upay' },
      { phrase: 'Bache Ka Padhai Me Man Lagane Ke Upay', targetTab: 'services', tagHi: 'बच्चे का पढ़ाई में मन लगाने के उपाय', tagGu: 'બાળકનું ભણવામાં મન લગાવવાના ઉપાય', tagEn: 'Academic Focus Remedies' },
      { phrase: 'Child Bad Company Removal Vedic Upay', targetTab: 'services', tagHi: 'संतान की गलत संगति छुड़ाने के उपाय', tagGu: 'સંતાનની ખરાબ સંગત છોડાવવાના ઉપાય', tagEn: 'Remove Bad Peer Influence' },
      { phrase: 'Kids Mobile Phone Screen Addiction Astrology', targetTab: 'services', tagHi: 'बच्चों की मोबाइल लत छुड़ाने के उपाय', tagGu: 'બાળકોની મોબાઇલ લત છોડાવવાના ઉપાય', tagEn: 'Kids Screen Addiction Upay' },
      { phrase: 'Memory Power & Exam Success Astrology Upay', targetTab: 'services', tagHi: 'परीक्षा में सफलता व स्मरण शक्ति वृद्धि', tagGu: 'પરીક્ષામાં સફળતા અને સ્મરણ શક્તિ વૃદ્ધિ', tagEn: 'Memory & Exam Success' },
      { phrase: 'Budh Brihaspati Shanti For Child Intelligence', targetTab: 'services', tagHi: 'बुध-गुरु ग्रह शांति बुद्धि वृद्धि हेतु', tagGu: 'બુધ-ગુરુ શાંતિ બુદ્ધિ વૃદ્ધિ અર્થે', tagEn: 'Mercury Jupiter Wisdom Upay' },
      { phrase: 'Gayatri Mantra & Saraswati Yantra for Students', targetTab: 'services', tagHi: 'विद्यार्थियों हेतु गायत्री व सरस्वती यंत्र', tagGu: 'વિદ્યાર્થીઓ માટે ગાયત્રી-સરસ્વતી યંત્ર', tagEn: 'Saraswati Yantra Vidyarthi' },
      { phrase: 'Ziddi Bacche Ko Kaise Sudhare Jyotish Upay', targetTab: 'services', tagHi: 'जिद्दी बच्चे को सुधारने के सरल उपाय', tagGu: 'જીદ્દી બાળકને સુધારવાના સરળ ઉપાય', tagEn: 'Calm Stubborn Child Upay' },
      { phrase: 'Bache Ka Gussa Aur Chidchidapan Dur Karne Ke Upay', targetTab: 'services', tagHi: 'बच्चे का चिड़चिड़ापन व गुस्सा दूर करने के उपाय', tagGu: 'બાળકનો ક્રોધ અને ચીડિયાપણું દૂર કરવાના ઉપાય', tagEn: 'Child Anger Management' },
      { phrase: 'Bache Ka Mobile Dekhna Kaise Band Kare', targetTab: 'services', tagHi: 'बच्चे का मोबाइल फोन देखना बंद कराने के उपाय', tagGu: 'બાળકનું મોબાઇલ જોવાનું બંધ કરવાના ઉપાય', tagEn: 'Stop Child Phone Addiction' },
      { phrase: 'Padhai Me Man Lagane Ke Saraswati Mantra', targetTab: 'services', tagHi: 'पढ़ाई में मन लगाने के सरस्वती मंत्र', tagGu: 'ભણવામાં મન લગાવવા સરસ્વતી મંત્ર', tagEn: 'Saraswati Study Mantra' },
      { phrase: 'Exam Me Safalta Pane Ke Jyotish Upay', targetTab: 'services', tagHi: 'परीक्षा में उच्च अंक व सफलता उपाय', tagGu: 'પરીક્ષામાં ઉચ્ચ પરિણામ અને સફળતા ઉપાય', tagEn: 'Exam Success Vedic Upay' }
    ]
  },
  {
    id: 'kundli-matching',
    categoryName: {
      hi: '५. ३६ गुण विवाह मिलान व कुंडली दोष निवारण',
      gu: '૫. ૩૬ ગુણ લગ્ન મિલન અને કુંડળી દોષ નિવારણ',
      en: '5. 36 Gun Milan & Marriage Compatibility'
    },
    icon: '📜',
    targetTab: 'gun-milan',
    badge: '#1 High Search Volume',
    quickSummary: {
      hi: 'अष्टकूट ३६ गुण मिलान, नाड़ी दोष परिहार, भकूट दोष, गण दोष, मांगलिक दोष निवारण एवं सफल दांपत्य जीवन के अचूक शास्त्रोक्त उपाय।',
      gu: 'અષ્ટકૂટ ૩૬ ગુણ મિલન, નાડી દોષ નિવારણ, ભકૂટ દોષ, ગણ દોષ, માંગલિક વિચાર અને સફળ દાંપત્ય જીવનના શાસ્ત્રોક્ત ઉપાય.',
      en: 'Authentic Ashtakoot 36 Guna Kundli Matching, Nadi Dosha cancellation, Bhakoot & Gana Dosha remedies, and Manglik Shanti.'
    },
    keywords: [
      { phrase: '36 Gun Milan for Marriage', targetTab: 'gun-milan', tagHi: '36 गुण मिलान', tagGu: '36 ગુણ મિલન', tagEn: '36 Gun Milan' },
      { phrase: 'Nadi Dosh Nivaran Upay', targetTab: 'gun-milan', tagHi: 'नाड़ी दोष निवारण', tagGu: 'નાડી દોષ નિવારણ', tagEn: 'Nadi Dosh' },
      { phrase: 'Manglik Dosh Shanti Puja', targetTab: 'dosh-guide', tagHi: 'मांगलिक दोष पूजा', tagGu: 'માંગલિક દોષ પૂજા', tagEn: 'Manglik Shanti' },
      { phrase: 'Bhakoot Dosh Parihar', targetTab: 'gun-milan', tagHi: 'भकूट दोष परिहार', tagGu: 'ભકૂટ દોષ પરિહાર', tagEn: 'Bhakoot Dosh' },
      { phrase: 'Gujarati Kundli Matching for Marriage', targetTab: 'gun-milan', tagHi: 'गुजराती लग्न कुंडली मिलान', tagGu: 'ગુજરાતી લગ્ન કુંડળી મિલન', tagEn: 'Gujarati Kundli Match' },
      { phrase: 'Late Marriage Problem Astrology', targetTab: 'gun-milan', tagHi: 'शीघ्र विवाह ज्योतिष उपाय', tagGu: 'શીઘ્ર લગ્ન ઉપાય', tagEn: 'Late Marriage Remedies' }
    ]
  },
  {
    id: 'local-gujarat-mumbai',
    categoryName: {
      hi: '६. गुजरात एवं मुंबई प्रमुख ज्योतिष केंद्र',
      gu: '૬. ગુજરાત અને મુંબઈ મુખ્ય જ્યોતિષ કેન્દ્રો',
      en: '6. Top Astrologer in Gujarat & Mumbai'
    },
    icon: '🏛️',
    targetTab: 'city-centers',
    badge: 'Local Verified Rankings',
    quickSummary: {
      hi: 'मेहसाणा, अहमदाबाद (वस्त्रपुर, SG हाइवे), सूरत (हीरा व कपड़ा), राजकोट (सौराष्ट्र), गांधीनगर (GIFT City) एवं मुंबई (कांदिवली, घाटकोपर)।',
      gu: 'મહેસાણા, અમદાવાદ, સુરત, રાજકોટ, ગાંધીનગર અને મુંબઈના પરિવારો માટે વિશ્વસનીય જ્યોતિષ સંસ્થાન.',
      en: 'Renowned Vedic Astrologer serving Mehsana, Ahmedabad, Surat, Rajkot, Gandhinagar GIFT City, and Mumbai suburbs.'
    },
    keywords: [
      { phrase: 'Best Astrologer in Ahmedabad', targetTab: 'city-centers', tagHi: 'अहमदाबाद बेस्ट ज्योतिषी', tagGu: 'અમદાવાદ શ્રેષ્ઠ જ્યોતિષી', tagEn: 'Astrologer Ahmedabad' },
      { phrase: 'Famous Jyotish Vastrapur Satellite SG Highway', targetTab: 'city-centers', tagHi: 'वस्त्रपुर सेटेलाइट ज्योतिष', tagGu: 'વસ્ત્રાપુર સેટેલાઇટ જ્યોતિષ', tagEn: 'Vastrapur Jyotish' },
      { phrase: 'Best Astrologer in Mehsana Nagalpur', targetTab: 'city-centers', tagHi: 'मेहसाणा मुख्य पीठ', tagGu: 'મહેસાણા મુખ્ય કાર્યાલય', tagEn: 'Mehsana Astrologer' },
      { phrase: 'Best Astrologer in Surat Katargam Vesu', targetTab: 'city-centers', tagHi: 'सूरत हीरा व कपड़ा ज्योतिष', tagGu: 'સુરત કાપડ-હીરા જ્યોતિષ', tagEn: 'Surat Astrologer' },
      { phrase: 'Famous Jyotish in Rajkot Kalawad Road', targetTab: 'city-centers', tagHi: 'राजकोट सौराष्ट्र ज्योतिष', tagGu: 'રાજકોટ સૌરાષ્ટ્ર જ્યોતિષ', tagEn: 'Rajkot Jyotish' },
      { phrase: 'Best Astrologer in Gandhinagar GIFT City', targetTab: 'city-centers', tagHi: 'गांधीनगर गिफ्ट सिटी वास्तु', tagGu: 'ગાંધીનગર ગિફ્ટ સિટી વાસ્તુ', tagEn: 'Gandhinagar Astrologer' },
      { phrase: 'Gujarati Astrologer in Mumbai Kandivali Ghatkopar', targetTab: 'city-centers', tagHi: 'मुंबई गुजराती ज्योतिषी', tagGu: 'મુંબઈ ગુજરાતી જ્યોતિષી', tagEn: 'Mumbai Astrologer' },
      { phrase: 'Stock Market Astrologer Gujarat', targetTab: 'services', tagHi: 'शेयर बाज़ार ग्रह दशा', tagGu: 'શેરબજાર ગ્રહ દશા', tagEn: 'Stock Market Jyotish' }
    ]
  },
  {
    id: 'nri-global-seo',
    categoryName: {
      hi: '७. प्रवासी भारतीय (Abroad & NRI High Ranking Queries)',
      gu: '૭. પ્રવાસી ભારતીય (Abroad & NRI High Ranking Queries)',
      en: '7. NRI Astrology USA, UK, Canada, Australia & UAE'
    },
    icon: '🌐',
    targetTab: 'international',
    badge: 'Worldwide High Authority',
    quickSummary: {
      hi: 'अमेरिका (एडिसन NJ, सैन जोस CA, डलास TX), यूके (लंदन, लीसेस्टर), कनाडा (टोरंटो, ब्रैम्पटन), ऑस्ट्रेलिया (सिडनी, मेलबर्न) व दुबई (UAE)। DST जन्म पत्रिका, H1B/ग्रीन कार्ड, PR समयावधि एवं NRI लव प्रॉब्लम व पारिवारिक समाधान।',
      gu: 'યુએસએ, યુકે, કેનેડા, ઓસ્ટ્રેલિયા અને દુબઈમાં વસતા એનઆરઆઈ પરિવારો માટે ડે-લાઇટ સેવિંગ ટાઇમ (DST) આધારિત કુંડળી, વિઝા અને વિવાહ પરામર્શ.',
      en: 'Precision Daylight Saving Time (DST) calculations, foreign birth charts, H1B visa, Green Card priority date, Canada PR timing & NRI relationship guidance for international diaspora.'
    },
    keywords: [
      { phrase: 'Best Indian Astrologer in USA', targetTab: 'international', tagHi: 'बेस्ट इंडियन ज्योतिषी USA', tagGu: 'યુએસએ શ્રેષ્ઠ ભારતીય જ્યોતિષી', tagEn: 'Indian Astrologer USA' },
      { phrase: 'Gujarati Astrologer in New Jersey Edison', targetTab: 'international', tagHi: 'न्यू जर्सी एडिसन ज्योतिषी', tagGu: 'ન્યૂ જર્સી એડિસન જ્યોતિષી', tagEn: 'Edison NJ Astrologer' },
      { phrase: 'Indian Astrologer California Bay Area San Jose', targetTab: 'international', tagHi: 'कैलिफोर्निया बे एरिया ज्योतिष', tagGu: 'કેલિફોર્નિયા બે એરિયા જ્યોતિષ', tagEn: 'California Astrologer' },
      { phrase: 'Best Indian Astrologer in UK London Leicester', targetTab: 'international', tagHi: 'यूके लंदन लीसेस्टर ज्योतिषी', tagGu: 'યુકે લંડન લિસેસ્ટર જ્યોતિષી', tagEn: 'UK London Astrologer' },
      { phrase: 'Gujarati Astrologer Wembley Harrow Birmingham', targetTab: 'international', tagHi: 'वेम्बली हैरो गुजराती ज्योतिष', tagGu: 'વેમ્બલી હેરો જ્યોતિષી', tagEn: 'Wembley Jyotish' },
      { phrase: 'Best Indian Astrologer in Canada Toronto Brampton', targetTab: 'international', tagHi: 'कनाडा टोरंटो ब्रैम्पटन ज्योतिष', tagGu: 'કેનેડા ટોરોન્ટો જ્યોતિષ', tagEn: 'Canada Astrologer' },
      { phrase: 'Indian Astrologer in Dubai UAE', targetTab: 'international', tagHi: 'दुबई यूएई भारतीय ज्योतिषी', tagGu: 'દુબઈ યુએઈ જ્યોતિષી', tagEn: 'Dubai Astrologer' },
      { phrase: 'Foreign Birth DST Kundli Calculation', targetTab: 'international', tagHi: 'विदेश जन्म DST कुंडली', tagGu: 'વિદેશ જન્મ DST કુંડળી', tagEn: 'Foreign Birth DST' },
      { phrase: 'H1B Visa & Canada PR Astrological Timing', targetTab: 'international', tagHi: 'वीजा व पीआर ज्योतिष विचार', tagGu: 'વિઝા અને પીઆર ગ્રહ વિચાર', tagEn: 'Visa Timing Astrology' },
      { phrase: 'Green Card Priority Date Astrology USA', targetTab: 'international', tagHi: 'ग्रीन कार्ड प्राप्ति ज्योतिष', tagGu: 'ગ્રીન કાર્ડ પ્રાપ્તિ જ્યોતિષ', tagEn: 'Green Card Astrology' },
      { phrase: 'Love Problem Solution for NRIs Abroad', targetTab: 'international', tagHi: 'NRI लव प्रॉब्लम सॉल्यूशन', tagGu: 'NRI લવ પ્રોબ્લેમ સોલ્યુશન', tagEn: 'NRI Love Solution' },
      { phrase: 'Remote Vedic Puja & Live Video Sankalp', targetTab: 'international', tagHi: 'विदेश से लाइव वीडियो संकल्प पूजा', tagGu: 'વિદેશથી લાઇવ વિડિયો સંકલ્પ પૂજા', tagEn: 'Remote Puja Sankalp' }
    ]
  },
  {
    id: 'doshas-and-remedies',
    categoryName: {
      hi: '८. दोष निवारण, पितृ शांति व वास्तु शास्त्र',
      gu: '૮. દોષ નિવારણ, પિતૃ શાંતિ અને વાસ્તુ શાસ્ત્ર',
      en: '8. Dosha Remedies, Pitra Shanti & Vastu'
    },
    icon: '🔱',
    targetTab: 'dosh-guide',
    badge: 'Scriptural Vedic Remedies',
    quickSummary: {
      hi: 'कालसर्प दोष पूजा, पितृ दोष तर्पण (सिद्धपुर/उज्जैन), साढ़ेसाती उपाय, बिना तोड़फोड़ का गृह व फैक्ट्री वास्तु, सिद्ध रत्न व रुद्राक्ष।',
      gu: 'કાલસર્પ દોષ પૂજા, પિતૃ દોષ તર્પણ (સિદ્ધપુર/ઉજ્જૈન), શનિ સાડાસાતી ઉપાય અને તોડફોડ વગરનું વાસ્તુ.',
      en: 'Authentic Kaal Sarp Yog Shanti, Siddhpur Pitra Moksha, Saturn Sade Sati remedies, non-destructive Vastu, and energized Rudraksha.'
    },
    keywords: [
      { phrase: 'Kaal Sarp Dosh Nivaran Puja Siddhpur Ujjain', targetTab: 'dosh-guide', tagHi: 'कालसर्प दोष शांति पूजा', tagGu: 'કાલસર્પ દોષ શાંતિ પૂજા', tagEn: 'Kaal Sarp Puja' },
      { phrase: 'Pitra Dosh Nivaran Tarpan Siddhpur Gujarat', targetTab: 'dosh-guide', tagHi: 'पितृ दोष निवारण सिद्धपुर', tagGu: 'પિતૃ દોષ તર્પણ સિદ્ધપુર', tagEn: 'Pitra Dosh Siddhpur' },
      { phrase: 'Shani Sade Sati Nivaran Upay', targetTab: 'dosh-guide', tagHi: 'शनि साढ़ेसाती उपाय', tagGu: 'શનિ સાડાસાતી ઉપાય', tagEn: 'Sade Sati Upay' },
      { phrase: 'Residential & Commercial Vastu without Demolition', targetTab: 'services', tagHi: 'बिना तोड़फोड़ वास्तु समाधान', tagGu: 'તોડફોડ વગર વાસ્તુ સમાધાન', tagEn: 'Vastu without Demolition' },
      { phrase: 'Lucky Gemstone by Rashi & Lagna Kundli', targetTab: 'gemstones', tagHi: 'राशि अनुसार भाग्यशाली रत्न', tagGu: 'રાશિ મુજબ ભાગ્યશાળી રત્ન', tagEn: 'Lucky Gemstones' },
      { phrase: 'Authentic Nepali Rudraksha Recommendation', targetTab: 'gemstones', tagHi: 'प्रामाणिक नेपाली रुद्राक्ष', tagGu: 'અધિકૃત નેપાળી રુદ્રાક્ષ', tagEn: 'Vedic Rudraksha' },
      { phrase: 'Business Growth Vyapar Vriddhi Yantra', targetTab: 'services', tagHi: 'व्यापार वृद्धि यंत्र स्थापना', tagGu: 'વેપાર વૃદ્ધિ યંત્ર સ્થાપના', tagEn: 'Vyapar Vriddhi Yantra' }
    ]
  },
  {
    id: 'vyapar-dhan-karz-mukti',
    categoryName: {
      hi: '९. व्यापार वृद्धि, कर्ज मुक्ति व धन-समृद्धि योग',
      gu: '૯. વેપાર વૃદ્ધિ, દેવા મુક્તિ અને ધન-સમૃદ્ધિ યોગ',
      en: '9. Business Growth, Debt Relief & Financial Prosperity'
    },
    icon: '💰',
    targetTab: 'services',
    badge: 'High Commercial Volume',
    quickSummary: {
      hi: 'दुकान या व्यापार में मंदी, आर्थिक तंगी, भारी कर्ज और लोन से मुक्ति, फंसा हुआ धन वापस पाना, नौकरी में प्रमोशन व शेयर बाजार ग्रह विचार हेतु श्री महालक्ष्मी व कुबेर सात्विक वैदिक उपाय।',
      gu: 'ધંધામાં ખોટ, દેવામાંથી મુક્તિ, અટકેલા નાણાં પરત મેળવવા, નોકરીમાં પ્રમોશન અને આર્થિક સમૃદ્ધિ માટે શાસ્ત્રોક્ત વૈદિક ઉપાય.',
      en: 'High-converting Vedic astrology solutions for commercial recession, loan repayment, debt clearance, blocked money recovery, job promotion, and wealth enhancement.'
    },
    keywords: [
      { phrase: 'Vyapar Vridhi Totke va Jyotish Upay', targetTab: 'services', tagHi: 'व्यापार वृद्धि ज्योतिष उपाय', tagGu: 'વેપાર વૃદ્ધિ જ્યોતિષ ઉપાય', tagEn: 'Business Growth Remedies' },
      { phrase: 'Karz Mukti Ke Achook Jyotish Upay', targetTab: 'services', tagHi: 'कर्ज मुक्ति के अचूक उपाय', tagGu: 'દેવા મુક્તિના અચૂક ઉપાય', tagEn: 'Debt Relief Remedies' },
      { phrase: 'Dukan me Grahak Badhane Ke Upay', targetTab: 'services', tagHi: 'दुकान में ग्राहक व बिक्री बढ़ाने के उपाय', tagGu: 'દુકાનમાં ગ્રાહક વધારવાના ઉપાય', tagEn: 'Attract Shop Customers' },
      { phrase: 'Ruka Hua Paisa Vapas Pane Ke Upay', targetTab: 'services', tagHi: 'फंसा हुआ धन वापस पाने के उपाय', tagGu: 'અટકેલા નાણાં પરત મેળવવાના ઉપાય', tagEn: 'Recover Blocked Money' },
      { phrase: 'Business Loss Recovery Astrologer', targetTab: 'services', tagHi: 'व्यापार घाटा निवारण ज्योतिष', tagGu: 'વેપાર નુકસાન નિવારણ જ્યોતિષ', tagEn: 'Business Loss Recovery' },
      { phrase: 'Sarkari Naukri va Job Promotion Astrology', targetTab: 'services', tagHi: 'सरकारी नौकरी व पदोन्नति योग', tagGu: 'સરકારી નોકરી અને પ્રમોશન યોગ', tagEn: 'Government Job Astrology' },
      { phrase: 'Stock Market Trading Astrology Gujarat', targetTab: 'services', tagHi: 'शेयर बाजार व सट्टा ग्रह दशा विचार', tagGu: 'શેરબજાર અને સટ્ટા ગ્રહ વિચાર', tagEn: 'Share Market Astrology' },
      { phrase: 'Shree Kuber Laxmi Yantra Sthapana', targetTab: 'services', tagHi: 'श्री कुबेर लक्ष्मी यंत्र स्थापना', tagGu: 'શ્રી કુબેર લક્ષ્મી યંત્ર સ્થાપના', tagEn: 'Kuber Laxmi Yantra' },
      { phrase: 'Vyapar Bandhan Nivaran va Nazar Dosh', targetTab: 'services', tagHi: 'व्यापार बंधन मुक्ति उपाय', tagGu: 'વેપાર બંધન મુક્તિ ઉપાય', tagEn: 'Remove Business Curse' }
    ]
  },
  {
    id: 'buri-nazar-shatru-court',
    categoryName: {
      hi: '१०. शत्रु बाधा, बुरी नजर, कोर्ट केस व तंत्र बाधा निवारण',
      gu: '૧૦. શત્રુ બાધા, નજર દોષ, કોર્ટ કેસ અને તંત્ર બાધા નિવારણ',
      en: '10. Evil Eye, Black Magic Removal & Court Victory'
    },
    icon: '⚔️',
    targetTab: 'services',
    badge: 'High Protection Searches',
    quickSummary: {
      hi: 'घर, दुकान या परिवार पर लगी बुरी नजर, अज्ञात शत्रु भय, तंत्र-मंत्र बाधा मुक्ति, ईर्ष्या निवारण एवं कोर्ट-कचहरी मुकदमों में विजय हेतु १००% सात्विक महामृत्युंजय व बगलामुखी रक्षा अनुष्ठान।',
      gu: 'ઘર કે વેપાર પર લાગેલી ખરાબ નજર, શત્રુ ભય, તંત્ર-મંત્ર મુક્તિ અને કોર્ટ કેસમાં વિજય માટે ૧૦૦% સાત્વિક બગલામુખી રક્ષા અનુષ્ઠાન.',
      en: 'High search demand scriptural Vedic protection against evil eye, negative black energies, jealous enemies, court cases, and legal disputes.'
    },
    keywords: [
      { phrase: 'Buri Nazar Utarne Ke Achook Jyotish Upay', targetTab: 'services', tagHi: 'बुरी नजर उतारने के सरल उपाय', tagGu: 'ખરાબ નજર ઉતારવાના ઉપાય', tagEn: 'Evil Eye Removal Upay' },
      { phrase: 'Kala Jadu Removal Tantrik Badha Nivaran Astrologer', targetTab: 'services', tagHi: 'काला जादू व तंत्र बाधा निवारण', tagGu: 'કાળો જાદુ અને તંત્ર બાધા નિવારણ', tagEn: 'Black Magic Removal' },
      { phrase: 'Shatru Badha Shanti va Dushman Se Chutkara', targetTab: 'services', tagHi: 'शत्रु बाधा शांति व सुरक्षा उपाय', tagGu: 'શત્રુ બાધા શાંતિ અને મુક્તિ ઉપાય', tagEn: 'Enemy Pacification Remedies' },
      { phrase: 'Court Case Me Jeet Ke Jyotish Upay', targetTab: 'services', tagHi: 'कोर्ट केस व मुकदमों में विजय के उपाय', tagGu: 'કોર્ટ કેસમાં વિજય મેળવવાના ઉપાય', tagEn: 'Court Case Victory Upay' },
      { phrase: 'Negative Energy Removal from House Astrology', targetTab: 'services', tagHi: 'घर से नकारात्मक ऊर्जा दूर करने के उपाय', tagGu: 'ઘરમાંથી નકારાત્મક ઊર્જા દૂર કરવાના ઉપાય', tagEn: 'Remove Negative Energy' },
      { phrase: 'Maa Baglamukhi Shatru Vinashak Anushthan', targetTab: 'services', tagHi: 'माँ बगलामुखी शत्रु नाशक अनुष्ठान', tagGu: 'માઁ બગલામુખી શત્રુ નાશક અનુષ્ઠાન', tagEn: 'Maa Baglamukhi Puja' },
      { phrase: 'Siddha Raksha Kavach for Family Protection', targetTab: 'gemstones', tagHi: 'सिद्ध महा रक्षा कवच धारण', tagGu: 'સિદ્ધ મહા રક્ષા કવચ ધારણ', tagEn: 'Vedic Raksha Kavach' },
      { phrase: 'Police Case & Legal Dispute Settlement Astrology', targetTab: 'services', tagHi: 'कानूनी विवाद व पुलिस केस निवारण', tagGu: 'કાનૂની વિવાદ સમાધાન જ્યોતિષ', tagEn: 'Legal Dispute Remedy' }
    ]
  },
  {
    id: 'santan-prapti-banshpati',
    categoryName: {
      hi: '११. संतान प्राप्ति बाधा, संतान गोपाल व गर्भ रक्षा अनुष्ठान',
      gu: '૧૧. સંતાન પ્રાપ્તિ બાધા, સંતાન ગોપાલ અને ગર્ભ રક્ષા અનુષ્ઠાન',
      en: '11. Childless Couple & Santan Gopal Vedic Remedies'
    },
    icon: '👶',
    targetTab: 'services',
    badge: 'High Intent Family Search',
    quickSummary: {
      hi: 'संतान प्राप्ति में अत्यधिक विलंब, पंचम भाव व गुरु (बृहस्पति) दोष निवारण, संतानहीन दंपतियों हेतु श्री संतान गोपाल मंत्र जाप, पुत्र/पुत्री प्राप्ति योग व सुरक्षित गर्भ रक्षा वैदिक अनुष्ठान।',
      gu: 'સંતાન પ્રાપ્તિમાં વિલંબ, પંચમ ભાવ અને ગુરુ દોષ નિવારણ, સંતાન ગોપાલ મંત્ર સાધના અને ગર્ભ રક્ષા વૈદિક ઉપાય.',
      en: 'High search volume Vedic remedies for childless couples, delayed parenthood, 5th house afflicted Jupiter remedies, Santan Gopal Mantra, and Garbha Raksha Anushthan.'
    },
    keywords: [
      { phrase: 'Santan Prapti Ke Achook Jyotish Upay', targetTab: 'services', tagHi: 'संतान प्राप्ति के अचूक ज्योतिष उपाय', tagGu: 'સંતાન પ્રાપ્તિના અચૂક જ્યોતિષ ઉપાય', tagEn: 'Childless Couple Remedies' },
      { phrase: 'Santan Gopal Mantra Jaap Anushthan', targetTab: 'services', tagHi: 'संतान गोपाल मंत्र जाप अनुष्ठान', tagGu: 'સંતાન ગોપાલ મંત્ર જાપ અનુષ્ઠાન', tagEn: 'Santan Gopal Anushthan' },
      { phrase: 'Putra Prapti Yog va Jyotish Margdarshan', targetTab: 'services', tagHi: 'संतान सुख व वंश वृद्धि योग', tagGu: 'સંતાન સુખ અને વંશ વૃદ્ધિ યોગ', tagEn: 'Progeny Astrological Yoga' },
      { phrase: 'Garbh Raksha Vaidik Upay Astrologer', targetTab: 'services', tagHi: 'गर्भ रक्षा व बाधा शांति उपाय', tagGu: 'ગર્ભ રક્ષા અને બાધા શાંતિ ઉપાય', tagEn: 'Garbha Raksha Upay' },
      { phrase: 'Pancham Bhav Brihaspati Dosh Shanti', targetTab: 'services', tagHi: 'पंचम भाव व गुरु ग्रह शांति', tagGu: 'પંચમ ભાવ અને ગુરુ શાંતિ', tagEn: '5th House Jupiter Shanti' },
      { phrase: 'Medical Report Normal But No Child Astrology', targetTab: 'services', tagHi: 'मेडिकल रिपोर्ट सामान्य फिर भी संतान न होने का समाधान', tagGu: 'રિપોર્ટ નોર્મલ છતાં સંતાન ન થવાના ઉપાય', tagEn: 'Unexplained Infertility Astrology' },
      { phrase: 'Late Pregnancy & Delayed Child Birth Jyotish Upay', targetTab: 'services', tagHi: 'देरी से संतान योग व उपाय', tagGu: 'વિલંબિત સંતાન યોગ ઉપાય', tagEn: 'Delayed Child Birth Upay' },
      { phrase: 'Harivansh Puran Path for Progeny', targetTab: 'services', tagHi: 'हरिवंश पुराण श्रवण व संकल्प', tagGu: 'હરિવંશ પુરાણ પાઠ સંકલ્પ', tagEn: 'Harivansh Puran Path' }
    ]
  },
  {
    id: 'vashikaran-reversal-protection',
    categoryName: {
      hi: '१२. किया-कराया, वशीकरण काट, तंत्र रक्षा एवं नजर सुरक्षा',
      gu: '૧૨. કરેલું-કરાવેલું, વશીકરણ કાટ, તંત્ર રક્ષા અને નજર સુરક્ષા',
      en: '12. Vashikaran Removal, Spell Reversal & Spiritual Shield'
    },
    icon: '🛡️',
    targetTab: 'services',
    badge: 'Spiritual Shield Ranking',
    quickSummary: {
      hi: 'किसी के द्वारा किए गए अनैतिक वशीकरण को काटना, किया-कराया दूर करना, पति या संतान पर पड़े नकारात्मक प्रभाव की काट, सुदर्शन चक्र व माँ कामाख्या रक्षा कवच अनुष्ठान।',
      gu: 'કોઈનું કરેલું વશીકરણ તોડવું, તંત્ર કાટ, નકારાત્મક ઊર્જાથી મુક્તિ અને મહા સુદર્શન રક્ષા કવચ ધારણ.',
      en: 'Authentic scriptural Vedic rituals to break negative hypnotic spells, reverse unwanted influence, neutralize occult attacks, and establish divine household protection.'
    },
    keywords: [
      { phrase: 'Vashikaran Todne va Hatane Ke Upay', targetTab: 'services', tagHi: 'वशीकरण तोड़ने व हटाने के उपाय', tagGu: 'વશીકરણ તોડવાના અને હટાવવાના ઉપાય', tagEn: 'Vashikaran Removal Upay' },
      { phrase: 'Kiya Karaya Dur Karne Ke Vedic Upay', targetTab: 'services', tagHi: 'किया-कराया दूर करने के उपाय', tagGu: 'કરેલું-કરાવેલું દૂર કરવાના ઉપાય', tagEn: 'Remove Evil Spells' },
      { phrase: 'Pati Par Kiya Vashikaran Kaise Tode', targetTab: 'services', tagHi: 'पति पर किया वशीकरण कैसे तोड़ें', tagGu: 'પતિ પર થયેલું વશીકરણ કેવી રીતે તોડવું', tagEn: 'Break Husband Spell' },
      { phrase: 'Tantrik Badha Mukti va Sudarshan Kavach', targetTab: 'gemstones', tagHi: 'तांत्रिक बाधा मुक्ति सुदर्शन चक्र कवच', tagGu: 'તંત્ર બાધા મુક્તિ સુદર્શન કવચ', tagEn: 'Sudarshan Chakra Protection' },
      { phrase: 'Buri Nazar Kaise Utare Gharelu va Jyotish Upay', targetTab: 'services', tagHi: 'बुरी नजर कैसे उतारें ज्योतिष उपाय', tagGu: 'ખરાબ નજર કેવી રીતે ઉતારવી ઉપાય', tagEn: 'How to Remove Evil Eye' },
      { phrase: 'Aura Cleansing & Negative Energy Shield Astrology', targetTab: 'services', tagHi: 'आभा मंडल शुद्धि व रक्षा कवच', tagGu: 'આભામંડળ શુદ્ધિ અને રક્ષા કવચ', tagEn: 'Aura Cleansing Astrology' },
      { phrase: 'Maha Mrityunjaya Raksha Anushthan for Family', targetTab: 'services', tagHi: 'महामृत्युंजय महा अनुष्ठान रक्षा कवच', tagGu: 'મહામૃત્યુંજય રક્ષા અનુષ્ઠાન', tagEn: 'Maha Mrityunjaya Puja' },
      { phrase: 'Ghar Ki Shuddhi va Nazar Dosh Havan', targetTab: 'services', tagHi: 'घर की शुद्धि व नजर दोष हवन', tagGu: 'ઘરની શુદ્ધિ અને નજર દોષ હવન', tagEn: 'House Purification Havan' }
    ]
  }
];

export const SeoKeywordHub: React.FC<SeoKeywordHubProps> = ({ lang, setActiveTab }) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('love-relationship-solution');

  const selectedTopic = SEO_TOPIC_GROUPS.find(t => t.id === selectedTopicId) || SEO_TOPIC_GROUPS[0];

  const filteredTopics = searchFilter.trim() === ''
    ? SEO_TOPIC_GROUPS
    : SEO_TOPIC_GROUPS.map(topic => ({
        ...topic,
        keywords: topic.keywords.filter(k => 
          k.phrase.toLowerCase().includes(searchFilter.toLowerCase()) ||
          k.tagHi.toLowerCase().includes(searchFilter.toLowerCase()) ||
          k.tagGu.toLowerCase().includes(searchFilter.toLowerCase())
        )
      })).filter(topic => topic.keywords.length > 0);

  return (
    <section 
      id="seo-directory" 
      aria-label="Vedic Astrology Popular Search Directory and Topic Explorer"
      className="py-12 sm:py-16 px-3 sm:px-4 max-w-7xl mx-auto w-full print:hidden text-slate-100"
    >
      {/* Directory Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#0c1334] text-[#ffd236] px-3.5 py-1 rounded-full text-xs sm:text-sm font-black border border-amber-500/30 shadow-xs mb-3">
          <TrendingUp className="w-4 h-4 text-[#f99c00]" />
          <span>
            {lang === 'en'
              ? 'High Ranking Search Directory & Astrological Topics'
              : lang === 'hi'
              ? 'अग्रणी ज्योतिषीय विषय एवं प्रमुख खोज अनुक्रमणिका'
              : 'અગ્રણી જ્યોતિષ વિષયો અને લોકપ્રિય શોધ ડિરેક્ટરી'}
          </span>
        </div>

        <h2 className="font-mukta font-extrabold text-2xl sm:text-4xl royal-gold-gradient-text leading-tight mb-2 sm:mb-3 tracking-normal">
          {lang === 'en'
            ? 'Explore Authentic Vedic Astrological Services by Topic'
            : lang === 'hi'
            ? 'शास्त्रोक्त वैदिक ज्योतिषीय विषय एवं संपूर्ण समाधान तालिका'
            : 'શાસ્ત્રોક્ત વૈદિક જ્યોતિષ વિષયો અને સંપૂર્ણ સમાધાન યાદી'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Directly navigate to certified horoscope services, matchmaking, regional city hubs in Gujarat & Mumbai, and international NRI portals across USA, UK, Canada & UAE.'
            : lang === 'hi'
            ? '36 गुण मिलान, कालसर्प-मांगलिक दोष, गुजरात व मुंबई के क्षेत्रीय केंद्र, एवं अमेरिका, यूके व कनाडा के एनआरआई जातकों हेतु सटीक वैदिक समाधान तुरंत खोजें।'
            : '36 ગુણ મિલન, દોષ નિવારણ, ગુજરાત-મુંબઈ કેન્દ્રો અને વિદેશ વસતા એનઆરઆઈ પરિવારો માટે સચોટ વૈદિક માર્ગદર્શન મેળવો.'}
        </p>

        {/* Interactive In-Page Filter */}
        <div className="mt-5 max-w-md mx-auto relative">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search keywords (e.g. 36 Gun Milan, USA, Ahmedabad, Vastu)...'
                : lang === 'hi'
                ? 'खोजें (जैसे: 36 गुण मिलान, USA, अहमदाबाद, वास्तु, नाड़ी दोष)...'
                : 'શોધો (જેમ કે: 36 ગુણ મિલન, અમદાવાદ, વાસ્તુ, નાડી દોષ)...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0c1334] border border-amber-500/30 shadow-xs text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f99c00]/40 focus:border-[#f99c00]"
          />
          <Search className="w-4 h-4 text-[#f99c00] absolute left-3.5 top-3" />
          {searchFilter && (
            <button
              type="button"
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md bg-[#070b1e] border border-white/10"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-white/10">
        {SEO_TOPIC_GROUPS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;
          const categoryTitle = lang === 'en' ? topic.categoryName.en : lang === 'hi' ? topic.categoryName.hi : topic.categoryName.gu;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopicId(topic.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black font-extrabold border-amber-400 shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-[#0c1334] text-slate-300 hover:bg-[#121b44] border-white/10 hover:border-amber-400/30'
              }`}
            >
              <span className="text-base">{topic.icon}</span>
              <span>{categoryTitle}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                isSelected ? 'bg-black/20 text-black font-black' : 'bg-[#070b1e] text-[#ffd236] border border-amber-500/20'
              }`}>
                {topic.keywords.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Full Showcase Card */}
      <div className="bg-[#0c1334] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden mb-8 text-slate-200">
        <div className="bg-gradient-to-r from-[#070b1e] via-[#0a102e] to-[#070b1e] p-5 sm:p-6 border-b border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{selectedTopic.icon}</span>
              <h3 className="font-yatra text-lg sm:text-xl text-white">
                {lang === 'en' ? selectedTopic.categoryName.en : lang === 'hi' ? selectedTopic.categoryName.hi : selectedTopic.categoryName.gu}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0c1334] text-[#ffd236] border border-amber-500/40">
                {selectedTopic.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'en' ? selectedTopic.quickSummary.en : lang === 'hi' ? selectedTopic.quickSummary.hi : selectedTopic.quickSummary.gu}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab(selectedTopic.targetTab)}
            className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#e08b00] hover:to-[#e5a800] text-black font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
          >
            <span>{lang === 'en' ? 'Open Section' : 'सीधे इस विभाग में जाएं'}</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Keywords Pill Cloud with Click-to-Navigate */}
        <div className="p-5 sm:p-6 bg-[#070b1e]">
          <div className="text-xs sm:text-sm font-bold text-amber-400 mb-3.5 flex items-start gap-2 leading-snug">
            <Sparkles className="w-4 h-4 text-[#f99c00] shrink-0 mt-0.5" />
            <span className="flex-1">
              {lang === 'en' 
                ? 'High-Value Astrological Topics (Click to Explore directly):' 
                : 'प्रमुख शास्त्रोक्त विषय एवं खोज शब्द (क्लिक करके संबंधित विभाग खोलें):'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {selectedTopic.keywords.map((kw, i) => {
              const label = lang === 'en' ? kw.tagEn : lang === 'hi' ? kw.tagHi : kw.tagGu;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveTab(kw.targetTab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  title={`Explore ${kw.phrase}`}
                  className="group w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0c1334] hover:bg-gradient-to-r hover:from-[#f99c00] hover:to-[#fcbb00] hover:text-black text-slate-200 border border-white/10 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[#ffd236] group-hover:text-black shrink-0 text-[13px]">✦</span>
                    <span className="truncate">{label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-black shrink-0 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust & Authority Bar at bottom of card */}
        <div className="bg-[#0a102e] px-5 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>35+ वर्ष प्रतिष्ठित वैदिक पीठ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#ffd236] font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>पंडित श्री विरेंद्र कुमार जोशी</span>
            </span>
            <span>•</span>
            <span className="hidden sm:inline">15,000+ संतुष्ट जातक विश्वभर में</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="font-bold text-[#ffd236] hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>{ASTROLOGER_INFO.phonePrimary}</span>
            </a>
            <span className="text-slate-500">|</span>
            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#25D366] hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Comprehensive All-Keyword Reference Grid for Crawlers and Users */}
      <div className="bg-[#0c1334] rounded-3xl border border-amber-500/20 p-5 sm:p-7 shadow-xl">
        <h4 className="font-yatra text-base sm:text-lg royal-gold-gradient-text mb-3 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-[#f99c00]" />
          <span>
            {lang === 'en'
              ? 'Complete Astrological Index & Search Keywords'
              : 'समस्त वैदिक ज्योतिषीय खोज अनुक्रमणिका (Complete Keyword Index)'}
          </span>
        </h4>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {lang === 'en'
            ? 'Bhavani Jyotish Kendra provides verified traditional consultations covering all aspects of Parashara Vedic Astrology, birth chart rectification, 36 Guna marriage Milan, daylight saving time adjustments for foreign born children, and sacred temple rituals on holy shrines.'
            : 'भवानी ज्योतिष केंद्र (नागलपुर, मेहसाणा) द्वारा पराशर होरा शास्त्र पर आधारित शुद्ध जन्म पत्रिका, अष्टकूट विवाह मिलान, मांगलिक व कालसर्प दोष परिहार, विदेश में जन्मे बच्चों हेतु DST गणना, एवं सिद्धपुर/उज्जैन तीर्थों पर शास्त्रोक्त सात्विक अनुष्ठान संपन्न कराए जाते हैं।'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredTopics.map((grp) => (
            <div key={grp.id} className="bg-[#070b1e] p-3.5 rounded-2xl border border-white/10 shadow-2xs">
              <div className="font-bold text-xs text-[#ffd236] mb-2 flex items-center gap-1.5 pb-1 border-b border-white/10">
                <span>{grp.icon}</span>
                <span>{lang === 'en' ? grp.categoryName.en : grp.categoryName.hi}</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {grp.keywords.slice(0, 5).map((k, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-[#f99c00] font-bold">›</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab(k.targetTab)}
                      className="text-left hover:text-[#ffd236] hover:underline cursor-pointer"
                    >
                      {k.phrase}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
