import { DamageReport, MandiItem, WeatherAdvisory, FAQItem } from '../types';

export const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  'Madhya Pradesh (मध्य प्रदेश)': ['Indore', 'Ujjain', 'Dewas', 'Bhopal', 'Hoshangabad', 'Sehore', 'Vidisha', 'Khargone', 'Dhar'],
  'Uttar Pradesh (उत्तर प्रदेश)': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Aligarh', 'Bareilly', 'Moradabad', 'Gorakhpur'],
  'Punjab (पंजाब)': ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda', 'Sangrur', 'Firozpur', 'Moga', 'Hoshiarpur'],
  'Haryana (हरियाणा)': ['Karnal', 'Hisar', 'Rohtak', 'Sirsa', 'Kurukshetra', 'Ambala', 'Fatehabad', 'Jind', 'Sonipat'],
  'Rajasthan (राजस्थान)': ['Kota', 'Jaipur', 'Jodhpur', 'Bikaner', 'Sriganganagar', 'Alwar', 'Barmer', 'Hanumangarh', 'Nagaur'],
  'Maharashtra (महाराष्ट्र)': ['Latur', 'Nagpur', 'Nashik', 'Pune', 'Amravati', 'Akola', 'Yavatmal', 'Aurangabad', 'Kolhapur'],
  'Gujarat (गुजरात)': ['Rajkot', 'Ahmedabad', 'Surat', 'Junagadh', 'Bhavnagar', 'Banaskantha', 'Mehsana', 'Amreli'],
  'Bihar (बिहार)': ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Rohtas', 'Samastipur']
};

export const COMMON_CROPS = [
  { id: 'wheat', nameEn: 'Wheat (Gehun)', nameHi: 'गेहूं', season: 'Rabi' },
  { id: 'paddy', nameEn: 'Paddy / Rice (Dhan)', nameHi: 'धान (चावल)', season: 'Kharif' },
  { id: 'soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', season: 'Kharif' },
  { id: 'cotton', nameEn: 'Cotton (Kapas)', nameHi: 'कपास (नरमा)', season: 'Kharif' },
  { id: 'mustard', nameEn: 'Mustard (Sarson)', nameHi: 'सरसों / राई', season: 'Rabi' },
  { id: 'gram', nameEn: 'Gram / Chickpea (Chana)', nameHi: 'चना', season: 'Rabi' },
  { id: 'maize', nameEn: 'Maize (Makka)', nameHi: 'मक्का', season: 'Kharif' },
  { id: 'sugarcane', nameEn: 'Sugarcane (Ganna)', nameHi: 'गन्ना', season: 'Annual' },
  { id: 'onion', nameEn: 'Onion (Pyaaz)', nameHi: 'प्याज', season: 'Rabi/Kharif' },
  { id: 'potato', nameEn: 'Potato (Aaloo)', nameHi: 'आलू', season: 'Rabi' }
];

export const DAMAGE_CAUSES = [
  { id: 'hailstorm', nameEn: 'Hailstorm (Olavrishti)', nameHi: 'ओलावृष्टि' },
  { id: 'unseasonal_rain', nameEn: 'Unseasonal Rain / Waterlogging (Ativrishti)', nameHi: 'अतिवृष्टि / बेमौसम बारिश व जलभराव' },
  { id: 'drought', nameEn: 'Drought / Dry Spell (Sookha)', nameHi: 'सूखा व कम वर्षा' },
  { id: 'pest_attack', nameEn: 'Pest / Insect Infestation (Keet Prakop)', nameHi: 'कीट व टिड्डी प्रकोप' },
  { id: 'frost', nameEn: 'Severe Frost / Cold Wave (Paala)', nameHi: 'पाला व शीत लहर' },
  { id: 'cyclone_wind', nameEn: 'High Windstorm / Cyclone (Tez Aandhi)', nameHi: 'तेज आंधी व तूफान' },
  { id: 'wild_animals', nameEn: 'Wild Animal Destruction (Neelgai/Wild Boar)', nameHi: 'नीलगाय व जंगली जानवरों द्वारा नुकसान' }
];

export const INITIAL_MOCK_CLAIMS: DamageReport[] = [
  {
    id: 'FR-2024-8841',
    farmerId: 'FR-KISAN-9021',
    farmerName: 'Rameshwar Dayal Patidar (रामेश्वर दयाल पाटीदार)',
    mobile: '98260XXXXX',
    cropName: 'Wheat (गेहूं - Sharbati)',
    cropSeason: 'Rabi',
    sowingDate: '2024-11-10',
    damageDate: '2025-02-14',
    causeOfDamage: 'Hailstorm (ओलावृष्टि)',
    estimatedDamagePercent: 85,
    affectedAreaAcres: 3.5,
    totalAreaAcres: 4.0,
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    photoName: 'wheat_field_hail_damage_geo.jpg',
    location: {
      village: 'Sanwer (सांवेर)',
      district: 'Indore',
      state: 'Madhya Pradesh (मध्य प्रदेश)',
      latitude: 22.9734,
      longitude: 75.8267
    },
    notes: 'Severe hailstorm with golf-ball sized hailstones destroyed standing ripe wheat ears completely.',
    status: 'DBT_TRANSFERRED',
    submissionDate: '2025-02-15',
    estimatedCompensation: 58450,
    surveyorAssigned: {
      name: 'Shri Vikram Singh Chouhan',
      designation: 'Block Agriculture Officer & PMFBY Inspector',
      phone: '+91 94250 12345',
      inspectionDate: '2025-02-17',
      surveyReport: 'Joint crop-cutting experiment verified 82% terminal ear-head destruction due to intense hailstorm.'
    },
    dbtDetails: {
      utrNumber: 'SBI982400192837',
      amountPaid: 58450,
      transferDate: '2025-02-24',
      bankName: 'State Bank of India (A/c ending 4819)'
    }
  },
  {
    id: 'FR-2024-5219',
    farmerId: 'FR-KISAN-4412',
    farmerName: 'Gurpreet Singh Dhillon (गुरप्रीत सिंह ढिल्लों)',
    mobile: '98140XXXXX',
    cropName: 'Paddy / Basmati (धान 1121)',
    cropSeason: 'Kharif',
    sowingDate: '2024-06-25',
    damageDate: '2024-09-18',
    causeOfDamage: 'Unseasonal Rain / Waterlogging (अतिवृष्टि व जलभराव)',
    estimatedDamagePercent: 65,
    affectedAreaAcres: 5.0,
    totalAreaAcres: 6.5,
    photoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    photoName: 'waterlogged_paddy_survey.jpg',
    location: {
      village: 'Samrala (समराला)',
      district: 'Ludhiana',
      state: 'Punjab (पंजाब)',
      latitude: 30.8385,
      longitude: 76.1911
    },
    notes: 'Excessive 210mm rainfall within 36 hours submerged field for 6 straight days leading to root rot.',
    status: 'INSPECTION_COMPLETED',
    submissionDate: '2024-09-20',
    estimatedCompensation: 62500,
    surveyorAssigned: {
      name: 'Smt. Manpreet Kaur Gill',
      designation: 'Patwari & Agricultural Field Investigator',
      phone: '+91 98765 67890',
      inspectionDate: '2024-09-23',
      surveyReport: 'Field submerged in 2.5 feet standing flood water. 65% crop lodging and grain discoloration recorded.'
    }
  },
  {
    id: 'FR-2024-3102',
    farmerId: 'FR-KISAN-7820',
    farmerName: 'Balasaheb Tukaram Shinde (बालासाहेब तुकाराम शिंदे)',
    mobile: '94220XXXXX',
    cropName: 'Cotton (कपास)',
    cropSeason: 'Kharif',
    sowingDate: '2024-06-15',
    damageDate: '2024-10-02',
    causeOfDamage: 'Pest Attack (गुलाबी बोंड अळी - Pink Bollworm)',
    estimatedDamagePercent: 50,
    affectedAreaAcres: 2.8,
    totalAreaAcres: 3.0,
    photoUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    photoName: 'cotton_boll_infestation.jpg',
    location: {
      village: 'Ausa (औसा)',
      district: 'Latur',
      state: 'Maharashtra (महाराष्ट्र)',
      latitude: 18.2524,
      longitude: 76.5042
    },
    notes: 'Widespread boll shedding and internal lint damage due to severe pink bollworm outbreak despite recommended spray.',
    status: 'SURVEY_SCHEDULED',
    submissionDate: '2024-10-03',
    estimatedCompensation: 38200,
    surveyorAssigned: {
      name: 'Dr. Nitin Deshmukh',
      designation: 'District Agriculture Field Surveyor',
      phone: '+91 98224 55443',
      inspectionDate: '2024-10-06'
    }
  },
  {
    id: 'FR-2024-1049',
    farmerId: 'FR-KISAN-1193',
    farmerName: 'Kailash Chand Meena (कैलाश चंद मीणा)',
    mobile: '94140XXXXX',
    cropName: 'Mustard (सरसों)',
    cropSeason: 'Rabi',
    sowingDate: '2024-10-20',
    damageDate: '2025-01-08',
    causeOfDamage: 'Severe Frost (पाला व तीव्र शीत लहर)',
    estimatedDamagePercent: 40,
    affectedAreaAcres: 4.0,
    totalAreaAcres: 4.0,
    photoUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    photoName: 'mustard_frost_loss.jpg',
    location: {
      village: 'Ramganj Mandi (रामगंज मंडी)',
      district: 'Kota',
      state: 'Rajasthan (राजस्थान)',
      latitude: 24.6517,
      longitude: 75.9467
    },
    notes: 'Freezing temperature dropping to 1.5°C caused blossom drop and empty pods across the farm plot.',
    status: 'DOCS_VERIFIED',
    submissionDate: '2025-01-09',
    estimatedCompensation: 29600
  }
];

export const MOCK_MANDI_RATES: MandiItem[] = [
  {
    commodity: 'Wheat (गेहूं - Sharbati)',
    variety: 'Sharbati / Lokwan',
    mandi: 'Indore Mandi (छावनी)',
    state: 'Madhya Pradesh',
    minPrice: 2650,
    maxPrice: 3220,
    modalPrice: 2980,
    priceChange: +45,
    arrivalTonnes: 1240,
    updatedAt: 'Today, 11:30 AM'
  },
  {
    commodity: 'Soybean (सोयाबीन - Yellow)',
    variety: 'JS-9560',
    mandi: 'Ujjain Mandi',
    state: 'Madhya Pradesh',
    minPrice: 4400,
    maxPrice: 4890,
    modalPrice: 4680,
    priceChange: +60,
    arrivalTonnes: 850,
    updatedAt: 'Today, 12:15 PM'
  },
  {
    commodity: 'Basmati Paddy (धान 1121)',
    variety: 'PB-1121 Sugandhit',
    mandi: 'Khanna Mandi (Asia Largest)',
    state: 'Punjab',
    minPrice: 3450,
    maxPrice: 4120,
    modalPrice: 3890,
    priceChange: -20,
    arrivalTonnes: 3400,
    updatedAt: 'Today, 10:45 AM'
  },
  {
    commodity: 'Mustard (सरसों / राई)',
    variety: 'Black Bold 42% Oil',
    mandi: 'Kota Mandi',
    state: 'Rajasthan',
    minPrice: 5350,
    maxPrice: 5920,
    modalPrice: 5680,
    priceChange: +110,
    arrivalTonnes: 620,
    updatedAt: 'Today, 01:00 PM'
  },
  {
    commodity: 'Cotton (कपास - Medium Staple)',
    variety: 'Bt Cotton Long Staple',
    mandi: 'Latur APMC',
    state: 'Maharashtra',
    minPrice: 6900,
    maxPrice: 7550,
    modalPrice: 7280,
    priceChange: +80,
    arrivalTonnes: 490,
    updatedAt: 'Today, 12:45 PM'
  },
  {
    commodity: 'Gram / Chickpea (चना काबुली/देसी)',
    variety: 'Desi Chana Bold',
    mandi: 'Hapur Mandi',
    state: 'Uttar Pradesh',
    minPrice: 5750,
    maxPrice: 6300,
    modalPrice: 6050,
    priceChange: -15,
    arrivalTonnes: 310,
    updatedAt: 'Today, 01:20 PM'
  }
];

export const MOCK_WEATHER_ADVISORY: WeatherAdvisory = {
  temperature: 28,
  condition: 'Partly Cloudy with Scattered Showers Expected',
  humidity: 74,
  rainfallProbability: 65,
  windSpeed: 18,
  alertType: 'HAILSTORM',
  advisoryTextEn: 'Advisory: Strong gusty winds (35-45 kmph) and localized hailstorm likely within 48 hours across North & Central India. Postpone fertilizer broadcasting and pesticide spraying on standing crops. Ensure drainage channels are clear in low-lying fields.',
  advisoryTextHi: 'मौसम चेतावनी: अगले 48 घंटों में उत्तर व मध्य भारत में 35-45 किमी/घंटा की हवाओं व ओलावृष्टि की संभावना है। खड़ी फसलों पर कीटनाशक व उर्वरक का छिड़काव तुरंत रोकें। निचले खेतों में जल निकासी के रास्ते खोलकर रखें।'
};

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'claim',
    questionEn: 'Within how many hours must I report crop damage after a natural calamity?',
    questionHi: 'प्राकृतिक आपदा के कितने घंटे के भीतर फसल नुकसान की सूचना देनी अनिवार्य है?',
    answerEn: 'As per PMFBY guidelines, intimation of localized calamity (hailstorm, cloudburst, landslide, inundation, pest outbreak) must be submitted within 72 hours of the occurrence along with geo-tagged photos.',
    answerHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY) के नियमानुसार किसी भी प्राकृतिक आपदा (ओलावृष्टि, जलभराव, बादल फटना, कीट प्रकोप) के 72 घंटे के भीतर पोर्टल या टोल फ्री नंबर पर सूचना देना अनिवार्य है।'
  },
  {
    id: 'faq-2',
    category: 'eligibility',
    questionEn: 'Do both loanee (KCC) and non-loanee farmers qualify for claim compensation?',
    questionHi: 'क्या केसीसी (KCC) ऋण लेने वाले और बिना ऋण वाले दोनों किसान पात्र हैं?',
    answerEn: 'Yes! Both loanee farmers (holding Kisan Credit Cards) and non-loanee farmers who have enrolled under PMFBY are 100% eligible for insurance claim settlements.',
    answerHi: 'हाँ! केसीसी (Kisan Credit Card) धारक ऋणी किसान और गैर-ऋणी किसान दोनों, जिन्होंने बीमा कराया है, समान रूप से पूरे मुआवजे के हकदार हैं।'
  },
  {
    id: 'faq-3',
    category: 'dbt',
    questionEn: 'How is the claim compensation money paid to the farmer?',
    questionHi: 'स्वीकृत दावे का मुआबजा किसान को किस प्रकार प्राप्त होता है?',
    answerEn: 'The approved claim compensation is directly transferred to your Aadhaar-linked bank account through the Direct Benefit Transfer (DBT) mechanism, ensuring zero middlemen and zero commission deductions.',
    answerHi: 'स्वीकृत बीमा राशि सीधे आपके आधार लिंक बैंक खाते में डीबीटी (Direct Benefit Transfer) के जरिए भेजी जाती है, जिसमें किसी बिचौलिए या कमीशन की कोई गुंजाइश नहीं होती।'
  },
  {
    id: 'faq-4',
    category: 'scheme',
    questionEn: 'What documents are required to complete the claim assessment during surveyor visit?',
    questionHi: 'सर्वेयर / पटवारी के खेत निरीक्षण के समय कौन से दस्तावेज दिखाना आवश्यक है?',
    answerEn: 'Keep ready: 1) Khasra/Khatauni land record passbook, 2) Aadhaar card, 3) Bank passbook showing IFSC & Account No., and 4) Sowing certificate / Girdawari issued by the Patwari.',
    answerHi: 'निरीक्षण के समय अपने पास: 1) खसरा/खतौनी नकल, 2) आधार कार्ड, 3) बैंक पासबुक (जिसमें IFSC कोड स्पष्ट हो), तथा 4) पटवारी द्वारा जारी बुवाई प्रमाणीकरण / गिरदावरी की प्रति तैयार रखें।'
  }
];

export const MOCK_AI_RESPONSES: Record<string, { en: string; hi: string }> = {
  pmfby: {
    en: 'Under PMFBY, premium rates for farmers are highly subsidized: only 2% for Kharif crops, 1.5% for Rabi food & oilseeds, and 5% for commercial/horticultural crops. The rest is subsidized by Central & State governments.',
    hi: 'पीएम फसल बीमा योजना (PMFBY) में किसानों के लिए प्रीमियम बेहद कम है: खरीफ फसलों पर केवल 2%, रबी फसलों पर 1.5% और वाणिज्यिक/बागवानी फसलों पर 5%। बाकी सारा प्रीमियम सरकार वहन करती है।'
  },
  timeline: {
    en: 'Typical settlement timeline: 1) Damage report within 72 hrs, 2) Joint field survey within 48 hrs of intimation, 3) Report submission within 10 days, 4) DBT settlement into bank within 3 weeks.',
    hi: 'मुआवजा निपटान की समय-सीमा: 1) 72 घंटे में नुकसान की सूचना, 2) सूचना के 48 घंटे में संयुक्त खेत सर्वे, 3) 10 दिन में रिपोर्ट अंतिम रूप, 4) 3 सप्ताह के भीतर बैंक खाते में डीबीटी भुगतान।'
  },
  surveyor: {
    en: 'If the surveyor has not visited within 48 hours of reporting, you can escalate instantly via Kisan Call Centre (1800-180-1551) quoting your Claim ID or contact your District Agriculture Officer.',
    hi: 'यदि सूचना के 48 घंटे में सर्वेयर नहीं पहुंचता, तो आप अपने दावा आईडी के साथ किसान कॉल सेंटर (1800-180-1551) पर त्वरित शिकायत दर्ज करा सकते हैं।'
  },
  msp: {
    en: 'MSP (Minimum Support Price) for Rabi 2024-25: Wheat is ₹2,275/quintal, Mustard is ₹5,650/quintal, Gram (Chana) is ₹5,440/quintal. Ensure your crop meets FAQ moisture standards before taking it to government purchase centers.',
    hi: 'रबी विपणन सीजन 2024-25 हेतु न्यूनतम समर्थन मूल्य (MSP): गेहूं ₹2,275/क्विंटल, सरसों ₹5,650/क्विंटल, चना ₹5,440/क्विंटल। सरकारी खरीद केंद्र ले जाने से पूर्व नमी मानकों की जांच अवश्य करें।'
  }
};
