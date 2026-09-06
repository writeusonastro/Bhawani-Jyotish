export interface IndianCity {
  name: string;
  nameHi: string;
  nameGu: string;
  nameEn: string;
  state: string;
  stateHi: string;
  stateGu: string;
  lat: number;
  lon: number;
  popular?: boolean;
}

const BASE_INDIAN_CITIES: IndianCity[] = [
  // --- GUJARAT ---
  { name: "मेहसाणा (Mehsana)", nameHi: "मेहसाणा", nameGu: "મહેસાણા", nameEn: "Mehsana", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.5880, lon: 72.3693, popular: true },
  { name: "अहमदाबाद (Ahmedabad)", nameHi: "अहमदाबाद", nameGu: "અમદાવાદ", nameEn: "Ahmedabad", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.0225, lon: 72.5714, popular: true },
  { name: "गांधीनगर (Gandhinagar)", nameHi: "गांधीनगर", nameGu: "ગાંધીનગર", nameEn: "Gandhinagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.2156, lon: 72.6369, popular: true },
  { name: "सूरत (Surat)", nameHi: "सूरत", nameGu: "સૂરત", nameEn: "Surat", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.1702, lon: 72.8311, popular: true },
  { name: "वडोदरा (Vadodara)", nameHi: "वडोदरा", nameGu: "વડોદરા", nameEn: "Vadodara", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.3072, lon: 73.1812, popular: true },
  { name: "राजकोट (Rajkot)", nameHi: "राजकोट", nameGu: "રાજકોટ", nameEn: "Rajkot", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.3039, lon: 70.8022, popular: true },
  { name: "पाटन (Patan)", nameHi: "पाटन", nameGu: "પાટણ", nameEn: "Patan", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.8493, lon: 72.1266 },
  { name: "पालनपुर (Palanpur)", nameHi: "पालनपुर", nameGu: "પાલનપુર", nameEn: "Palanpur", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 24.1724, lon: 72.4346 },
  { name: "विसनगर (Visnagar)", nameHi: "विसनगर", nameGu: "વિસનગર", nameEn: "Visnagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.6961, lon: 72.5511 },
  { name: "ऊंझा (Unjha)", nameHi: "ऊंझा", nameGu: "ઊંઝા", nameEn: "Unjha", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.8041, lon: 72.3941 },
  { name: "कडी (Kadi)", nameHi: "कडी", nameGu: "કડી", nameEn: "Kadi", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.3031, lon: 72.3315 },
  { name: "कलोल (Kalol)", nameHi: "कलोल", nameGu: "કલોલ", nameEn: "Kalol", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.2389, lon: 72.4975 },
  { name: "भावनगर (Bhavnagar)", nameHi: "भावनगर", nameGu: "ભાવનગર", nameEn: "Bhavnagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.7645, lon: 72.1519 },
  { name: "जामनगर (Jamnagar)", nameHi: "जामनगर", nameGu: "જામનગર", nameEn: "Jamnagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.4707, lon: 70.0577 },
  { name: "जूनागढ़ (Junagadh)", nameHi: "जूनागढ़", nameGu: "જૂનાગઢ", nameEn: "Junagadh", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.5222, lon: 70.4579 },
  { name: "आणंद (Anand)", nameHi: "आणंद", nameGu: "આણંદ", nameEn: "Anand", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.5645, lon: 72.9289 },
  { name: "नवसारी (Navsari)", nameHi: "नवसारी", nameGu: "નવસારી", nameEn: "Navsari", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 20.9467, lon: 72.9520 },
  { name: "मोरबी (Morbi)", nameHi: "मोरबी", nameGu: "મોરબી", nameEn: "Morbi", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.8120, lon: 70.8377 },
  { name: "नडियाद (Nadiad)", nameHi: "नडियाद", nameGu: "નડિયાદ", nameEn: "Nadiad", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.6916, lon: 72.8634 },
  { name: "सुरेंद्रनगर (Surendranagar)", nameHi: "सुरेंद्रनगर", nameGu: "સુરેન્દ્રનગર", nameEn: "Surendranagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.7277, lon: 71.6370 },
  { name: "भरूच (Bharuch)", nameHi: "भरूच", nameGu: "ભરૂચ", nameEn: "Bharuch", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.7051, lon: 72.9959 },
  { name: "पोरबंदर (Porbandar)", nameHi: "पोरबंदर", nameGu: "પોરબંદર", nameEn: "Porbandar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.6417, lon: 69.6293 },
  { name: "गोधरा (Godhra)", nameHi: "गोधरा", nameGu: "ગોધરા", nameEn: "Godhra", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.7766, lon: 73.6148 },
  { name: "भुज (Bhuj - Kutch)", nameHi: "भुज", nameGu: "ભુજ", nameEn: "Bhuj", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.2420, lon: 69.6669 },
  { name: "गांधीधाम (Gandhidham)", nameHi: "गांधीधाम", nameGu: "ગાંધીધામ", nameEn: "Gandhidham", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.0753, lon: 70.1337 },
  { name: "वापी (Vapi)", nameHi: "वापी", nameGu: "વાપી", nameEn: "Vapi", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 20.3893, lon: 72.9106 },
  { name: "वलसाड (Valsad)", nameHi: "वलसाड", nameGu: "વલસાડ", nameEn: "Valsad", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 20.5992, lon: 72.9342 },
  { name: "हिम्मतनगर (Himatnagar)", nameHi: "हिम्मतनगर", nameGu: "હિંમતનગર", nameEn: "Himatnagar", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.5977, lon: 72.9698 },
  { name: "मोडासा (Modasa)", nameHi: "मोडासा", nameGu: "મોડાસા", nameEn: "Modasa", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 23.4632, lon: 73.2984 },
  { name: "डीसा (Deesa)", nameHi: "डीसा", nameGu: "ડીસા", nameEn: "Deesa", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 24.2589, lon: 72.1787 },
  { name: "सोमनाथ (Veraval / Somnath)", nameHi: "सोमनाथ (वेरावल)", nameGu: "સોમનાથ (વેરાવળ)", nameEn: "Somnath", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 20.9000, lon: 70.3667 },
  { name: "द्वारका (Dwarka)", nameHi: "द्वारका", nameGu: "દ્વારકા", nameEn: "Dwarka", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.2442, lon: 68.9685 },
  { name: "अमरेली (Amreli)", nameHi: "अमरेली", nameGu: "અમરેલી", nameEn: "Amreli", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 21.6032, lon: 71.2221 },
  { name: "दाहोद (Dahod)", nameHi: "दाहोद", nameGu: "દાહોદ", nameEn: "Dahod", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.8361, lon: 74.2562 },
  { name: "बोटाद (Botad)", nameHi: "बोटाद", nameGu: "બોટાદ", nameEn: "Botad", state: "गुजरात (Gujarat)", stateHi: "गुजरात", stateGu: "ગુજરાત", lat: 22.1704, lon: 71.6669 },

  // --- MAHARASHTRA ---
  { name: "मुंबई (Mumbai)", nameHi: "मुंबई", nameGu: "મુંબઈ", nameEn: "Mumbai", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.0760, lon: 72.8777, popular: true },
  { name: "पुणे (Pune)", nameHi: "पुणे", nameGu: "પુણે", nameEn: "Pune", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 18.5204, lon: 73.8567, popular: true },
  { name: "नागपुर (Nagpur)", nameHi: "नागपुर", nameGu: "નાગપુર", nameEn: "Nagpur", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 21.1458, lon: 79.0882, popular: true },
  { name: "ठाणे (Thane)", nameHi: "ठाणे", nameGu: "થાણે", nameEn: "Thane", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.2183, lon: 72.9781 },
  { name: "नासिक (Nashik)", nameHi: "नासिक", nameGu: "નાસિક", nameEn: "Nashik", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.9975, lon: 73.7898, popular: true },
  { name: "छत्रपति संभाजीनगर (Aurangabad)", nameHi: "संभाजीनगर (औरंगाबाद)", nameGu: "ઔરંગાબાદ", nameEn: "Aurangabad", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.8762, lon: 75.3433 },
  { name: "नवी मुंबई (Navi Mumbai)", nameHi: "नवी मुंबई", nameGu: "નવી મુંબઈ", nameEn: "Navi Mumbai", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.0330, lon: 73.0297 },
  { name: "सोलापूर (Solapur)", nameHi: "सोलापूर", nameGu: "સોલાપુર", nameEn: "Solapur", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 17.6599, lon: 75.9064 },
  { name: "कोल्हापुर (Kolhapur)", nameHi: "कोल्हापुर", nameGu: "કોલ્હાપુર", nameEn: "Kolhapur", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 16.7050, lon: 74.2433 },
  { name: "अमरावती (Amravati)", nameHi: "अमरावती", nameGu: "અમરાવતી", nameEn: "Amravati", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 20.9374, lon: 77.7796 },
  { name: "नांदेड़ (Nanded)", nameHi: "नांदेड़", nameGu: "નાંદેડ", nameEn: "Nanded", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.1383, lon: 77.3210 },
  { name: "सांगली (Sangli)", nameHi: "सांगली", nameGu: "સાંગલી", nameEn: "Sangli", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 16.8524, lon: 74.5815 },
  { name: "जलगांव (Jalgaon)", nameHi: "जलगांव", nameGu: "જળગાંવ", nameEn: "Jalgaon", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 21.0077, lon: 75.5626 },
  { name: "अकोला (Akola)", nameHi: "अकोला", nameGu: "અકોલા", nameEn: "Akola", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 20.7002, lon: 77.0082 },
  { name: "लातूर (Latur)", nameHi: "लातूर", nameGu: "લાતુર", nameEn: "Latur", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 18.4088, lon: 76.5604 },
  { name: "धुले (Dhule)", nameHi: "धुले", nameGu: "ધૂલે", nameEn: "Dhule", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 20.9042, lon: 74.7749 },
  { name: "अहमदनगर (Ahmednagar)", nameHi: "अहमदनगर", nameGu: "અહમદનગર", nameEn: "Ahmednagar", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.0952, lon: 74.7496 },
  { name: "शिर्डी (Shirdi)", nameHi: "शिर्डी", nameGu: "શિરડી", nameEn: "Shirdi", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 19.7645, lon: 74.4762 },
  { name: "रत्नागिरी (Ratnagiri)", nameHi: "रत्नागिरी", nameGu: "રત્નાગિરી", nameEn: "Ratnagiri", state: "महाराष्ट्र (Maharashtra)", stateHi: "महाराष्ट्र", stateGu: "મહારાષ્ટ્ર", lat: 16.9902, lon: 73.3120 },

  // --- DELHI NCR ---
  { name: "नई दिल्ली (New Delhi)", nameHi: "नई दिल्ली", nameGu: "નવી દિલ્હી", nameEn: "New Delhi", state: "दिल्ली (Delhi NCR)", stateHi: "दिल्ली", stateGu: "દિલ્હી", lat: 28.6139, lon: 77.2090, popular: true },
  { name: "नोएडा (Noida)", nameHi: "नोएडा", nameGu: "નોઈડા", nameEn: "Noida", state: "उत्तर प्रदेश (UP - NCR)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 28.5355, lon: 77.3910, popular: true },
  { name: "गुरुग्राम (Gurugram / Gurgaon)", nameHi: "गुरुग्राम", nameGu: "ગુરુગ્રામ", nameEn: "Gurugram", state: "हरियाणा (Haryana - NCR)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 28.4595, lon: 77.0266, popular: true },
  { name: "गाजियाबाद (Ghaziabad)", nameHi: "गाजियाबाद", nameGu: "ગાઝિયાબાદ", nameEn: "Ghaziabad", state: "उत्तर प्रदेश (UP - NCR)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 28.6692, lon: 77.4538 },
  { name: "फरीदाबाद (Faridabad)", nameHi: "फरीदाबाद", nameGu: "ફરીદાબાદ", nameEn: "Faridabad", state: "हरियाणा (Haryana - NCR)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 28.4089, lon: 77.3178 },

  // --- RAJASTHAN ---
  { name: "जयपुर (Jaipur)", nameHi: "जयपुर", nameGu: "જયપુર", nameEn: "Jaipur", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 26.9124, lon: 75.7873, popular: true },
  { name: "जोधपुर (Jodhpur)", nameHi: "जोधपुर", nameGu: "જોધપુર", nameEn: "Jodhpur", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 26.2389, lon: 73.0243, popular: true },
  { name: "उदयपुर (Udaipur)", nameHi: "उदयपुर", nameGu: "ઉદયપુર", nameEn: "Udaipur", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 24.5854, lon: 73.7125, popular: true },
  { name: "कोटा (Kota)", nameHi: "कोटा", nameGu: "કોટા", nameEn: "Kota", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 25.2138, lon: 75.8648 },
  { name: "बीकानेर (Bikaner)", nameHi: "बीकानेर", nameGu: "બિકાનેર", nameEn: "Bikaner", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 28.0229, lon: 73.3119 },
  { name: "अजमेर (Ajmer)", nameHi: "अजमेर", nameGu: "અજમેર", nameEn: "Ajmer", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 26.4499, lon: 74.6399 },
  { name: "भीलवाड़ा (Bhilwara)", nameHi: "भीलवाड़ा", nameGu: "ભીલવાડા", nameEn: "Bhilwara", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 25.3216, lon: 74.6414 },
  { name: "अलवर (Alwar)", nameHi: "अलवर", nameGu: "અલવર", nameEn: "Alwar", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 27.5530, lon: 76.6346 },
  { name: "भरतपुर (Bharatpur)", nameHi: "भरतपुर", nameGu: "ભરતપુર", nameEn: "Bharatpur", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 27.2152, lon: 77.5030 },
  { name: "सीकर (Sikar)", nameHi: "सीकर", nameGu: "સીકર", nameEn: "Sikar", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 27.6094, lon: 75.1398 },
  { name: "पाली (Pali)", nameHi: "पाली", nameGu: "પાલી", nameEn: "Pali", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 25.7711, lon: 73.3234 },
  { name: "श्रीगंगानगर (Sri Ganganagar)", nameHi: "श्रीगंगानगर", nameGu: "શ્રી ગંગાનગર", nameEn: "Sri Ganganagar", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 29.9038, lon: 73.8772 },
  { name: "माउंट आबू (Mount Abu)", nameHi: "माउंट आबू", nameGu: "માઉન્ટ આબુ", nameEn: "Mount Abu", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 24.5926, lon: 72.7156 },
  { name: "जैसलमेर (Jaisalmer)", nameHi: "जैसलमेर", nameGu: "જૈસલમેર", nameEn: "Jaisalmer", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 26.9157, lon: 70.9083 },
  { name: "बाड़मेर (Barmer)", nameHi: "बाड़मेर", nameGu: "બાડમેર", nameEn: "Barmer", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 25.7532, lon: 71.4181 },
  { name: "चित्तौड़गढ़ (Chittorgarh)", nameHi: "चित्तौड़गढ़", nameGu: "ચિત્તોડગઢ", nameEn: "Chittorgarh", state: "राजस्थान (Rajasthan)", stateHi: "राजस्थान", stateGu: "રાજસ્થાન", lat: 24.8887, lon: 74.6269 },

  // --- UTTAR PRADESH ---
  { name: "लखनऊ (Lucknow)", nameHi: "लखनऊ", nameGu: "લખનૌ", nameEn: "Lucknow", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 26.8467, lon: 80.9462, popular: true },
  { name: "कानपुर (Kanpur)", nameHi: "कानपुर", nameGu: "કાનપુર", nameEn: "Kanpur", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 26.4499, lon: 80.3319, popular: true },
  { name: "वाराणसी / काशी (Varanasi)", nameHi: "वाराणसी (काशी)", nameGu: "વારાણસી (કાશી)", nameEn: "Varanasi", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 25.3176, lon: 82.9739, popular: true },
  { name: "प्रयागराज / इलाहाबाद (Prayagraj)", nameHi: "प्रयागराज", nameGu: "પ્રયાગરાજ", nameEn: "Prayagraj", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 25.4358, lon: 81.8463, popular: true },
  { name: "आगरा (Agra)", nameHi: "आगरा", nameGu: "આગ્રા", nameEn: "Agra", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 27.1767, lon: 78.0081, popular: true },
  { name: "अयोध्या (Ayodhya)", nameHi: "अयोध्या", nameGu: "અયોધ્યા", nameEn: "Ayodhya", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 26.7922, lon: 82.1998, popular: true },
  { name: "मथुरा (Mathura)", nameHi: "मथुरा", nameGu: "મથુરા", nameEn: "Mathura", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 27.4924, lon: 77.6737, popular: true },
  { name: "गोरखपुर (Gorakhpur)", nameHi: "गोरखपुर", nameGu: "ગોરખપુર", nameEn: "Gorakhpur", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 26.7606, lon: 83.3732 },
  { name: "मेरठ (Meerut)", nameHi: "मेरठ", nameGu: "મેરઠ", nameEn: "Meerut", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 28.9845, lon: 77.7064 },
  { name: "बरेली (Bareilly)", nameHi: "बरेली", nameGu: "બરેલી", nameEn: "Bareilly", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 28.3670, lon: 79.4304 },
  { name: "अलीगढ़ (Aligarh)", nameHi: "अलीगढ़", nameGu: "અલીગઢ", nameEn: "Aligarh", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 27.8974, lon: 78.0880 },
  { name: "मुरादाबाद (Moradabad)", nameHi: "मुरादाबाद", nameGu: "મુરાદાબાદ", nameEn: "Moradabad", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 28.8386, lon: 78.7733 },
  { name: "सहारनपुर (Saharanpur)", nameHi: "सहारनपुर", nameGu: "સહારનપુર", nameEn: "Saharanpur", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 29.9671, lon: 77.5452 },
  { name: "झांसी (Jhansi)", nameHi: "झांसी", nameGu: "ઝાંસી", nameEn: "Jhansi", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 25.4484, lon: 78.5685 },
  { name: "मुजफ्फरनगर (Muzaffarnagar)", nameHi: "मुजफ्फरनगर", nameGu: "મુઝફ્ફરનગર", nameEn: "Muzaffarnagar", state: "उत्तर प्रदेश (Uttar Pradesh)", stateHi: "उत्तर प्रदेश", stateGu: "ઉત્તર પ્રદેશ", lat: 29.4727, lon: 77.7085 },

  // --- MADHYA PRADESH ---
  { name: "इंदौर (Indore)", nameHi: "इंदौर", nameGu: "ઈન્દોર", nameEn: "Indore", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 22.7196, lon: 75.8577, popular: true },
  { name: "भोपाल (Bhopal)", nameHi: "भोपाल", nameGu: "ભોપાલ", nameEn: "Bhopal", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 23.2599, lon: 77.4126, popular: true },
  { name: "उज्जैन (Ujjain - Mahakal)", nameHi: "उज्जैन", nameGu: "ઉજ્જૈન", nameEn: "Ujjain", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 23.1765, lon: 75.7885, popular: true },
  { name: "ग्वालियर (Gwalior)", nameHi: "ग्वालियर", nameGu: "ગ્વાલિયર", nameEn: "Gwalior", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 26.2183, lon: 78.1828, popular: true },
  { name: "जबलपुर (Jabalpur)", nameHi: "जबलपुर", nameGu: "જબલપુર", nameEn: "Jabalpur", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 23.1815, lon: 79.9864 },
  { name: "सागर (Sagar)", nameHi: "सागर", nameGu: "સાગર", nameEn: "Sagar", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 23.8388, lon: 78.7378 },
  { name: "रतलाम (Ratlam)", nameHi: "रतलाम", nameGu: "રતલામ", nameEn: "Ratlam", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 23.3315, lon: 75.0367 },
  { name: "सतना (Satna)", nameHi: "सतना", nameGu: "સતના", nameEn: "Satna", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 24.6005, lon: 80.8322 },
  { name: "रीवा (Rewa)", nameHi: "रीवा", nameGu: "રીવા", nameEn: "Rewa", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 24.5362, lon: 81.3037 },
  { name: "देवास (Dewas)", nameHi: "देवास", nameGu: "દેવાસ", nameEn: "Dewas", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 22.9676, lon: 76.0534 },
  { name: "मंदसौर (Mandsaur)", nameHi: "मंदसौर", nameGu: "મંદસૌર", nameEn: "Mandsaur", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 24.0722, lon: 75.0674 },
  { name: "नीमच (Neemuch)", nameHi: "नीमच", nameGu: "નીમચ", nameEn: "Neemuch", state: "मध्य प्रदेश (Madhya Pradesh)", stateHi: "मध्य प्रदेश", stateGu: "મધ્ય પ્રદેશ", lat: 24.4764, lon: 74.8717 },

  // --- BIHAR ---
  { name: "पटना (Patna)", nameHi: "पटना", nameGu: "પટના", nameEn: "Patna", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.5941, lon: 85.1376, popular: true },
  { name: "गया / बोधगया (Gaya)", nameHi: "गया", nameGu: "ગયા", nameEn: "Gaya", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 24.7914, lon: 85.0002, popular: true },
  { name: "मुजफ्फरपुर (Muzaffarpur)", nameHi: "मुजफ्फरपुर", nameGu: "મુઝફ્ફરપુર", nameEn: "Muzaffarpur", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 26.1209, lon: 85.3647 },
  { name: "भागलपुर (Bhagalpur)", nameHi: "भागलपुर", nameGu: "ભાગલપુર", nameEn: "Bhagalpur", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.2425, lon: 86.9842 },
  { name: "पूर्णिया (Purnia)", nameHi: "पूर्णिया", nameGu: "પૂર્ણિયા", nameEn: "Purnia", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.7771, lon: 87.4753 },
  { name: "दरभंगा (Darbhanga)", nameHi: "दरभंगा", nameGu: "દરભંગા", nameEn: "Darbhanga", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 26.1542, lon: 85.8918 },
  { name: "आरा (Arrah)", nameHi: "आरा", nameGu: "આરા", nameEn: "Arrah", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.5541, lon: 84.6669 },
  { name: "बेगूसराय (Begusarai)", nameHi: "बेगूसराय", nameGu: "બેગુસરાય", nameEn: "Begusarai", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.4182, lon: 86.1272 },
  { name: "छपरा (Chhapra)", nameHi: "छपरा", nameGu: "છપરા", nameEn: "Chhapra", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.7848, lon: 84.7274 },
  { name: "कटिहार (Katihar)", nameHi: "कटिहार", nameGu: "કટિહાર", nameEn: "Katihar", state: "बिहार (Bihar)", stateHi: "बिहार", stateGu: "બિહાર", lat: 25.5434, lon: 87.5734 },

  // --- WEST BENGAL ---
  { name: "कोलकाता (Kolkata)", nameHi: "कोलकाता", nameGu: "કોલકાતા", nameEn: "Kolkata", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 22.5726, lon: 88.3639, popular: true },
  { name: "हावड़ा (Howrah)", nameHi: "हावड़ा", nameGu: "હાવડા", nameEn: "Howrah", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 22.5958, lon: 88.2636 },
  { name: "सिलीगुड़ी (Siliguri)", nameHi: "सिलीगुड़ी", nameGu: "સિલીગુડી", nameEn: "Siliguri", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 26.7271, lon: 88.3953 },
  { name: "दुर्गापुर (Durgapur)", nameHi: "दुर्गापुर", nameGu: "દુર્ગાપુર", nameEn: "Durgapur", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 23.5204, lon: 87.3119 },
  { name: "आसनसोल (Asansol)", nameHi: "आसनसोल", nameGu: "આસનસોલ", nameEn: "Asansol", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 23.6739, lon: 86.9524 },
  { name: "दार्जिलिंग (Darjeeling)", nameHi: "दार्जिलिंग", nameGu: "દાર્જિલિંગ", nameEn: "Darjeeling", state: "पश्चिम बंगाल (West Bengal)", stateHi: "पश्चिम बंगाल", stateGu: "પશ્ચિમ બંગાળ", lat: 27.0410, lon: 88.2663 },

  // --- KARNATAKA ---
  { name: "बेंगलुरु (Bengaluru / Bangalore)", nameHi: "बेंगलुरु", nameGu: "બેંગલુરુ", nameEn: "Bengaluru", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 12.9716, lon: 77.5946, popular: true },
  { name: "मैसूर (Mysuru / Mysore)", nameHi: "मैसूर", nameGu: "મૈસૂર", nameEn: "Mysuru", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 12.2958, lon: 76.6394, popular: true },
  { name: "हुबली-धारवाड़ (Hubli-Dharwad)", nameHi: "हुबली", nameGu: "હુબલી", nameEn: "Hubli", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 15.3647, lon: 75.1240 },
  { name: "मंगलुरु (Mangaluru)", nameHi: "मंगलुरु", nameGu: "મંગલોર", nameEn: "Mangaluru", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 12.9141, lon: 74.8560 },
  { name: "बेलगावी (Belagavi)", nameHi: "बेलगावी", nameGu: "બેલગામ", nameEn: "Belagavi", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 15.8497, lon: 74.4977 },
  { name: "उडुपी (Udupi)", nameHi: "उडुपी", nameGu: "ઉડુપી", nameEn: "Udupi", state: "कर्नाटक (Karnataka)", stateHi: "कर्नाटक", stateGu: "કર્ણાટક", lat: 13.3409, lon: 74.7421 },

  // --- TAMIL NADU ---
  { name: "चेन्नई (Chennai)", nameHi: "चेन्नई", nameGu: "ચેન્નાઈ", nameEn: "Chennai", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 13.0827, lon: 80.2707, popular: true },
  { name: "कोयंबटूर (Coimbatore)", nameHi: "कोयंबटूर", nameGu: "કોયમ્બતુર", nameEn: "Coimbatore", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 11.0168, lon: 76.9558 },
  { name: "मदुरै (Madurai)", nameHi: "मदुरै", nameGu: "મદુરાઈ", nameEn: "Madurai", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 9.9252, lon: 78.1198, popular: true },
  { name: "तिरुचिरापल्ली (Tiruchirappalli)", nameHi: "तिरुचिरापल्ली", nameGu: "તિરુચિરાપલ્લી", nameEn: "Tiruchirappalli", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 10.7905, lon: 78.7047 },
  { name: "सेलम (Salem)", nameHi: "सेलम", nameGu: "સેલમ", nameEn: "Salem", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 11.6643, lon: 78.1460 },
  { name: "रामेश्वरम (Rameswaram)", nameHi: "रामेश्वरम", nameGu: "રામેશ્વરમ", nameEn: "Rameswaram", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 9.2876, lon: 79.3129, popular: true },
  { name: "कन्याकुमारी (Kanyakumari)", nameHi: "कन्याकुमारी", nameGu: "કન્યાકુમારી", nameEn: "Kanyakumari", state: "तमिलनाडु (Tamil Nadu)", stateHi: "तमिलनाडु", stateGu: "તમિલનાડુ", lat: 8.0883, lon: 77.5385 },

  // --- ANDHRA PRADESH & TELANGANA ---
  { name: "हैदराबाद (Hyderabad)", nameHi: "हैदराबाद", nameGu: "હૈદરાબાદ", nameEn: "Hyderabad", state: "तेलंगाना (Telangana)", stateHi: "तेलंगाना", stateGu: "તેલંગાણા", lat: 17.3850, lon: 78.4867, popular: true },
  { name: "विशाखापट्टनम (Visakhapatnam)", nameHi: "विशाखापट्टनम", nameGu: "વિશાખાપટ્ટનમ", nameEn: "Visakhapatnam", state: "आंध्र प्रदेश (Andhra Pradesh)", stateHi: "आंध्र प्रदेश", stateGu: "આંધ્ર પ્રદેશ", lat: 17.6868, lon: 83.2185, popular: true },
  { name: "विजयवाड़ा (Vijayawada)", nameHi: "विजयवाड़ा", nameGu: "વિજયવાડા", nameEn: "Vijayawada", state: "आंध्र प्रदेश (Andhra Pradesh)", stateHi: "आंध्र प्रदेश", stateGu: "આંધ્ર પ્રદેશ", lat: 16.5062, lon: 80.6480 },
  { name: "तिरुपति (Tirupati)", nameHi: "तिरुपति", nameGu: "તિરુપતિ", nameEn: "Tirupati", state: "आंध्र प्रदेश (Andhra Pradesh)", stateHi: "आंध्र प्रदेश", stateGu: "આંધ્ર પ્રદેશ", lat: 13.6288, lon: 79.4192, popular: true },
  { name: "गुंटूर (Guntur)", nameHi: "गुंटूर", nameGu: "ગુંટુર", nameEn: "Guntur", state: "आंध्र प्रदेश (Andhra Pradesh)", stateHi: "आंध्र प्रदेश", stateGu: "આંધ્ર પ્રદેશ", lat: 16.3067, lon: 80.4365 },
  { name: "वारंगल (Warangal)", nameHi: "वारंगल", nameGu: "વારંગલ", nameEn: "Warangal", state: "तेलंगाना (Telangana)", stateHi: "तेलंगाना", stateGu: "તેલંગાણા", lat: 17.9689, lon: 79.5941 },

  // --- KERALA ---
  { name: "तिरुवनंतपुरम (Thiruvananthapuram)", nameHi: "तिरुवनंतपुरम", nameGu: "તિરુવનંતપુરમ", nameEn: "Thiruvananthapuram", state: "केरल (Kerala)", stateHi: "केरल", stateGu: "કેરળ", lat: 8.5241, lon: 76.9366, popular: true },
  { name: "कोच्चि (Kochi / Cochin)", nameHi: "कोच्चि", nameGu: "કોચી", nameEn: "Kochi", state: "केरल (Kerala)", stateHi: "केरल", stateGu: "કેરળ", lat: 9.9312, lon: 76.2673, popular: true },
  { name: "कोझिकोड (Kozhikode / Calicut)", nameHi: "कोझिकोड", nameGu: "કોઝિકોડ", nameEn: "Kozhikode", state: "केरल (Kerala)", stateHi: "केरल", stateGu: "કેરળ", lat: 11.2588, lon: 75.7804 },
  { name: "त्रिशूर (Thrissur)", nameHi: "त्रिशूर", nameGu: "ત્રિશુર", nameEn: "Thrissur", state: "केरल (Kerala)", stateHi: "केरल", stateGu: "કેરળ", lat: 10.5276, lon: 76.2144 },

  // --- PUNJAB & HARYANA & CHANDIGARH ---
  { name: "चंडीगढ़ (Chandigarh)", nameHi: "चंडीगढ़", nameGu: "ચંદીગઢ", nameEn: "Chandigarh", state: "चंडीगढ़ (UT)", stateHi: "चंडीगढ़", stateGu: "ચંદીગઢ", lat: 30.7333, lon: 76.7794, popular: true },
  { name: "लुधियाना (Ludhiana)", nameHi: "लुधियाना", nameGu: "લુધિયાણા", nameEn: "Ludhiana", state: "पंजाब (Punjab)", stateHi: "पंजाब", stateGu: "પંજાબ", lat: 30.9010, lon: 75.8573, popular: true },
  { name: "अमृतसर (Amritsar - Golden Temple)", nameHi: "अमृतसर", nameGu: "અમૃતસર", nameEn: "Amritsar", state: "पंजाब (Punjab)", stateHi: "पंजाब", stateGu: "પંજાબ", lat: 31.6340, lon: 74.8723, popular: true },
  { name: "जालंधर (Jalandhar)", nameHi: "जालंधर", nameGu: "જાલંધર", nameEn: "Jalandhar", state: "पंजाब (Punjab)", stateHi: "पंजाब", stateGu: "પંજાબ", lat: 31.3260, lon: 75.5762 },
  { name: "पटियाला (Patiala)", nameHi: "पटियाला", nameGu: "પટિયાલા", nameEn: "Patiala", state: "पंजाब (Punjab)", stateHi: "पंजाब", stateGu: "પંજાબ", lat: 30.3398, lon: 76.3869 },
  { name: "बठिंडा (Bathinda)", nameHi: "बठिंडा", nameGu: "ભટિંડા", nameEn: "Bathinda", state: "पंजाब (Punjab)", stateHi: "पंजाब", stateGu: "પંજાબ", lat: 30.2110, lon: 74.9455 },
  { name: "अंबाला (Ambala)", nameHi: "अंबाला", nameGu: "અંબાલા", nameEn: "Ambala", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 30.3782, lon: 76.7767 },
  { name: "पानीपत (Panipat)", nameHi: "पानीपत", nameGu: "પાનીપત", nameEn: "Panipat", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 29.3909, lon: 76.9635 },
  { name: "करनाल (Karnal)", nameHi: "करनाल", nameGu: "કરનાલ", nameEn: "Karnal", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 29.6857, lon: 76.9905 },
  { name: "हिसार (Hisar)", nameHi: "हिसार", nameGu: "હિસાર", nameEn: "Hisar", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 29.1492, lon: 75.7217 },
  { name: "रोहतक (Rohtak)", nameHi: "रोहतक", nameGu: "રોહતક", nameEn: "Rohtak", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 28.8955, lon: 76.6066 },
  { name: "कुरुक्षेत्र (Kurukshetra)", nameHi: "कुरुक्षेत्र", nameGu: "કુરુક્ષેત્ર", nameEn: "Kurukshetra", state: "हरियाणा (Haryana)", stateHi: "हरियाणा", stateGu: "હરિયાણા", lat: 29.9695, lon: 76.8783 },

  // --- UTTARAKHAND & HIMACHAL PRADESH ---
  { name: "देहरादून (Dehradun)", nameHi: "देहरादून", nameGu: "દેહરાદૂન", nameEn: "Dehradun", state: "उत्तराखंड (Uttarakhand)", stateHi: "उत्तराखंड", stateGu: "ઉત્તરાખંડ", lat: 30.3165, lon: 78.0322, popular: true },
  { name: "हरिद्वार (Haridwar)", nameHi: "हरिद्वार", nameGu: "હરિદ્વાર", nameEn: "Haridwar", state: "उत्तराखंड (Uttarakhand)", stateHi: "उत्तराखंड", stateGu: "ઉત્તરાખંડ", lat: 29.9457, lon: 78.1642, popular: true },
  { name: "ऋषिकेश (Rishikesh)", nameHi: "ऋषिकेश", nameGu: "ઋષિકેશ", nameEn: "Rishikesh", state: "उत्तराखंड (Uttarakhand)", stateHi: "उत्तराखंड", stateGu: "ઉત્તરાખંડ", lat: 30.0869, lon: 78.2676, popular: true },
  { name: "नैनीताल (Nainital)", nameHi: "नैनीताल", nameGu: "નૈનિતાલ", nameEn: "Nainital", state: "उत्तराखंड (Uttarakhand)", stateHi: "उत्तराखंड", stateGu: "ઉત્તરાખંડ", lat: 29.3919, lon: 79.4542 },
  { name: "शिमला (Shimla)", nameHi: "शिमला", nameGu: "શિમલા", nameEn: "Shimla", state: "हिमाचल प्रदेश (Himachal Pradesh)", stateHi: "हिमाचल प्रदेश", stateGu: "હિમાચલ પ્રદેશ", lat: 31.1048, lon: 77.1734, popular: true },
  { name: "धर्मशाला (Dharamshala)", nameHi: "धर्मशाला", nameGu: "ધર્મશાલા", nameEn: "Dharamshala", state: "हिमाचल प्रदेश (Himachal Pradesh)", stateHi: "हिमाचल प्रदेश", stateGu: "હિમાચલ પ્રદેશ", lat: 32.2190, lon: 76.3234 },
  { name: "मनाली / कुल्लू (Manali / Kullu)", nameHi: "मनाली (कुल्लू)", nameGu: "મનાલી (કુલ્લુ)", nameEn: "Manali", state: "हिमाचल प्रदेश (Himachal Pradesh)", stateHi: "हिमाचल प्रदेश", stateGu: "હિમાચલ પ્રદેશ", lat: 32.2432, lon: 77.1892 },

  // --- ODISHA, JHARKHAND, CHHATTISGARH ---
  { name: "भुवनेश्वर (Bhubaneswar)", nameHi: "भुवनेश्वर", nameGu: "ભુવનેશ્વર", nameEn: "Bhubaneswar", state: "ओडिशा (Odisha)", stateHi: "ओडिशा", stateGu: "ઓડિશા", lat: 20.2961, lon: 85.8245, popular: true },
  { name: "पुरी (Puri - Jagannath)", nameHi: "पुरी", nameGu: "પુરી", nameEn: "Puri", state: "ओडिशा (Odisha)", stateHi: "ओडिशा", stateGu: "ઓડિશા", lat: 19.8135, lon: 85.8312, popular: true },
  { name: "कटक (Cuttack)", nameHi: "कटक", nameGu: "કટક", nameEn: "Cuttack", state: "ओडिशा (Odisha)", stateHi: "ओडिशा", stateGu: "ઓડિશા", lat: 20.4625, lon: 85.8828 },
  { name: "राउरकेला (Rourkela)", nameHi: "राउरकेला", nameGu: "રાઉરકેલા", nameEn: "Rourkela", state: "ओडिशा (Odisha)", stateHi: "ओडिशा", stateGu: "ઓડિશા", lat: 22.2604, lon: 84.8536 },
  { name: "रांची (Ranchi)", nameHi: "रांची", nameGu: "રાંચી", nameEn: "Ranchi", state: "झारखंड (Jharkhand)", stateHi: "झारखंड", stateGu: "ઝારખંડ", lat: 23.3441, lon: 85.3096, popular: true },
  { name: "जमशेदपुर (Jamshedpur)", nameHi: "जमशेदपुर", nameGu: "જમશેદપુર", nameEn: "Jamshedpur", state: "झारखंड (Jharkhand)", stateHi: "झारखंड", stateGu: "ઝારખંડ", lat: 22.8046, lon: 86.2029, popular: true },
  { name: "धनबाद (Dhanbad)", nameHi: "धनबाद", nameGu: "ધનબાદ", nameEn: "Dhanbad", state: "झारखंड (Jharkhand)", stateHi: "झारखंड", stateGu: "ઝારખંડ", lat: 23.7957, lon: 86.4304 },
  { name: "देवघर / बाबाधाम (Deoghar)", nameHi: "देवघर", nameGu: "દેવઘર", nameEn: "Deoghar", state: "झारखंड (Jharkhand)", stateHi: "झारखंड", stateGu: "ઝારખંડ", lat: 24.4826, lon: 86.6980 },
  { name: "रायपुर (Raipur)", nameHi: "रायपुर", nameGu: "રાયપુર", nameEn: "Raipur", state: "छत्तीसगढ़ (Chhattisgarh)", stateHi: "छत्तीसगढ़", stateGu: "છત્તીસગઢ", lat: 21.2514, lon: 81.6296, popular: true },
  { name: "बिलासपुर (Bilaspur)", nameHi: "बिलासपुर", nameGu: "બિલાસપુર", nameEn: "Bilaspur", state: "छत्तीसगढ़ (Chhattisgarh)", stateHi: "छत्तीसगढ़", stateGu: "છત્તીસગઢ", lat: 22.0797, lon: 82.1409 },
  { name: "दुर्ग-भिलाई (Durg-Bhilai)", nameHi: "दुर्ग-भिलाई", nameGu: "ભિલાઈ", nameEn: "Bhilai", state: "छत्तीसगढ़ (Chhattisgarh)", stateHi: "छत्तीसगढ़", stateGu: "છત્તીસગઢ", lat: 21.1938, lon: 81.3509 },

  // --- ASSAM & NORTH EAST ---
  { name: "गुवाहाटी / कामाख्या (Guwahati)", nameHi: "गुवाहाटी (कामाख्या)", nameGu: "ગુવાહાટી", nameEn: "Guwahati", state: "असम (Assam)", stateHi: "असम", stateGu: "અસમ", lat: 26.1445, lon: 91.7362, popular: true },
  { name: "डिब्रूगढ़ (Dibrugarh)", nameHi: "डिब्रूगढ़", nameGu: "દિબ્રુગઢ", nameEn: "Dibrugarh", state: "असम (Assam)", stateHi: "असम", stateGu: "અસમ", lat: 27.4728, lon: 94.9120 },
  { name: "सिलचर (Silchar)", nameHi: "सिलचर", nameGu: "સિલચર", nameEn: "Silchar", state: "असम (Assam)", stateHi: "असम", stateGu: "અસમ", lat: 24.8333, lon: 92.7789 },
  { name: "शिलांग (Shillong)", nameHi: "शिलांग", nameGu: "શિલોંગ", nameEn: "Shillong", state: "मेघालय (Meghalaya)", stateHi: "मेघालय", stateGu: "મેઘાલય", lat: 25.5788, lon: 91.8933 },
  { name: "अगरतला (Agartala)", nameHi: "अगरतला", nameGu: "અગરતલા", nameEn: "Agartala", state: "त्रिपुरा (Tripura)", stateHi: "त्रिपुरा", stateGu: "ત્રિપુરા", lat: 23.8315, lon: 91.2868 },
  { name: "गंगटोक (Gangtok)", nameHi: "गंगटोक", nameGu: "ગંગટોક", nameEn: "Gangtok", state: "सिक्किम (Sikkim)", stateHi: "सिक्किम", stateGu: "સિક્કિમ", lat: 27.3389, lon: 88.6065 },
  { name: "इंफाल (Imphal)", nameHi: "इंफाल", nameGu: "ઇમ્ફાલ", nameEn: "Imphal", state: "मणिपुर (Manipur)", stateHi: "मणिपुर", stateGu: "મણિપુર", lat: 24.8170, lon: 93.9368 },

  // --- JAMMU & KASHMIR, LADAKH, GOA ---
  { name: "जम्मू (Jammu - Vaishno Devi)", nameHi: "जम्मू", nameGu: "જમ્મુ", nameEn: "Jammu", state: "जम्मू और कश्मीर (J&K)", stateHi: "जम्मू और कश्मीर", stateGu: "જમ્મુ અને કાશ્મીર", lat: 32.7266, lon: 74.8570, popular: true },
  { name: "श्रीनगर (Srinagar)", nameHi: "श्रीनगर", nameGu: "શ્રીનગર", nameEn: "Srinagar", state: "जम्मू और कश्मीर (J&K)", stateHi: "जम्मू और कश्मीर", stateGu: "જમ્મુ અને કાશ્મીર", lat: 34.0837, lon: 74.7973, popular: true },
  { name: "लेह (Leh - Ladakh)", nameHi: "लेह", nameGu: "લેહ", nameEn: "Leh", state: "लद्दाख (Ladakh)", stateHi: "लद्दाख", stateGu: "લદ્દાખ", lat: 34.1526, lon: 77.5771 },
  { name: "पणजी (Panaji / Goa)", nameHi: "पणजी (गोवा)", nameGu: "પણજી (ગોવા)", nameEn: "Panaji", state: "गोवा (Goa)", stateHi: "गोवा", stateGu: "ગોવા", lat: 15.4909, lon: 73.8278, popular: true },
  { name: "मडगांव (Margao - Goa)", nameHi: "मडगांव", nameGu: "મડગાંવ", nameEn: "Margao", state: "गोवा (Goa)", stateHi: "गोवा", stateGu: "ગોવા", lat: 15.2832, lon: 73.9862 }
];

import { EXPANDED_TOWNS_AND_TEHSILS } from './expandedCitiesData';

export const INDIAN_CITIES_DATABASE: IndianCity[] = [
  ...BASE_INDIAN_CITIES,
  ...EXPANDED_TOWNS_AND_TEHSILS
];

export const INDIAN_STATES: string[] = [
  "गुजरात (Gujarat)",
  "राजस्थान (Rajasthan)",
  "महाराष्ट्र (Maharashtra)",
  "मध्य प्रदेश (Madhya Pradesh)",
  "उत्तर प्रदेश (Uttar Pradesh)",
  "दिल्ली (Delhi NCR)",
  "बिहार (Bihar)",
  "हरियाणा (Haryana)",
  "पंजाब (Punjab)",
  "उत्तराखंड (Uttarakhand)",
  "हिमाचल प्रदेश (Himachal Pradesh)",
  "कर्नाटक (Karnataka)",
  "पश्चिम बंगाल (West Bengal)",
  "तमिलनाडु (Tamil Nadu)",
  "तेलंगाना (Telangana)",
  "आंध्र प्रदेश (Andhra Pradesh)",
  "ओडिशा (Odisha)",
  "झारखंड (Jharkhand)",
  "छत्तीसगढ़ (Chhattisgarh)",
  "केरल (Kerala)",
  "असम (Assam)",
  "जम्मू और कश्मीर (J&K)",
  "गोवा (Goa)",
  "लद्दाख (Ladakh)",
  "चंडीगढ़ (Chandigarh)",
  "त्रिपुरा (Tripura)",
  "मेघालय (Meghalaya)",
  "मणिपुर (Manipur)",
  "नागालैंड (Nagaland)",
  "मिजोरम (Mizoram)",
  "अरुणाचल प्रदेश (Arunachal Pradesh)",
  "सिक्किम (Sikkim)",
  "पुडुचेरी (Puducherry)",
  "दादरा और नगर हवेली एवं दमन दीव (DNH & DD)",
  "अंडमान और निकोबार (Andaman & Nicobar)",
  "लक्षद्वीप (Lakshadweep)"
];
