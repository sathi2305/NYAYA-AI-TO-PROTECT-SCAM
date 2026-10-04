import {
  LanguageCode,
  LanguageOption,
  ScamSample,
  QuizQuestion,
  ThreatCity,
  InAppNotification,
  ConnectedShieldConfig,
  ShieldInterceptedEvent,
  OmnichannelPreset,
} from '../types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hinglish', label: 'Hinglish', native: 'Hinglish' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

export const SCAM_SAMPLES: ScamSample[] = [
  {
    id: 'sample-reel-deepfake',
    title: 'Priya\'s Case: Finfluencer Reel "SEBI Approved Double in 5 Days"',
    sender: 'Forwarded by Priya (Lucknow)',
    senderRole: 'First-time investor, age 22',
    forwardTag: 'Forwarded many times',
    type: 'reel',
    content: '🚨 SPECIAL SEBI-APPROVED WEALTH SCHEME: Top Finfluencer says: "Put ₹5,000 today in VIP Pre-IPO allocation and get guaranteed ₹15,000 return in 5 days! Approved under circular SEBI/HO/MIRSD/2024. Tap link to join Telegram VIP group before 20 seats finish."',
    riskLevel: 'RED',
    riskScore: 92,
    deepfakeScore: 87,
    reasons: [
      'SEBI Strictly Prohibits Guaranteed Returns: Under SEBI (Investment Advisers) Regulations, no registered entity can offer guaranteed profits.',
      'Audio Spectrogram Voice-Clone Detected: Voice analysis reveals synthetic pitch variance (87% probability of AI deepfake audio cloning).',
      'Unregistered Telegram VIP Funnel: Known phishing funnel redirecting users to fake UPI gateway without SEBI registration number.'
    ],
    sebiReference: 'SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158 & Press Release PR No. 27/2024 on Unregistered Finfluencers',
    dadiAdvice: {
      hi: 'ये बहुत बड़ा धोखा है बेटा! कोई भी असली सरकारी स्कीम 5 दिन में पैसे डबल नहीं करती। वीडियो में आवाज नकली AI से बनाई गई है। एक भी रुपया मत भेजना!',
      hinglish: 'Ye 100% fraud hai beta! Koi bhi SEBI registered institution 5 din me paisa double ka guarantee nahi deta. Voice clone hai, link mat kholo.',
      en: 'This is a dangerous scam! SEBI strictly forbids guaranteed returns. The video audio has an 87% likelihood of being an AI deepfake clone. Do not transfer funds.',
      ta: 'இது மோசடி கண்ணா! 5 நாட்களில் பணத்தை இரட்டிப்பாக்க எந்த சட்டப்பூர்வ திட்டமும் இல்லை. இந்த வீடியோ குரல் போலியானது.',
      mr: 'हे शुद्ध फसवणूक आहे बाळा! ५ दिवसांत पैसे दुप्पट करण्याची कोणतीही खरी योजना नसते. हा व्हिडिओ AI ने तयार केलेला खोटा आहे.',
      bn: 'এটা সম্পূর্ণ প্রতারণা বাছা! ৫ দিনে টাকা দ্বিগুণ করার কোনো সরকারি অনুমোদন নেই। অডিওটি এআই দিয়ে তৈরি নকল।',
      te: 'ఇది మోసం బాబూ! 5 రోజుల్లో డబ్బులు డబుల్ అవుతాయని చెప్పేది అంతా అబద్ధం. వెంటనే ఈ మెసేజ్ డిలీట్ చేయండి.',
      gu: 'આ ચોખ્ખી છેતરપિંડી છે બેટા! ૫ દિવસમાં પૈસા ડબલ થવાની કોઈ સ્કીમ હોતી નથી. વિડીયોમાં અવાજ નકલી છે.'
    }
  },
  {
    id: 'sample-nsdl-pdf',
    title: 'Ramesh Uncle\'s Case: Fake NSDL Official Letterhead PDF',
    sender: 'Forwarded by Ramesh (Nashik)',
    senderRole: 'Retired school teacher, age 52',
    forwardTag: 'Forwarded from Telegram group',
    type: 'pdf',
    content: '📄 Official-Notice-NSDL-Bonus-Allotment.pdf\n"NATIONAL SECURITIES DEPOSITORY LIMITED — URGENT NOTICE: Your Demat Account ending in 4821 has been allotted 500 bonus shares of Tata Tech worth ₹4,85,000. Deposit ₹12,500 security stamp duty immediately to clearing account at https://nsdI-portal.org.in or shares will be forfeited within 24 hours."',
    riskLevel: 'RED',
    riskScore: 96,
    deepfakeScore: 0,
    reasons: [
      'Domain Typosquatting (nsdI vs NSDL): Scammer URL uses lowercase "I" (nsdI) instead of capital L to impersonate legitimate NSDL repository.',
      'Fake Demat Allotment Fee: Legitimate depositories (NSDL/CDSL) NEVER ask for direct stamp duty transfers into private bank accounts.',
      'Manufactured Urgency: False 24-hour forfeiture timer designed to trigger panic before the investor can verify with their broker.'
    ],
    sebiReference: 'NSDL Advisory: Caution Against Fake Allotment Notices Demanding Advance Stamp Duty Fees (Ref: NSDL/POLICY/2024/0041)',
    dadiAdvice: {
      hi: 'रमेश भाई, ये चिट्ठी पूरी फर्जी है! NSDL कभी भी अलग से ₹12,500 स्टैम्प ड्यूटी नहीं मांगता। वेबसाइट का नाम भी गलत (nsdI) लिखा है। तुरंत इसे ब्लॉक करें!',
      hinglish: 'Ramesh ji, ye fake NSDL letter hai! NSDL kabhi kisi se private account me advance fee nahi mangta. Typosquat domain hai, delete karein.',
      en: 'Uncle Ramesh, this PDF notice is 100% counterfeit. Real depositories never collect stamp duty via private links. Notice the misspelled domain name.',
      ta: 'ரமேஷ் அவர்களே, இது போலி கடிதம்! NSDL ஒருபோதும் தனி கணக்கிற்கு பணம் செலுத்த கேட்காது. இணைப்பை திறக்காதீர்கள்.',
      mr: 'रमेश काका, हे खोटे पत्र आहे! NSDL कधीही वेगळे पैसे मागत नाही. वेबसाईटचे स्पेलिंग चुकीचे आहे, फसू नका.',
      bn: 'রমেশ বাবু, এই চিঠিটি ভুয়ো! NSDL কখনো আলাদা করে স্ট্যাম্প ডিউটির টাকা চায় না। ওয়েবসাইটের নামও ভুল লেখা আছে।',
      te: 'రమేష్ గారు, ఇది నకిలీ డాక్యుమెంట్! NSDL ఎప్పుడూ ఇలా విడిగా ఫీజు అడగదు. లింక్ ఓపెన్ చేయొద్దు.',
      gu: 'રમેશ કાકા, આ પત્ર ખોટો છે! NSDL ક્યારેય એડવાન્સ સ્ટેમ્પ ડ્યુટી માંગતું નથી. કોઈ પણ લિંક પર ક્લિક ન કરશો.'
    }
  },
  {
    id: 'sample-typosquat-link',
    title: 'Phishing Alert: "Tata Power 25% Guaranteed Dividend Portal"',
    sender: 'Forwarded via SMS / WhatsApp Blast',
    senderRole: 'Unknown bulk sender',
    forwardTag: 'Forwarded',
    type: 'link',
    content: '🔗 https://tatapower-shareholders-bonus.online/claim?id=9821\n"Congratulations! As an Indian equity holder, you are eligible for 25% special diwali bonus dividend. Login with your PAN and demat OTP to claim ₹18,400 directly into your bank within 2 hours."',
    riskLevel: 'RED',
    riskScore: 98,
    reasons: [
      'Credential Harvesting Phishing: Demands PAN card and Demat OTP — clear sign of account takeover trap.',
      'Suspicious Domain Registration: Domain was registered only 4 days ago on an untrusted overseas registrar.',
      'SEBI Warning: Dividends are credited automatically via ECS to linked bank accounts, never via external OTP links.'
    ],
    sebiReference: 'Cyber Crime Alert 2024-CC-882: Phishing Links Demanding Demat OTP for Dividend Claims',
    dadiAdvice: {
      hi: 'खबरदार बेटा! डिविडेंड सीधे आपके बैंक खाते में आता है, कभी OTP नहीं मांगता। ये लिंक आपका डीमैट खाता खाली करने के लिए है!',
      hinglish: 'Khabardaar! Dividend seedhe bank me aata hai, koi bhi OTP nahi mangta. Apna OTP aur PAN kisi ko mat do!',
      en: 'Danger! Dividends are credited directly to your bank account automatically. Legitimate companies NEVER ask for Demat OTP to claim dividends.',
      ta: 'எச்சரிக்கை! டிவிடெண்ட் உங்கள் வங்கிக் கணக்கில் நேரடியாக வரும். ஒருபோதும் ஓடிபி கேட்காது.',
      mr: 'सावधान! लाभांश थेट तुमच्या बँकेत जमा होतो, OTP ची कधीच गरज नसते. ही लिंक त्वरित हटवा.',
      bn: 'সাবধান! ডিভিডেন্ড সরাসরি ব্যাংকে জমা হয়, কখনো ওটিপি চায় না। নিজের ওটিপি কাউকে দেবেন না।',
      te: 'జాగ్రత్త! డివిడెండ్ నేరుగా బ్యాంక్ ఖాతాలోకే వస్తుంది, ఎప్పుడూ OTP అడగరు. ఎవరికీ వివరాలు ఇవ్వకండి.',
      gu: 'સાવધાન! ડિવિડન્ડ સીધું બેંકમાં આવે છે, ક્યારેય OTP માંગતું નથી. OTP કોઈને શેર ન કરશો.'
    }
  },
  {
    id: 'sample-genuine-broker',
    title: 'Legitimate Message: Monthly Demat Holding Statement from CDSL',
    sender: 'CDSL Official (SMS Sender: VK-CDSL)',
    senderRole: 'Depository Service',
    forwardTag: 'Direct System Notice',
    type: 'message',
    content: 'Dear Investor, Your monthly holding statement for Demat a/c ***8912 as of 30-Sep-2024 has been sent to your registered email. Check your CDSL easi/easiest portal directly at https://www.cdslindia.com for details. CDSL will never ask for your password or OTP.',
    riskLevel: 'GREEN',
    riskScore: 6,
    reasons: [
      'Official Depository Domain: The link points strictly to the genuine, verified https://www.cdslindia.com.',
      'Zero Demand for Money or OTP: The statement explicitly states that CDSL never solicits passwords or OTPs.',
      'Compliant Investor Disclosure: Follows SEBI monthly depository statement format guidelines.'
    ],
    sebiReference: 'CDSL Operating Guidelines Chapter 4 — Investor Communication & Safe Practices',
    dadiAdvice: {
      hi: 'ये मैसेज सुरक्षित है बेटा। ये आपके डीमैट खाते का आधिकारिक मासिक विवरण है। इसमें कोई पैसा या OTP नहीं मांगा गया है।',
      hinglish: 'Ye message bilkul safe hai. CDSL ka official monthly statement hai, koi fraud nahi hai.',
      en: 'This communication is verified and authentic. It is a standard regulatory holding statement from CDSL.',
      ta: 'இந்த செய்தி பாதுகாப்பானது. இது உங்கள் அதிகாரப்பூர்வ CDSL அறிக்கை.',
      mr: 'हा संदेश सुरक्षित आहे. हे तुमच्या डीमॅट खात्याचे अधिकृत मासिक विवरण आहे.',
      bn: 'এই মেসেজটি নিরাপদ। এটি আপনার ডিমেট অ্যাকাউন্টের আনুষ্ঠানিক মাসিক বিবরণী।',
      te: 'ఈ మెసేజ్ సురక్షితమైనది. ఇది మీ డిమ్యాట్ ఖాతా అధికారిక స్టేట్‌మెంట్.',
      gu: 'આ મેસેજ સાચો અને સુરક્ષિત છે. આ CDSL તરફથી નિયમિત સ્ટેટમેન્ટ છે.'
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'You receive a WhatsApp message from "SEBI Officer Sharma" saying: "Send ₹2,500 verification fee via Google Pay to unlock your dormant shares in 2 hours."',
    senderContext: 'WhatsApp message with official-looking blue shield logo',
    options: [
      { id: 'a', text: 'Pay immediately before the 2-hour deadline passes.', isCorrect: false },
      { id: 'b', text: 'Block the sender immediately. SEBI officers never contact individuals on WhatsApp or ask for UPI payments.', isCorrect: true },
      { id: 'c', text: 'Ask them to give a 50% discount on the fee.', isCorrect: false }
    ],
    explanation: 'SEBI is a regulatory body and NEVER contacts investors directly on WhatsApp, nor does it collect fees through personal UPI IDs or Google Pay.',
    dadiProverb: 'सरकारी अफसर कभी व्हाट्सऐप पर पैसे नहीं मांगते बेटा!'
  },
  {
    id: 2,
    scenario: 'A popular Instagram influencer posted a Reel claiming: "Invest ₹10,000 in this penny stock today, 100% guaranteed 4X profit in 15 days, no risk!"',
    senderContext: 'Reel with luxury cars and trading graphs in background',
    options: [
      { id: 'a', text: 'SEBI strictly bans guaranteed returns in equity markets. This is a classic pump-and-dump trap.', isCorrect: true },
      { id: 'b', text: 'Invest right away because the influencer has 500k followers.', isCorrect: false },
      { id: 'c', text: 'Forward the reel to 10 friends to get early allotment.', isCorrect: false }
    ],
    explanation: 'Stock markets carry market risk. Anyone promising guaranteed profits is breaking SEBI regulations and attempting to inflate prices before dumping.',
    dadiProverb: 'शेयर बाज़ार में जो गारंटी दे, समझो वही सबसे बड़ा ठग है!'
  },
  {
    id: 3,
    scenario: 'You get a text message with a link to "claim your ₹7,500 dividend" by entering your PAN and Demat account OTP on an unknown webpage.',
    senderContext: 'SMS from an unknown 10-digit mobile number',
    options: [
      { id: 'a', text: 'Fill in the OTP to quickly receive the credited dividend.', isCorrect: false },
      { id: 'b', text: 'Dividends are credited automatically to your linked bank account via ECS. Never share your Demat OTP!', isCorrect: true },
      { id: 'c', text: 'Call the mobile number and provide bank details over phone.', isCorrect: false }
    ],
    explanation: 'Dividends are deposited directly into your bank account. No company or depository requires an OTP to pay you money!',
    dadiProverb: 'पैसे आने के लिए कभी OTP नहीं देना पड़ता, OTP सिर्फ पैसे जाने के लिए होता है!'
  },
  {
    id: 4,
    scenario: 'Your father received a link "http://nsdI-investor-verification.cc" asking to update his KYC before 5 PM to avoid Demat freeze.',
    senderContext: 'Urgent WhatsApp forward with a PDF attachment',
    options: [
      { id: 'a', text: 'Notice the typosquatting domain (lowercase "I" instead of "L", .cc domain). Report to NYAYA and delete.', isCorrect: true },
      { id: 'b', text: 'Enter Aadhaar and PAN immediately to protect the account.', isCorrect: false },
      { id: 'c', text: 'Forward to other family members.', isCorrect: false }
    ],
    explanation: 'Scammers use typosquatting domains (like nsdI instead of NSDL) to steal credentials. Official KYC is done only through registered brokers or KRA portals.',
    dadiProverb: 'स्पेलिंग में एक अक्षर का फर्क और लाखों का नुकसान!'
  }
];

export const THREAT_CITIES: ThreatCity[] = [
  {
    city: 'Nashik',
    state: 'Maharashtra',
    tier: 'Tier-2',
    activeScamsDetected: 142,
    commonPattern: 'Fake NSDL stamp duty letters & Telegram VIP groups',
    riskStatus: 'Critical',
    lat: 19.9975,
    lng: 73.7898
  },
  {
    city: 'Indore',
    state: 'Madhya Pradesh',
    tier: 'Tier-2',
    activeScamsDetected: 189,
    commonPattern: 'Unregistered advisory stock tips & 300% profit promises',
    riskStatus: 'Critical',
    lat: 22.7196,
    lng: 75.8577
  },
  {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    tier: 'Tier-2',
    activeScamsDetected: 114,
    commonPattern: 'Fake Pre-IPO allocation forms in regional Tamil dialect',
    riskStatus: 'Elevated',
    lat: 11.0168,
    lng: 76.9558
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    tier: 'Tier-2',
    activeScamsDetected: 231,
    commonPattern: 'Deepfake finfluencer Instagram reels & task-based scams',
    riskStatus: 'Critical',
    lat: 26.8467,
    lng: 80.9462
  },
  {
    city: 'Nagpur',
    state: 'Maharashtra',
    tier: 'Tier-2',
    activeScamsDetected: 167,
    commonPattern: '2-din me paisa double Telegram schemes',
    riskStatus: 'Critical',
    lat: 21.1458,
    lng: 79.0882
  },
  {
    city: 'Madurai',
    state: 'Tamil Nadu',
    tier: 'Tier-2',
    activeScamsDetected: 88,
    commonPattern: 'Fake bonus allotment SMS targeting elderly pension accounts',
    riskStatus: 'Elevated',
    lat: 9.9252,
    lng: 78.1198
  },
  {
    city: 'Rajkot',
    state: 'Gujarat',
    tier: 'Tier-2',
    activeScamsDetected: 125,
    commonPattern: 'Dabba trading apps & unauthorized demat mirroring',
    riskStatus: 'Elevated',
    lat: 22.3039,
    lng: 70.8022
  }
];

export const PERSONAS = [
  {
    name: 'Ramesh, 52',
    city: 'Nashik, Maharashtra',
    role: 'Retired School Teacher • Mathematics',
    imageKey: 'persona_ramesh_teacher',
    story: 'Received a WhatsApp forward promising "NSDL approved 300% return bonus shares" requiring ₹12,500 advance fee.',
    vulnerability: 'Demat account opened during Covid. Values official-sounding letters and government seals, vulnerable to PDF letterhead fraud.',
    nyayaIntervention: 'NYAYA detected typosquat "nsdI" in 2.8s. Hindi voice note spoke: "Ramesh ji, NSDL kabhi advance paisa nahi mangta, ye fraud hai."',
    quote: '"If NYAYA had not spoken in my language, I would have sent my month\'s pension."'
  },
  {
    name: 'Priya, 22',
    city: 'Lucknow, Uttar Pradesh',
    role: 'Young Entrepreneur • Chikankari Crafts',
    imageKey: 'persona_priya_entrepreneur',
    story: 'Follows Instagram finfluencers. Saw a sponsored Reel promising 5-day double scheme with what seemed like a trusted voice.',
    vulnerability: 'First-generation equity investor. Trusts short-form video endorsements and lifestyle finfluencers on Instagram Reels.',
    nyayaIntervention: 'NYAYA Suraksha Lens ran audio spectrogram check, flagged 87% voice-clone probability, and highlighted SEBI ban on guaranteed returns.',
    quote: '"I forwarded the Reel to NYAYA WhatsApp. In 3 seconds it warned me with SEBI rules."'
  },
  {
    name: 'Suresh, 65',
    city: 'Coimbatore, Tamil Nadu',
    role: 'Retired Farmer & Grandfather',
    imageKey: 'persona_suresh_elder',
    story: 'Holds shares inherited from physical certificates. Struggles with 40-page English disclosure PDFs and online nominee addition forms.',
    vulnerability: 'Non-English speaker on an affordable JioPhone. Relies on local agents who often demand commissions.',
    nyayaIntervention: 'Samjhao Sathi explained nominee registration in Tamil audio voice note: "Nominee matlab aapke paise ka waris. 2 step me add karein."',
    quote: '"No English forms. A voice spoke in Tamil just like a wise daughter."'
  }
];

export const DICTIONARY: Record<LanguageCode, {
  tagline: string;
  subtagline: string;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;
  kavachTitle: string;
  kavachSub: string;
  simulatorTitle: string;
  simulatorSub: string;
  scoresTitle: string;
  scoresSub: string;
  alertFamily: string;
  fileGrievance: string;
  dadiVoicePlay: string;
  dadiVoiceStop: string;
  riskHigh: string;
  riskSuspicious: string;
  riskSafe: string;
  emergencyHelpline: string;
}> = {
  hi: {
    tagline: 'भारत के हर निवेशक के लिए सच्चा न्याय',
    subtagline: 'भारत ने 4 साल में 11 करोड़+ डीमैट खाते जोड़े। धोखेबाजों ने इसे धंधा बना लिया। हम आपके परिवार को बचाते हैं।',
    stat1: '11 करोड़+ नए निवेशक (68% टियर 2/3 शहरों से)',
    stat2: '₹11,000 करोड़+ 2023-24 में निवेश घोटालों में गंवाए',
    stat3: '500M लोग जिन्हें मातृभाषा में कोई सुरक्षा नहीं मिलती',
    stat4: '41 करोड़ नागरिक — कुल सुरक्षित परिवार समुदाय',
    kavachTitle: 'न्याय 3-इन-1 सुरक्षा कवच',
    kavachSub: 'एक व्हाट्सऐप नंबर • एक ही संकल्प: भारत की मेहनत की कमाई की रक्षा',
    simulatorTitle: 'व्हाट्सऐप लाइव सुरक्षा लेंस सिम्युलेटर',
    simulatorSub: 'किसी भी संदिग्ध मैसेज, रील, या पीडीएफ को फॉरवर्ड करें — 3 सेकंड में सच जानें',
    scoresTitle: 'सेबी स्कोर्स (SCORES) शिकायत जनरेटर',
    scoresSub: 'सिर्फ 3 आसान सवालों में आधिकारिक कानूनी शिकायत तैयार करें',
    alertFamily: 'परिवार को सचेत करें (Family Shield)',
    fileGrievance: 'सेबी शिकायत ड्राफ्ट करें',
    dadiVoicePlay: 'दादी की आवाज में सुनें',
    dadiVoiceStop: 'आवाज रोकें',
    riskHigh: 'खतरा: उच्च जोखिम (RED)',
    riskSuspicious: 'संदिग्ध: समीक्षा आवश्यक (YELLOW)',
    riskSafe: 'सत्यापित: सुरक्षित (GREEN)',
    emergencyHelpline: 'सेबी साथी टोल-फ्री: 1800 22 7575 • साइबर क्राइम हेल्पलाइन: 1930'
  },
  en: {
    tagline: 'Justice For Every Investor',
    subtagline: 'India added 11Cr+ demat accounts in 4 years. Scammers added a business model. We built a family member who protects.',
    stat1: '11Cr+ New Demat accounts (68% Tier 2/3 cities)',
    stat2: '₹11,000 Cr+ Lost to investment fraud in 2023-24',
    stat3: '500M Citizens excluded by English-only PDFs',
    stat4: '41Cr TAM Protected Families Across Bharat',
    kavachTitle: 'NYAYA: 3-in-1 Suraksha Kavach',
    kavachSub: 'One WhatsApp Contact • One Mission: Protect Bharat\'s hard-earned wealth',
    simulatorTitle: 'WhatsApp Live Suraksha Lens Simulator',
    simulatorSub: 'Forward any suspicious message, reel, or PDF — know the truth in 3 seconds',
    scoresTitle: 'SEBI SCORES Auto-Grievance Drafter',
    scoresSub: 'Draft an official regulatory complaint in 3 simple conversational steps',
    alertFamily: 'Alert Family Shield',
    fileGrievance: 'Draft SEBI Complaint',
    dadiVoicePlay: 'Listen in Dadi Voice',
    dadiVoiceStop: 'Stop Audio',
    riskHigh: 'High Risk (RED)',
    riskSuspicious: 'Suspicious (YELLOW)',
    riskSafe: 'Verified Safe (GREEN)',
    emergencyHelpline: 'SEBI Saathi Toll-Free: 1800 22 7575 • CyberCrime Helpline: 1930'
  },
  hinglish: {
    tagline: 'Bharat Ke Har Investor Ke Liye Saccha Nyaya',
    subtagline: 'India ne 4 saal me 11Cr+ demat accounts jode. Scammers ne business bana liya. We protect Bharat.',
    stat1: '11Cr+ Naye investors (68% Tier 2/3 cities se)',
    stat2: '₹11,000 Cr+ Scams me gawaaye (SEBI / CyberCrime)',
    stat3: '500M Users jinko bhasha me guidance nahi milti',
    stat4: '41Cr Total Protected Families TAM',
    kavachTitle: 'NYAYA 3-in-1 Suraksha Kavach',
    kavachSub: 'Ek WhatsApp number • Ek mission: Family ki suraksha',
    simulatorTitle: 'WhatsApp Live Simulator',
    simulatorSub: 'Koi bhi forward check karo 3 second me',
    scoresTitle: 'SEBI SCORES Complaint Drafter',
    scoresSub: '3 sawal me complaint ready karein',
    alertFamily: 'Family ko alert bhejo',
    fileGrievance: 'SCORES Complaint banao',
    dadiVoicePlay: 'Dadi Voice me suno',
    dadiVoiceStop: 'Audio roko',
    riskHigh: 'Khatra: RED Alert',
    riskSuspicious: 'Suspicious Alert',
    riskSafe: 'Safe & Verified',
    emergencyHelpline: 'SEBI Saathi Toll-Free: 1800 22 7575 • CyberCrime Helpline: 1930'
  },
  ta: {
    tagline: 'ஒவ்வொரு முதலீட்டாளருக்கும் நியாயம்',
    subtagline: 'இந்தியாவில் 4 ஆண்டுகளில் 11 கோடிக்கும் அதிகமான டீமேட் கணக்குகள். உங்கள் குடும்பத்தை ஏமாற்றத்திலிருந்து பாதுகாப்போம்.',
    stat1: '11 கோடி+ புதிய முதலீட்டாளர்கள்',
    stat2: '₹11,000 கோடி+ மோசடிகளில் இழப்பு',
    stat3: '500 மில்லியன் தாய்மொழி பயனர்கள்',
    stat4: '41 கோடி குடும்பங்கள் பாதுகாப்பு தளம்',
    kavachTitle: 'நியாயா 3-இன்-1 பாதுகாப்பு கவசம்',
    kavachSub: 'ஒரே வாட்ஸ்அப் எண் • தாய்மொழியில் பாதுகாப்பு',
    simulatorTitle: 'வாட்ஸ்அப் நேரடி சோதனை கருவி',
    simulatorSub: 'எந்தவொரு சந்தேகத்திற்கிடமான செய்தியையும் 3 வினாடிகளில் சரிபார்க்கவும்',
    scoresTitle: 'செபி (SEBI) புகார் வரைவு கருவி',
    scoresSub: '3 கேள்விகளில் முறையான புகார் கடிதம் தயார்',
    alertFamily: 'குடும்பத்தை எச்சரிக்கவும்',
    fileGrievance: 'புகார் தயார் செய்',
    dadiVoicePlay: 'குரலில் கேளுங்கள்',
    dadiVoiceStop: 'நிறுத்து',
    riskHigh: 'அபாயம்: சிவப்பு எச்சரிக்கை',
    riskSuspicious: 'சந்தேகத்திற்குரியது',
    riskSafe: 'பாதுகாப்பானது',
    emergencyHelpline: 'செபி உதவி எண்: 1800 22 7575 • சைபர்கிரைம்: 1930'
  },
  mr: {
    tagline: 'भारतातील प्रत्येक गुंतवणूकदारासाठी खरा न्याय',
    subtagline: 'भारताने ४ वर्षांत ११ कोटींहून अधिक डिमॅट खाती जोडली. फसवणूक करणाऱ्यांना रोखणे हेच आमचे ध्येय.',
    stat1: '११ कोटी+ नवीन गुंतवणूकदार (टियर २/३)',
    stat2: '₹११,००० कोटी+ आर्थिक फसवणुकीत नुकसान',
    stat3: '५०० दशलक्ष नागरिक भाषेच्या अभावामुळे वंचित',
    stat4: '४१ कोटी कुटुंबीयांचे सुरक्षा कवच',
    kavachTitle: 'न्याय ३-इन-१ सुरक्षा कवच',
    kavachSub: 'एक व्हॉट्सॲप नंबर • एकच मिशन: रक्षण',
    simulatorTitle: 'व्हॉट्सॲप थेट सुरक्षा सिम्युलेटर',
    simulatorSub: 'कोणताही संशयास्पद मेसेज ३ सेकंदात तपासा',
    scoresTitle: 'सेबी स्कोर्स (SCORES) तक्रार निवारण',
    scoresSub: 'फक्त ३ सोप्या प्रश्नांमध्ये अधिकृत तक्रार तयार करा',
    alertFamily: 'कुटुंबाला सावध करा',
    fileGrievance: 'तक्रार मसुदा तयार करा',
    dadiVoicePlay: 'आजीच्या आवाजात ऐका',
    dadiVoiceStop: 'आवाज थांबवा',
    riskHigh: 'धोका: लाल इशारा',
    riskSuspicious: 'संशयास्पद',
    riskSafe: 'सुरक्षित',
    emergencyHelpline: 'सेबी सारथी टोल-फ्री: 1800 22 7575 • सायबर क्राईम: 1930'
  },
  bn: {
    tagline: 'ভারতের প্রতিটি বিনিয়োগকারীর জন্য ন্যায়বিচার',
    subtagline: '৪ বছরে ভারতে ১১ কোটি+ নতুন ডিম্যাট অ্যাকাউন্ট যুক্ত হয়েছে। আপনার কষ্টার্জিত সঞ্চয় রক্ষা করাই আমাদের লক্ষ্য।',
    stat1: '১১ কোটি+ নতুন বিনিয়োগকারী',
    stat2: '₹১১,০০০ কোটি+ প্রতারণায় নষ্ট হয়েছে',
    stat3: '৫০০ মিলিয়ন মানুষ আঞ্চলিক ভাষায় তথ্যের অভাবে ভুগছেন',
    stat4: '৪১ কোটি সুরক্ষিত পরিবার',
    kavachTitle: 'ন্যায় ৩-ইন-১ সুরক্ষা কবচ',
    kavachSub: 'একটি হোয়াটসঅ্যাপ নম্বর • একটিই লক্ষ্য: আর্থিক সুরক্ষা',
    simulatorTitle: 'হোয়াটসঅ্যাপ সরাসরি পরীক্ষা সিমুলেটর',
    simulatorSub: 'যেকোনো সন্দেহজনক মেসেজ বা লিঙ্ক ৩ সেকেন্ডে যাচাই করুন',
    scoresTitle: 'সেবি স্কোরস (SCORES) অভিযোগ ড্রাফটার',
    scoresSub: 'মাত্র ৩টি প্রশ্নে আইনি অভিযোগ তৈরি করুন',
    alertFamily: 'পরিবারকে সতর্ক করুন',
    fileGrievance: 'অভিযোগ তৈরি করুন',
    dadiVoicePlay: 'কণ্ঠে শুনুন',
    dadiVoiceStop: 'বন্ধ করুন',
    riskHigh: 'বিপদ: উচ্চ ঝুঁকি',
    riskSuspicious: 'সন্দেহজনক',
    riskSafe: 'নিরাপদ ও পরীক্ষিত',
    emergencyHelpline: 'সেবি সাথী টোল-ফ্রি: 1800 22 7575 • সাইবার ক্রাইম: 1930'
  },
  te: {
    tagline: 'ప్రతి భారతీయ పెట్టుబడిదారుడికి న్యాయం',
    subtagline: '4 ఏళ్లలో 11 కోట్లకు పైగా డీమ్యాట్ ఖాతాలు. మోసగాళ్ల నుంచి మీ కుటుంబానికి రక్షణ.',
    stat1: '11 కోట్లకు పైగా కొత్త ఇన్వెస్టర్లు',
    stat2: '₹11,000 కోట్లు మోసాలలో నష్టం',
    stat3: '500 మిలియన్ల మందికి సొంత భాషలో సహాయం లేదు',
    stat4: '41 కోట్ల మంది రక్షణ పరిధి',
    kavachTitle: 'న్యాయ 3-ఇన్-1 రక్షణ కవచం',
    kavachSub: 'ఒకే వాట్సాప్ నంబర్ • శ్రేయస్సే లక్ష్యం',
    simulatorTitle: 'వాట్సాప్ లైవ్ స్కాన్ సిమ్యులేటర్',
    simulatorSub: 'ఏదైనా అనుమానాస్పద మెసేజ్‌ను 3 సెకన్లలో తనిఖీ చేయండి',
    scoresTitle: 'సెబీ స్కోర్స్ ఫిర్యాదు డ్రాఫ్ట్',
    scoresSub: 'కేవలం 3 ప్రశ్నలలో ఫిర్యాదు సిద్ధం',
    alertFamily: 'కుటుంబాన్ని అప్రమత్తం చేయండి',
    fileGrievance: 'ఫిర్యాదు తయారు చేయండి',
    dadiVoicePlay: 'వాయిస్‌లో వినండి',
    dadiVoiceStop: 'ఆపండి',
    riskHigh: 'ప్రమాదం: హెచ్చరిక',
    riskSuspicious: 'అనుమానాస్పదం',
    riskSafe: 'సురక్షితం',
    emergencyHelpline: 'సెబీ సారథి టోల్-ఫ్రీ: 1800 22 7575 • సైబర్ క్రైమ్: 1930'
  },
  gu: {
    tagline: 'દરેક ભારતીય રોકાણકાર માટે સાચો ન્યાય',
    subtagline: '૪ વર્ષમાં ૧૧ કરોડથી વધુ ડીમેટ ખાતા ઉમેરાયા. તમારી મહેનતની કમાણીનું રક્ષણ કરવું એ અમારું કર્તવ્ય છે.',
    stat1: '૧૧ કરોડ+ નવા રોકાણકારો',
    stat2: '₹૧૧,૦૦૦ કરોડ+ ફ્રોડમાં ગુમાવ્યા',
    stat3: '૫૦૦ મિલિયન લોકોને માતૃભાષામાં માર્ગદર્શન નથી',
    stat4: '૪૧ કરોડ સુરક્ષિત પરિવાર',
    kavachTitle: 'ન્યાય ૩-ઇન-૧ સુરક્ષા કવચ',
    kavachSub: 'એક વોટ્સએપ નંબર • એક જ સંકલ્પ: સુરક્ષા',
    simulatorTitle: 'વોટ્સએપ લાઈવ સ્કેનર',
    simulatorSub: 'કોઈ પણ શંકાસ્પદ મેસેજ ૩ સેકન્ડમાં તપાસો',
    scoresTitle: 'સેબી સ્કોર્સ ફરિયાદ ડ્રાફ્ટર',
    scoresSub: 'માત્ર ૩ પ્રશ્નોમાં સત્તાવાર ફરિયાદ તૈયાર કરો',
    alertFamily: 'પરિવારને ચેતવો',
    fileGrievance: 'ફરિયાદ બનાવો',
    dadiVoicePlay: 'અવાજમાં સાંભળો',
    dadiVoiceStop: 'બંધ કરો',
    riskHigh: 'જોખમ: લાલ એલર્ટ',
    riskSuspicious: 'શંકાસ્પદ',
    riskSafe: 'સુરક્ષિત',
    emergencyHelpline: 'સેબી સારથી ટોલ-ફ્રી: 1800 22 7575 • સાયબર ક્રાઇમ: 1930'
  },
  kn: {
    tagline: 'ಪ್ರತಿಯೊಬ್ಬ ಹೂಡಿಕೆದಾರರಿಗೂ ನ್ಯಾಯ',
    subtagline: '೪ ವರ್ಷಗಳಲ್ಲಿ ೧೧ ಕೋಟಿಗೂ ಹೆಚ್ಚು ಡಿಮ್ಯಾಟ್ ಖಾತೆಗಳು. ವಂಚಕರಿಂದ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ರಕ್ಷಣೆ.',
    stat1: '೧೧ ಕೋಟಿ+ ಹೊಸ ಹೂಡಿಕೆದಾರರು',
    stat2: '₹೧೧,೦೦೦ ಕೋಟಿ+ ವಂಚನೆಗಳಿಂದ ನಷ್ಟ',
    stat3: '೫೦೦ ಮಿಲಿಯನ್ ಜನರಿಗೆ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ನೆರವಿಲ್ಲ',
    stat4: '೪೧ ಕೋಟಿ ಸುರಕ್ಷಿತ ಕುಟುಂಬಗಳು',
    kavachTitle: 'ನ್ಯಾಯ ೩-ಇನ್-೧ ಸುರಕ್ಷಾ ಕವಚ',
    kavachSub: 'ಒಂದೇ ವಾಟ್ಸಾಪ್ ನಂಬರ್ • ರಕ್ಷಣೆಯೇ ಧ್ಯೇಯ',
    simulatorTitle: 'ವಾಟ್ಸಾಪ್ ಲೈವ್ ಸ್ಕ್ಯಾನರ್',
    simulatorSub: 'ಯಾವುದೇ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶವನ್ನು ೩ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ',
    scoresTitle: 'ಸೆಬಿ ಸ್ಕೋರ್ಸ್ ದೂರು ತಯಾರಿ',
    scoresSub: 'ಕೇವಲ ೩ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ದೂರು ಸಿದ್ಧ',
    alertFamily: 'ಕುಟುಂಬವನ್ನು ಎಚ್ಚರಿಸಿ',
    fileGrievance: 'ದೂರು ಸಿದ್ಧಪಡಿಸಿ',
    dadiVoicePlay: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
    dadiVoiceStop: 'ನಿಲ್ಲಿಸಿ',
    riskHigh: 'ಅಪಾಯ: ಕೆಂಪು ಎಚ್ಚರಿಕೆ',
    riskSuspicious: 'ಅನುಮಾನಾಸ್ಪದ',
    riskSafe: 'ಸುರಕ್ಷಿತ',
    emergencyHelpline: 'ಸೆಬಿ ಸಾರಥಿ ಟೋಲ್-ಫ್ರೀ: 1800 22 7575 • ಸೈಬರ್ ಕ್ರೈಮ್: 1930'
  },
  pa: {
    tagline: 'ਹਰ ਭਾਰਤੀ ਨਿਵੇਸ਼ਕ ਲਈ ਸੱਚਾ ਨਿਆਂ',
    subtagline: 'ਭਾਰਤ ਨੇ 4 ਸਾਲਾਂ ਵਿੱਚ 11 ਕਰੋੜ+ ਡੀਮੈਟ ਖਾਤੇ ਜੋੜੇ। ਧੋਖੇਬਾਜ਼ਾਂ ਤੋਂ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਦੀ ਮਿਹਨਤ ਦੀ ਕਮਾਈ ਦੀ ਰੱਖਿਆ।',
    stat1: '11 ਕਰੋੜ+ ਨਵੇਂ ਨਿਵੇਸ਼ਕ (68% ਟੀਅਰ 2/3 ਸ਼ਹਿਰਾਂ ਤੋਂ)',
    stat2: '₹11,000 ਕਰੋੜ+ ਨਿਵੇਸ਼ ਧੋਖਾਧੜੀ ਵਿੱਚ ਗੁਆਏ',
    stat3: '500 ਮਿਲੀਅਨ ਨਾਗਰਿਕਾਂ ਨੂੰ ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਸੁਰੱਖਿਆ ਦੀ ਲੋੜ',
    stat4: '41 ਕਰੋੜ ਸੁਰੱਖਿਅਤ ਪਰਿਵਾਰ',
    kavachTitle: 'ਨਿਆਂ 3-ਇਨ-1 ਸੁਰੱਖਿਆ ਕਵਚ',
    kavachSub: 'ਇੱਕ ਵਟਸਐਪ ਨੰਬਰ • ਇੱਕੋ ਮਿਸ਼ਨ: ਪਰਿਵਾਰ ਦੀ ਸੁਰੱਖਿਆ',
    simulatorTitle: 'ਵਟਸਐਪ ਲਾਈਵ ਸੁਰੱਖਿਆ ਲੈਂਸ ਸਿਮੂਲੇਟਰ',
    simulatorSub: 'ਕਿਸੇ ਵੀ ਸ਼ੱਕੀ ਮੈਸੇਜ, ਰੀਲ ਜਾਂ ਪੀਡੀਐਫ ਨੂੰ 3 ਸਕਿੰਟਾਂ ਵਿੱਚ ਜਾਂਚੋ',
    scoresTitle: 'ਸੇਬੀ ਸਕੋਰਸ (SCORES) ਸ਼ਿਕਾਇਤ ਡਰਾਫਟਰ',
    scoresSub: 'ਸਿਰਫ਼ 3 ਆਸਾਨ ਸਵਾਲਾਂ ਵਿੱਚ ਕਾਨੂੰਨੀ ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕਰੋ',
    alertFamily: 'ਪਰਿਵਾਰ ਨੂੰ ਸੁਚੇਤ ਕਰੋ',
    fileGrievance: 'ਸੇਬੀ ਸ਼ਿਕਾਇਤ ਬਣਾਓ',
    dadiVoicePlay: 'ਦਾਦੀ ਦੀ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ',
    dadiVoiceStop: 'ਆਵਾਜ਼ ਰੋਕੋ',
    riskHigh: 'ਖ਼ਤਰਾ: ਉੱਚ ਜੋਖਮ (RED)',
    riskSuspicious: 'ਸ਼ੱਕੀ (YELLOW)',
    riskSafe: 'ਸੁਰੱਖਿਅਤ (GREEN)',
    emergencyHelpline: 'ਸੇਬੀ ਸਾਥੀ ਟੋਲ-ਫ੍ਰੀ: 1800 22 7575 • ਸਾਈਬਰ ਕ੍ਰਾਈਮ: 1930'
  },
  ml: {
    tagline: 'ഓരോ നിക്ഷേപകനും നീതി',
    subtagline: '4 വർഷത്തിനുള്ളിൽ 11 കോടിയിലധികം ഡീമാറ്റ് അക്കൗണ്ടുകൾ. തട്ടിപ്പുകാരിൽ നിന്ന് നിങ്ങളുടെ കുടുംബത്തിന് സംരക്ഷണം.',
    stat1: '11 കോടി+ പുതിയ നിക്ഷേപകർ',
    stat2: '₹11,000 കോടി+ നിക്ഷേപ തട്ടിപ്പുകളിൽ നഷ്ടപ്പെട്ടു',
    stat3: '500 ദശലക്ഷം ആളുകൾക്ക് മാതൃഭാഷയിൽ സഹായം ആവശ്യമാണ്',
    stat4: '41 കോടി സുരക്ഷിത കുടുംബങ്ങൾ',
    kavachTitle: 'ന്യായ 3-ഇൻ-1 സുരക്ഷാ കവചം',
    kavachSub: 'ഒരു വാട്ട്‌സ്ആപ്പ് നമ്പർ • ഒരേയൊരു ലക്ഷ്യം: സാമ്പത്തിക സുരക്ഷ',
    simulatorTitle: 'വാട്ട്‌സ്ആപ്പ് ലൈവ് സുരക്ഷാ സിമുലേറ്റർ',
    simulatorSub: 'സംശയാസ്പദമായ സന്ദേശങ്ങൾ 3 സെക്കൻഡിനുള്ളിൽ പരിശോധിക്കുക',
    scoresTitle: 'സെബി സ്കോർസ് (SCORES) പരാതി ഡ്രാഫ്റ്റർ',
    scoresSub: '3 ലളിതമായ ചോദ്യങ്ങളിൽ ഔദ്യോഗിക പരാതി തയ്യാറാക്കാം',
    alertFamily: 'കുടുംബത്തിന് മുന്നറിയിപ്പ് നൽകുക',
    fileGrievance: 'പരാതി തയ്യാറാക്കുക',
    dadiVoicePlay: 'ശബ്ദത്തിൽ കേൾക്കുക',
    dadiVoiceStop: 'നിർത്തുക',
    riskHigh: 'അപകടം: ഉയർന്ന അപകടസാധ്യത',
    riskSuspicious: 'സംശയാസ്പദം',
    riskSafe: 'സുരക്ഷിതം',
    emergencyHelpline: 'സെബി ടോൾ ഫ്രീ: 1800 22 7575 • സൈബർ ക്രൈം: 1930'
  }
};

export const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    type: 'radar_scam',
    title: 'High-Risk Scam Intercepted: Nashik',
    message: 'Counterfeit NSDL stamp duty letter demanding ₹12,500 advance fee flagged. Added to 41Cr blacklist.',
    timestamp: '2m ago',
    read: false,
    severity: 'high',
    targetPage: 'simulator',
    metadata: {
      city: 'Nashik',
      state: 'Maharashtra',
      scamSampleId: 'sample-pdf-nsdl',
      amount: '₹12,500',
    },
  },
  {
    id: 'notif-2',
    type: 'complaint_status',
    title: 'SCORES Complaint #2024-8849 Status Updated',
    message: 'Enforcement Directorate & SEBI initiated formal investigation against unregistered Telegram channel @VIP_Profits.',
    timestamp: '14m ago',
    read: false,
    severity: 'info',
    targetPage: 'scores',
    metadata: {
      complaintId: 'SCORES-2024-8849',
      newStatus: 'Under Active Investigation',
    },
  },
  {
    id: 'notif-3',
    type: 'radar_scam',
    title: 'Deepfake Finfluencer Alert: Lucknow',
    message: '87% synthetic voice clone promising guaranteed 5-day doubling scheme detected across Instagram reels.',
    timestamp: '1h ago',
    read: false,
    severity: 'high',
    targetPage: 'simulator',
    metadata: {
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      scamSampleId: 'sample-reel-deepfake',
      amount: '₹5,000',
    },
  },
  {
    id: 'notif-4',
    type: 'complaint_status',
    title: 'Recovery Notice: SCORES #2024-7120',
    message: 'CyberCrime 1930 liaison confirmed illicit beneficiary account frozen. Restitution process underway.',
    timestamp: '3h ago',
    read: true,
    severity: 'info',
    targetPage: 'scores',
    metadata: {
      complaintId: 'SCORES-2024-7120',
      newStatus: 'Bank Account Frozen',
    },
  },
];

export const INITIAL_CONNECTED_SHIELD_CONFIG: ConnectedShieldConfig = {
  whatsappNumber: '+91 98451 23456',
  whatsappConnected: true,
  simProvider: 'Jio 5G',
  simNumber: '8991 0012 3456 7890 123',
  simShieldActive: true,
  smsSmishingFilter: true,
  sancharSaathiLinked: true,
  cyber1930AutoAlert: true,
  lastScannedTime: 'Just now',
  blockedAttemptsCount: 14,
};

export const INITIAL_INTERCEPTED_EVENTS: ShieldInterceptedEvent[] = [
  {
    id: 'evt-1',
    timestamp: '2m ago',
    channel: 'sms',
    sender: 'VM-SB1N (Spoofed Header)',
    headerOrNumber: 'VM-SB1N',
    snippet: 'Dear Customer, your SBI YONO NetBanking is suspended due to expired PAN card. Update at http://bit.ly/sbi-pan-kyc-99 to avoid ₹5,000 fine.',
    threatLevel: 'CRITICAL',
    actionTaken: 'Blocked & Quarantined',
    traiHeaderStatus: 'Spoofed',
    riskScore: 98,
  },
  {
    id: 'evt-2',
    timestamp: '18m ago',
    channel: 'whatsapp',
    sender: '+91 99283 71625',
    headerOrNumber: '+91 99283 71625',
    snippet: 'Added to "VIP Tata Technologies Pre-IPO Allotment Syndicate". Guaranteed 400% listing gain. Transfer ₹25,000 token to secure allotment.',
    threatLevel: 'HIGH',
    actionTaken: 'Blocked & Quarantined',
    traiHeaderStatus: 'Unregistered',
    riskScore: 94,
  },
  {
    id: 'evt-3',
    timestamp: '1h ago',
    channel: 'sim',
    sender: 'Telecom Circle Watchdog',
    headerOrNumber: 'Jio Telecom Circle 4G/5G',
    snippet: 'Unauthorized SIM Swap verification request received from unverified IP (Kolkata). Carrier IMSI lock auto-triggered by NYAYA SIM Kavach.',
    threatLevel: 'CRITICAL',
    actionTaken: 'Blocked & Quarantined',
    traiHeaderStatus: 'Suspicious Bulk',
    riskScore: 99,
  },
  {
    id: 'evt-4',
    timestamp: '3h ago',
    channel: 'sms',
    sender: 'AD-EBILLS',
    headerOrNumber: 'AD-EBILLS',
    snippet: 'URGENT: Electricity power will be disconnected at 9:30 PM due to unpaid bill of ₹1,430. Call officer immediately at 9811223344.',
    threatLevel: 'HIGH',
    actionTaken: 'Reported to 1930 / Sanchar Saathi',
    traiHeaderStatus: 'Spoofed',
    riskScore: 92,
  },
  {
    id: 'evt-5',
    timestamp: '6h ago',
    channel: 'whatsapp',
    sender: '+91 88472 91823',
    headerOrNumber: '+91 88472 91823',
    snippet: 'Official CBI Cyber Cell Notice: Your Aadhaar is linked to illegal money laundering courier in Mumbai Customs. Connect on video call now or non-bailable warrant issued.',
    threatLevel: 'CRITICAL',
    actionTaken: 'Reported to 1930 / Sanchar Saathi',
    traiHeaderStatus: 'Unregistered',
    riskScore: 100,
  },
];

export const OMNICHANNEL_PRESETS: OmnichannelPreset[] = [
  {
    id: 'omni-google-ad-care',
    category: 'google',
    categoryLabel: 'Google Search & Sponsored Ads',
    title: 'Google Sponsored Ad: Fake SBI 24x7 Customer Care Helpline',
    badge: 'Sponsored Search Poisoning',
    senderOrDomain: 'Sponsored Ad: https://sbi-helpdesk-tollfree-online.cc',
    content: 'Searching on Google for "SBI Credit Card Customer Care Toll Free". Top sponsored ad shows: "State Bank of India 24x7 Quick Resolution Desk — Call 1800-891-2345 or WhatsApp +91 91234 56789. Instant reversal of wrong debits and credit card block within 5 minutes."',
    additionalDetails: 'Clicking ad initiates phone call where representative asks victim to install "SBI Quick Support" APK (revealed to be AnyDesk remote control tool).',
    riskScore: 98,
    riskLevel: 'RED',
    keyRedFlags: [
      'Search Engine Ad Arbitrage: Scammers bid on official keywords to outrank authentic bank URLs',
      'Unregistered burner phone number used as official toll-free helpline',
      'Requests remote screen-sharing application (AnyDesk/TeamViewer) download'
    ],
    regulationsViolated: [
      'IT Act 2000 Section 66D (Cheating by personation)',
      'RBI Master Direction on Customer Service in Banks (Strict helpline verification)',
      'Bharatiya Nyaya Sanhita 2023 Section 318(4)'
    ],
    dadiAdvice: {
      hi: 'गूगल सर्च पर ऊपर दिखने वाले विज्ञापनों पर कभी भरोसा मत करना बेटा! बैंक का असली कस्टमर केयर नंबर हमेशा आपके एटीएम कार्ड के पीछे या बैंक की आधिकारिक पासबुक पर लिखा होता है।',
      en: 'Never trust top sponsored ad results on Google Search! Real bank helplines are printed on the back of your debit card or official bank statements, never on third-party ad links.',
      hinglish: 'Google Search ke top "Sponsored" ads 80% fake helplines hote hain beta! Bank ka number passbook ya debit card ke peechhe dekho.',
    },
  },
  {
    id: 'omni-google-zerodha-phish',
    category: 'google',
    categoryLabel: 'Google Search & Sponsored Ads',
    title: 'Google Sponsored Phishing: Counterfeit Zerodha Kite Portal',
    badge: 'Typosquat Demat Phishing',
    senderOrDomain: 'Sponsored Ad: https://kite-zerodha-invest-auth.in',
    content: 'Sponsored Google search result for "Zerodha Kite Login": "Zerodha Kite Web — Free Demat Account & Guaranteed Pre-IPO HNI Allocation. Login with User ID and Password to claim ₹5,000 welcome bonus."',
    additionalDetails: 'Domain was registered only 48 hours ago in Russia. Harvests broker login credentials, 6-digit TOTP, and Demat PIN.',
    riskScore: 99,
    riskLevel: 'RED',
    keyRedFlags: [
      'Lookalike domain (kite-zerodha-invest-auth.in vs legitimate kite.zerodha.com)',
      'Demands TOTP and Demat trading password on unverified third-party server',
      'Offers fabricated ₹5,000 cash bonus strictly banned by SEBI broker codes'
    ],
    regulationsViolated: [
      'SEBI Master Circular for Stock Brokers (CIR/MIRSD/2024)',
      'IT Act 2000 Section 66C (Identity theft and credential harvesting)'
    ],
    dadiAdvice: {
      hi: 'ये आपका पूरा डीमैट अकाउंट खाली करने का जाल है! ज़ेरोधा की असली वेबसाइट केवल kite.zerodha.com है। किसी भी विज्ञापन वाले लिंक पर लॉगिन मत करना।',
      en: 'Dangerous demat harvesting portal! Genuine broker sites are bookmarked directly. Never enter your trading password or 6-digit TOTP from a search ad.',
      hinglish: 'Demat password aur TOTP kisi bhi Google ad wale link par mat daalo! Sirf official app ya saved bookmark use karo.',
    },
  },
  {
    id: 'omni-mail-it-refund',
    category: 'mail',
    categoryLabel: 'Email / Mail Phishing',
    title: 'Spear Phishing Email: Fake Income Tax Department ₹38,450 Refund Notice',
    badge: 'Govt Impersonation Email',
    senderOrDomain: 'From: refunds@incometax-gov-in.org (Spoofed Mail)',
    content: 'Subject: URGENT: Approved Income Tax Refund of ₹38,450 for Assessment Year 2024-25.\n\n"Dear Taxpayer, An excess tax deduction of ₹38,450 has been approved by the Central Board of Direct Taxes. However, due to invalid bank IFSC records, the refund could not be credited. Click the link below to verify your NetBanking login and credit card details within 24 hours to receive refund directly into your account: https://incometax-refund-portal.net/verify"',
    additionalDetails: 'Email header reveals SPF fail (sent from a cheap overseas VPS server) and uses official Ashok Stambha emblem.',
    riskScore: 97,
    riskLevel: 'RED',
    keyRedFlags: [
      'Fake domain suffix (.org vs official gov.in)',
      'Asks for NetBanking password and credit card CVV to "credit" a refund',
      'CBDT never sends refund links requiring private NetBanking authentication'
    ],
    regulationsViolated: [
      'IT Act 2000 Section 66D (Cheating by impersonating government authority)',
      'Income Tax Act 1961 Section 244A (Official statutory refund disbursement protocol)'
    ],
    dadiAdvice: {
      hi: 'इनकम टैक्स विभाग कभी भी ईमेल में लिंक भेजकर पासवर्ड या कार्ड नंबर नहीं मांगता बेटा। रिफंड सीधे आपके पैन से जुड़े बैंक खाते में आता है!',
      en: 'Income Tax Department never sends email links asking for passwords or CVVs. All genuine refunds are processed automatically into your validated bank account.',
      hinglish: 'Income Tax kabhi email par NetBanking password nahi mangta beta! Ye direct phishing hai, link bilkul mat kholna.',
    },
  },
  {
    id: 'omni-mail-sebi-summons',
    category: 'mail',
    categoryLabel: 'Email / Mail Phishing',
    title: 'Counterfeit SEBI Investigation Notice Demanding "Statutory Clearance Penalty"',
    badge: 'Regulatory Extortion Mail',
    senderOrDomain: 'From: legal-enforcement@sebi-investigation.net',
    content: 'Subject: SHOW CAUSE NOTICE — Irregular Transactions Detected in Demat Account\n\n"SEBI Surveillance Cell has flagged suspicious circular trading in your Demat Account. Under Section 11B of the SEBI Act, you are directed to deposit a temporary statutory security clearance deposit of ₹45,000 into the SEBI Escrow account details attached, failing which an asset freeze order will be served on your depository participant within 48 hours."',
    additionalDetails: 'Attached counterfeit PDF with forged signatures of SEBI whole-time members and a fake UPI QR code.',
    riskScore: 98,
    riskLevel: 'RED',
    keyRedFlags: [
      'SEBI never demands fines or penalties via private UPI QR codes or email links',
      'Fake domain @sebi-investigation.net (Genuine SEBI domain is only sebi.gov.in)',
      'Coercive 48-hour asset freeze threat designed to cause panic'
    ],
    regulationsViolated: [
      'SEBI Act 1992 Section 15I (Official adjudication procedure requires formal physical summons)',
      'Bharatiya Nyaya Sanhita 2023 Section 319 (Cheating by personation)'
    ],
    dadiAdvice: {
      hi: 'सेबी कभी भी किसी आम नागरिक को ऐसे डरा-धमका कर यूपीआई से जुर्माना भरने को नहीं कहती। ये बदमाशों की फर्जी चिट्ठी है!',
      en: 'SEBI never collects penalties or deposits via UPI or email! Any official regulatory proceeding follows formal judicial gazette notices.',
      hinglish: 'SEBI kabhi bhi email par UPI se fine nahi maangti. Ye 100% fake extortion mail hai, 1930 par report karo.',
    },
  },
  {
    id: 'omni-post-speedpost-summons',
    category: 'post',
    categoryLabel: 'Postal / Physical Letters & Courier',
    title: 'Physical Speed-Post Courier: Forged Delhi Cyber Cell Court Arrest Warrant',
    badge: 'Physical Speed Post Extortion',
    senderOrDomain: 'Delivered via Speed Post / Counterfeit Delhi Police Cyber Cell Letterhead',
    content: 'Received an actual physical sealed envelope via Speed Post. Inside is an official-looking letter with "DELHI POLICE CYBER CRIME CELL" & Supreme Court seal: "CASE NO: DL-CYBER-8891/2024 — Non-Bailable Arrest Warrant issued for alleged facilitation of overseas money laundering. To prevent physical arrest and public seizure of property, deposit an immediate judicial surety of ₹1,20,000 into the designated State Clearance Escrow UPI within 24 hours of delivery."',
    additionalDetails: 'Letter has a printed barcode and QR code leading to a private Razorpay payment link registered under a private shell company.',
    riskScore: 100,
    riskLevel: 'RED',
    keyRedFlags: [
      'Physical police summons never demand money or UPI transfers to avoid arrest',
      'Forged Ashoka lion emblem and fabricated judge signature without court seal verification',
      'QR code printed on physical paper routes to private UPI merchant VPA'
    ],
    regulationsViolated: [
      'Code of Criminal Procedure (CrPC) / BNSS Section 35 (Lawful summons procedure)',
      'Indian Penal Code / BNS Section 318(4) & 338 (Forgery of valuable security/court order)'
    ],
    dadiAdvice: {
      hi: 'डाक से आई इस चिट्ठी से डरना मत बेटा! कोई भी असली पुलिस या अदालत पैसे लेकर गिरफ्तारी नहीं रोकती। तुरंत नजदीकी पुलिस थाने में जाकर इसे दिखाओ।',
      en: 'Do not panic over physical courier notices demanding money! Genuine law enforcement agencies never accept UPI money to cancel warrants. Take it directly to your local police station.',
      hinglish: 'Speed Post se aayi is fake notice se darna mat! Police kabhi UPI par settlement nahi karti. Seedhe local police station jao.',
    },
  },
  {
    id: 'omni-post-lottery-scratch',
    category: 'post',
    categoryLabel: 'Postal / Physical Letters & Courier',
    title: 'Physical Parcel: Luxury Car "Mahindra Thar" Scratch-and-Win Coupon Scam',
    badge: 'Physical Courier Lottery Trap',
    senderOrDomain: 'Consignment Sender: "Naaptol / Home Appliances Lucky Draw Hub, Jaipur"',
    content: 'A courier package arrived with a printed scratch card. Upon scratching, it reveals: "CONGRATULATIONS! 1st Prize Winner of Brand New Mahindra Thar (Worth ₹16.8 Lakhs) or Cash Alternative of ₹15,00,000. To claim prize, call Prize Dispatch Officer at +91 97812 34567 and deposit 1% GST & RTO Registration Fee of ₹16,800 to Government Vehicle Desk."',
    additionalDetails: 'Includes glossy color certificate with fake seals of Ministry of Commerce and fake GST registration number.',
    riskScore: 95,
    riskLevel: 'RED',
    keyRedFlags: [
      'Advance fee fraud (Lotteries and Scratch Cards Act 1998 strictly regulates contests)',
      'You cannot win a contest or lottery you never purchased or entered',
      'Demands 1% advance GST into a private individual account'
    ],
    regulationsViolated: [
      'Lotteries (Regulation) Act 1998 Section 3 & 4',
      'Consumer Protection Act 2019 (Misleading contests and deceptive commercial practices)'
    ],
    dadiAdvice: {
      hi: 'जिस लॉटरी का टिकट ही नहीं खरीदा, उसमें गाड़ी कैसे जीतोगे बेटा? ये 16 हजार रुपये लूटने का पुराना पैंतरा है। चिट्ठी फाड़ कर फेंक दो!',
      en: 'How can you win a lottery you never bought a ticket for? This is a classic advance-fee scam designed to steal ₹16,800. Discard it immediately!',
      hinglish: 'Jab lottery ka ticket hi nahi kharida toh car kaise jeet gaye beta? Ek rupya bhi mat bhejna, ye pure fraud parcel hai.',
    },
  },
  {
    id: 'omni-reels-deepfake-ambani',
    category: 'reels',
    categoryLabel: 'Reels, YouTube & Viral Video',
    title: 'Instagram Deepfake Reel: Celebrity / Tycoon Endorsing "₹10,000 to ₹1,00,000 in 7 Days"',
    badge: 'AI Synthetic Video Deepfake',
    senderOrDomain: 'Instagram Reel: @vip_quantum_wealth_ai (Sponsored Promotion)',
    content: 'A high-budget sponsored Instagram Reel showing a prominent Indian industrialist speaking on stage: "I am launching the Bharat Quantum Wealth Bot. Today every Indian youth can invest just ₹10,000 and automated AI high-frequency trading will generate ₹1,00,000 within 7 days. Tap the link in bio to join our exclusive Telegram quota before government shuts it down."',
    additionalDetails: 'Audio has unnatural micro-pauses and lip movements show edge artifacting characteristic of Wav2Lip deepfake synthesis.',
    riskScore: 99,
    riskLevel: 'RED',
    keyRedFlags: [
      '89% probability of AI deepfake audio/video synthesis using cloned public interview footage',
      'SEBI prohibits any entity from guaranteeing 1,000% exponential weekly returns',
      'Funnel redirects off-platform to anonymous Telegram group with no investor protection'
    ],
    regulationsViolated: [
      'SEBI Circular on Association with Unregistered Entities (August 2024)',
      'IT Act 2000 Section 66D & Ministry of Electronics and IT (MeitY) Deepfake Advisory 2023',
      'BNS Section 318(4)'
    ],
    dadiAdvice: {
      hi: 'वीडियो में बड़े उद्योगपति की आवाज और चेहरा कंप्यूटर से बनाया गया नकली है बेटा! सेबी ऐसे वादों को सख्त गैर-कानूनी मानती है। तुरंत इस रील को रिपोर्ट करो।',
      en: 'The celebrity face and voice in this video are synthetic AI deepfakes! SEBI strictly bans guaranteed profit claims. Report the reel immediately.',
      hinglish: 'Ye video AI se banaya gaya nakli deepfake hai beta! Bade log aisi schemes promote nahi karte. Reel ko report karo.',
    },
  },
  {
    id: 'omni-reels-workfromhome',
    category: 'reels',
    categoryLabel: 'Reels, YouTube & Viral Video',
    title: 'YouTube Shorts / Reel: "Earn ₹3,000/Day Liking YouTube Videos & Hotel Reviews"',
    badge: 'Prepaid Task-Based Fraud',
    senderOrDomain: 'YouTube Shorts: @daily_cash_india_work',
    content: 'Trending YouTube Short showing stacks of ₹500 notes: "Simple work from home job for students and housewives. Earn ₹150 for every YouTube video you like and 5-star Google Maps review you give. No qualification needed. Daily payout of ₹3,000 to ₹5,000. Send WhatsApp message to +91 93123 45678 to start today."',
    additionalDetails: 'Victims are given initial ₹200 payout to build trust, then lured into paying ₹50,000 into "VIP merchant prepaid crypto task" which can never be withdrawn.',
    riskScore: 94,
    riskLevel: 'RED',
    keyRedFlags: [
      'Classic "Pig Butchering / Task Scam" operating out of Southeast Asian cyber compounds',
      'Small initial ₹150 payout is bait to extract lakhs in subsequent "prepaid crypto recharge tasks"',
      'No legitimate company pays money for liking random social media videos'
    ],
    regulationsViolated: [
      'Banning of Unregulated Deposit Schemes Act (BUDS), 2019',
      'IT Act 2000 Section 66D & Indian Cyber Crime Coordination Centre (I4C) High-Alert Advisory'
    ],
    dadiAdvice: {
      hi: 'यूट्यूब वीडियो लाइक करके कोई हजारों रुपये नहीं देता बेटा। पहले दो-तीन सौ रुपये देकर आपका भरोसा जीतेंगे, फिर लाखों रुपये ठग लेंगे। इनसे दूर रहो!',
      en: 'Nobody pays thousands of rupees just for liking videos! They give a tiny initial amount to gain your trust, then extort your life savings in prepaid tasks.',
      hinglish: 'Ye task-based scam hai beta! Shuru me ₹200 dekar baad me ₹50,000 maangte hain. Bilkul reply mat karna.',
    },
  },
  {
    id: 'omni-sms-power-cutoff',
    category: 'sms',
    categoryLabel: 'SMS & SIM Smishing',
    title: 'SMS Header Spoof: "Electricity Disconnection Tonight at 9:30 PM"',
    badge: 'Urgent Utility Smishing',
    senderOrDomain: 'SMS Header: VM-EBILLS / +91 98412 90812',
    content: 'SMS Text: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Rahul Sharma at 98412-90812. Thank you, State Electricity Board."',
    additionalDetails: 'Calling the number connects to a fraudster who instructs victim to download a quick ₹10 bill update APK which contains an SMS OTP reader Trojan.',
    riskScore: 96,
    riskLevel: 'RED',
    keyRedFlags: [
      'State electricity boards never use personal 10-digit mobile numbers for disconnections',
      'Statutory regulations require 15-day prior written registered notice before power disconnection',
      'Asks victim to install APK or send ₹10 via third-party link to harvest bank credentials'
    ],
    regulationsViolated: [
      'Electricity Act 2003 Section 56 (Statutory disconnection notice period violation)',
      'TRAI TCCCPR Regulations on Unregistered Telemarketing Headers'
    ],
    dadiAdvice: {
      hi: 'बिजली विभाग कभी ऐसे अचानक रात को 9:30 बजे बिजली काटने का एसएमएस नहीं भेजता। अपने बिजली बिल पर दिए आधिकारिक हेल्पलाइन नंबर पर ही फोन करें।',
      en: 'Power utilities never send midnight disconnection threats via personal mobile numbers! Check your bill status only on the official state electricity website.',
      hinglish: 'Bijli bill ka ye fake SMS hai beta! Kisi bhi personal mobile number par call karke koi APK mat download karna.',
    },
  },
  {
    id: 'omni-sms-sim-swap',
    category: 'sms',
    categoryLabel: 'SMS & SIM Smishing',
    title: 'Telecom SMS: Fake 5G Upgrade Triggering Unauthorized SIM Swap',
    badge: 'SIM Swap Account Takeover',
    senderOrDomain: 'SMS from: 56161 / Spoofed Carrier Alert',
    content: 'SMS Text: "URGENT CARRIER ALERT: Your 4G SIM will be deactivated within 4 hours. To upgrade to 5G High-Speed without visiting store, SMS your 20-digit SIM number printed on your SIM card to 121 now. Do not share this message with anyone."',
    additionalDetails: 'If victim forwards SIM number, the attacker clones the SIM on a new eSIM profile, intercepting all bank OTPs and Demat authorizations.',
    riskScore: 100,
    riskLevel: 'RED',
    keyRedFlags: [
      'Sending your 20-digit SIM ICCID authorizes a remote SIM swap to the scammer handset',
      'Once SIM swap succeeds, victim loses all cellular network signal while fraudster drains bank accounts',
      'Genuine telecom operators never ask users to SMS SIM numbers to upgrade to 5G'
    ],
    regulationsViolated: [
      'Department of Telecommunications (DoT) SIM Swap Security Guidelines 2023',
      'IT Act 2000 Section 43 & 66 (Unauthorized access to computer systems)'
    ],
    dadiAdvice: {
      hi: 'खबरदार! कभी भी अपने सिम कार्ड का 20 अंकों का नंबर किसी को एसएमएस मत करना। ऐसा करते ही आपका सिम बंद हो जाएगा और चोर आपके बैंक का सारा पैसा निकाल लेंगे!',
      en: 'Extreme danger! Never SMS your 20-digit SIM number to anyone. It allows fraudsters to clone your phone and steal all your banking OTPs.',
      hinglish: 'Apne SIM card ka 20 digit number kisi ko SMS mat karna beta! Ye SIM Swap fraud hai, poora bank khali ho jayega.',
    },
  },
  {
    id: 'omni-call-digital-arrest',
    category: 'call',
    categoryLabel: 'Voice Call & Digital Arrest',
    title: 'WhatsApp Video Call / Phone Call: "Digital Arrest by Mumbai Cyber Police / CBI"',
    badge: 'Digital Arrest Extortion',
    senderOrDomain: 'WhatsApp Call from uniform avatar (+91 99882 11029)',
    content: 'Phone call followed by WhatsApp video call showing a person wearing a police uniform sitting in a room with Indian flags and "CBI INTERPOL" signboards: "Your Aadhaar card and mobile number were used to send an illegal parcel from Mumbai to Taiwan containing 140 grams of MDMA narcotics and 5 fake passports. An emergency FIR DL-8942 has been filed. You are currently under \'Digital Arrest\'. Keep your camera on and do not disconnect or inform anyone. Transfer ₹3,50,000 to the Supreme Court Security Clearance Account to verify your assets."',
    additionalDetails: 'Shows victim forged arrest warrant on their phone screen. Keeps victim on video call for hours to prevent them from consulting family or lawyers.',
    riskScore: 100,
    riskLevel: 'RED',
    keyRedFlags: [
      'Indian Law has NO provision for "Digital Arrest" — police or CBI never arrest anyone over video call',
      'Police never ask citizens to transfer money to "clear" their name or verify bank accounts',
      'Uses psychological isolation and fear of public shame to force instant RTGS/UPI transfer'
    ],
    regulationsViolated: [
      'Prime Minister Office & Ministry of Home Affairs High-Alert Advisory on Digital Arrest (October 2024)',
      'Indian Penal Code / BNS Section 170/204 (Impersonating public servant) & Section 384 (Extortion)'
    ],
    dadiAdvice: {
      hi: 'भारतीय कानून में "डिजिटल अरेस्ट" नाम की कोई चीज नहीं होती बेटा! असली पुलिस कभी वीडियो कॉल पर पैसे नहीं मांगती। तुरंत फोन काटो और 1930 पर फोन मिलाओ।',
      en: 'There is NO such thing as "Digital Arrest" under Indian law! Real police or CBI will NEVER arrest you over WhatsApp or demand bank transfers. Hang up immediately and dial 1930.',
      hinglish: 'Digital Arrest naam ki koi cheez Indian law me nahi hoti! Police kabhi video call par paise verify nahi karti. Call kato aur 1930 dial karo.',
    },
  },
];

