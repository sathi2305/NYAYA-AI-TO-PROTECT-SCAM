import { LanguageCode } from '../types';
import { DICTIONARY, LANGUAGES } from '../data/mockData';

export const LANGUAGE_STORAGE_KEY = 'nyaya_selected_bhasha';

export interface AppTranslationBundle {
  // Brand & Navbar
  brandSubtitle: string;
  selectBhasha: string;
  activeLanguageLabel: string;
  launchScan: string;
  navHome: string;
  navConnectShields: string;
  navOmnichannel: string;
  navSimulator: string;
  navAiHub: string;
  navScores: string;
  navVeo: string;
  navRadar: string;
  navGuardrails: string;

  // App Quick Bar & Accessibility
  skipToMain: string;
  quickShortcutsLabel: string;
  quickScanWhatsapp: string;
  quickOmnichannel: string;
  quickVoiceAi: string;
  quickDraftScores: string;
  quickThreatRadar: string;
  testRadarAlert: string;
  testScoresUpdate: string;
  loadingModuleTitle: string;
  loadingModuleSub: string;

  // Hero Section
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  heroSubtagline: string;
  heroQuote: string;
  heroCtaSimulator: string;
  heroCtaScores: string;
  heroEscalationLabel: string;
  heroFreeOpenSource: string;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;

  // Home Hub Section
  hubBadge: string;
  hubTitle: string;
  hubSubtitle: string;
  hubActionConnect: string;
  hubActionOmni: string;
  hubActionSimulator: string;
  hubActionAi: string;
  hubActionScores: string;
  hubActionVeo: string;
  hubActionRadar: string;
  hubActionGuardrails: string;

  // 3-in-1 Kavach Section
  kavachKicker: string;
  kavachTitle: string;
  kavachSub: string;
  tabLens: string;
  tabSathi: string;
  tabDost: string;

  // Personas Section
  personasKicker: string;
  personasTitle: string;
  personasSub: string;
  personasPrinciple: string;
  scamTrapLabel: string;
  vulnerabilityLabel: string;
  nyayaProtectionLabel: string;

  // Impact Calculator Section
  impactKicker: string;
  impactTitle: string;
  impactSub: string;
  coverageLabel: string;
  monthlyWealthLabel: string;
  monthlyScansLabel: string;
  unitCostLabel: string;

  // Simulator & SCORES & AI Hub Headers
  simulatorTitle: string;
  simulatorSub: string;
  scoresTitle: string;
  scoresSub: string;
  aiHubTitle: string;
  aiHubSub: string;
  alertFamily: string;
  fileGrievance: string;
  dadiVoicePlay: string;
  dadiVoiceStop: string;

  // Footer
  footerQuote: string;
  emergencyHelplinesTitle: string;
  publicGoodTitle: string;
  zeroBrokingPledge: string;
}

const BASE_EN: AppTranslationBundle = {
  brandSubtitle: 'Investor Protection',
  selectBhasha: 'Select Bhasha (11)',
  activeLanguageLabel: 'Active Language',
  launchScan: 'Launch Scan',
  navHome: 'Home',
  navConnectShields: 'Connect SIM & SMS',
  navOmnichannel: 'Omni-Scam Checker',
  navSimulator: 'WhatsApp Lens',
  navAiHub: 'AI Sathi & Search',
  navScores: 'SCORES Drafter',
  navVeo: 'Veo 3 Video',
  navRadar: 'Bharat Radar',
  navGuardrails: 'Guardrails',

  skipToMain: 'Skip to main content',
  quickShortcutsLabel: 'Quick Shield Shortcuts:',
  quickScanWhatsapp: 'Scan WhatsApp Forward',
  quickOmnichannel: 'Omnichannel Inspector',
  quickVoiceAi: 'Voice-to-Text & AI Hub',
  quickDraftScores: 'Draft SEBI Complaint',
  quickThreatRadar: 'Bharat Threat Radar',
  testRadarAlert: '+ Test Radar Alert',
  testScoresUpdate: '+ Test SCORES Update',
  loadingModuleTitle: 'Loading Suraksha Module...',
  loadingModuleSub: 'Initializing neural fraud protection & regulatory shields',

  heroKicker: 'Bharat-First Investor Protection · IIT BHU • SEBI & NSDL Track · Zero Broking Tips',
  heroTitle: 'NYAYA — Justice For Every Investor.',
  heroLead: 'India added 11Cr+ demat accounts in 4 years. Scammers added a business model.',
  heroSubtagline: DICTIONARY.en.subtagline,
  heroQuote: '“Mere bete ko Telegram pe bola 2 din me paisa double. Urban tools are English-first. Bharat needs a family member who says: ‘Ye fraud hai beta’.”',
  heroCtaSimulator: 'Launch WhatsApp Simulator',
  heroCtaScores: '3-Question SEBI Grievance',
  heroEscalationLabel: 'Official Escalation Links:',
  heroFreeOpenSource: '100% Free & Open-Source',
  stat1: DICTIONARY.en.stat1,
  stat2: DICTIONARY.en.stat2,
  stat3: DICTIONARY.en.stat3,
  stat4: DICTIONARY.en.stat4,

  hubBadge: 'Dedicated Protection Suite',
  hubTitle: 'Explore NYAYA In Dedicated Focus Pages',
  hubSubtitle: 'Every module is tailored into its own focused environment for rapid incident verification, AI inquiry, legal filing, and community education.',
  hubActionConnect: 'Connect Phone & SIM Shield',
  hubActionOmni: 'Open Omnichannel Checker',
  hubActionSimulator: 'Launch WhatsApp Simulator',
  hubActionAi: 'Open AI Intelligence Hub',
  hubActionScores: 'Draft SCORES Complaint',
  hubActionVeo: 'Create Awareness Video',
  hubActionRadar: 'Explore Threat Radar & Quiz',
  hubActionGuardrails: 'View Guardrails & Roadmap',

  kavachKicker: 'Product Architecture • 3-Pillar Defense',
  kavachTitle: DICTIONARY.en.kavachTitle,
  kavachSub: DICTIONARY.en.kavachSub,
  tabLens: '01 Suraksha Lens',
  tabSathi: '02 Samjhao Sathi',
  tabDost: '03 Nyaya Dost',

  personasKicker: 'Ground Research • Tier-2 & Tier-3 India',
  personasTitle: 'Building for Bharat, Not Bombay',
  personasSub: 'They don’t need another trading app or complex candlesticks. They need a protective family member in their pocket.',
  personasPrinciple: 'Governing Principle: “If my Dadi can’t use it in 10 seconds, we failed.”',
  scamTrapLabel: 'The Scam Trap: ',
  vulnerabilityLabel: 'Vulnerability: ',
  nyayaProtectionLabel: 'NYAYA Protection: ',

  impactKicker: 'Quantified Unit Economics • National Scale',
  impactTitle: 'Impact at Bharat Scale',
  impactSub: '1 scam blocked per 1,000 users saves over ₹82 Crore per month across the 41 Crore Indian investor & family ecosystem.',
  coverageLabel: 'Target Investor & Family Coverage:',
  monthlyWealthLabel: 'Monthly Wealth Protected',
  monthlyScansLabel: 'Estimated Monthly Scans',
  unitCostLabel: 'Ultra-Low Unit Cost',

  simulatorTitle: DICTIONARY.en.simulatorTitle,
  simulatorSub: DICTIONARY.en.simulatorSub,
  scoresTitle: DICTIONARY.en.scoresTitle,
  scoresSub: DICTIONARY.en.scoresSub,
  aiHubTitle: 'NYAYA AI Intelligence & Voice Dictation Hub',
  aiHubSub: 'Dictate scam experiences in your mother tongue, consult NYAYA Sathi AI, or verify SEBI registration with live Google Search.',
  alertFamily: DICTIONARY.en.alertFamily,
  fileGrievance: DICTIONARY.en.fileGrievance,
  dadiVoicePlay: DICTIONARY.en.dadiVoicePlay,
  dadiVoiceStop: DICTIONARY.en.dadiVoiceStop,

  footerQuote: '“Investing should feel like NYAYA — Justice, not Jugaad. Let’s make Bharat Surakshit, Samajhdaar, Swavalambi.”',
  emergencyHelplinesTitle: 'Emergency Escalation Helplines',
  publicGoodTitle: 'Public Good Transparency',
  zeroBrokingPledge: 'Zero broking fees · Zero advertisement · 100% Anti-Speculation',
};

const OVERRIDES: Record<LanguageCode, Partial<AppTranslationBundle>> = {
  en: {},
  hi: {
    brandSubtitle: 'निवेशक सुरक्षा कवच',
    selectBhasha: 'भाषा चुनें (11)',
    activeLanguageLabel: 'सक्रिय भाषा',
    launchScan: 'स्कैन शुरू करें',
    navHome: 'मुखपृष्ठ',
    navConnectShields: 'सिम व SMS कवच',
    navOmnichannel: 'सर्वव्यापी जांच',
    navSimulator: 'व्हाट्सऐप लेंस',
    navAiHub: 'AI साथी व वॉयस',
    navScores: 'सेबी शिकायत',
    navVeo: 'Veo 3 वीडियो',
    navRadar: 'भारत थ्रेट रडार',
    navGuardrails: 'संग्यान नियम',

    skipToMain: 'मुख्य सामग्री पर जाएं',
    quickShortcutsLabel: 'त्वरित सुरक्षा शॉर्टकट:',
    quickScanWhatsapp: 'व्हाट्सऐप फॉरवर्ड जांचें',
    quickOmnichannel: 'सर्वव्यापी स्कैम जांच',
    quickVoiceAi: 'बोलकर लिखें व AI हब',
    quickDraftScores: 'सेबी शिकायत बनाएं',
    quickThreatRadar: 'भारत थ्रेट रडार',
    testRadarAlert: '+ रडार अलर्ट टेस्ट',
    testScoresUpdate: '+ सेबी स्टेटस टेस्ट',
    loadingModuleTitle: 'सुरक्षा मॉड्यूल लोड हो रहा है...',
    loadingModuleSub: 'न्यूरल फ्रॉड प्रोटेक्शन और सेबी सुरक्षा कवच तैयार किया जा रहा है',

    heroKicker: 'भारत-प्रथम निवेशक सुरक्षा · IIT BHU • SEBI व NSDL ट्रैक · शून्य ब्रोकिंग टिप्स',
    heroTitle: `NYAYA — ${DICTIONARY.hi.tagline}`,
    heroLead: 'भारत ने 4 साल में 11 करोड़+ डीमैट खाते जोड़े। धोखेबाजों ने इसे धंधा बना लिया।',
    heroSubtagline: DICTIONARY.hi.subtagline,
    heroQuote: '“मेरे बेटे को टेलीग्राम पर बोला 2 दिन में पैसा डबल। भारत को अंग्रेजी फॉर्म नहीं, एक परिवार के सदस्य की जरूरत है जो कहे: ‘ये फ्रॉड है बेटा’।”',
    heroCtaSimulator: 'व्हाट्सऐप सिम्युलेटर खोलें',
    heroCtaScores: '3-सवाल में सेबी शिकायत',
    heroEscalationLabel: 'आधिकारिक हेल्पलाइन:',
    heroFreeOpenSource: '100% निःशुल्क और ओपन-सोर्स',
    stat1: DICTIONARY.hi.stat1,
    stat2: DICTIONARY.hi.stat2,
    stat3: DICTIONARY.hi.stat3,
    stat4: DICTIONARY.hi.stat4,

    hubBadge: 'समर्पित सुरक्षा सुइट',
    hubTitle: 'NYAYA के सभी सुरक्षा टूल्स एक जगह',
    hubSubtitle: 'त्वरित स्कैम जांच, मातृभाषा वॉयस सहायता, कानूनी शिकायत और सामुदायिक जागरूकता के लिए विशेष मॉड्यूल।',
    hubActionConnect: 'फोन और सिम कवच जोड़ें',
    hubActionOmni: 'सर्वव्यापी चेकर खोलें',
    hubActionSimulator: 'व्हाट्सऐप सिम्युलेटर चलाएं',
    hubActionAi: 'AI इंटेलिजेंस हब खोलें',
    hubActionScores: 'SCORES शिकायत लिखें',
    hubActionVeo: 'जागरूकता वीडियो बनाएं',
    hubActionRadar: 'थ्रेट रडार और क्विज़ देखें',
    hubActionGuardrails: 'गार्डरेल्स और रोडमैप देखें',

    kavachKicker: 'उत्पाद संरचना • 3-स्तरीय सुरक्षा',
    kavachTitle: DICTIONARY.hi.kavachTitle,
    kavachSub: DICTIONARY.hi.kavachSub,
    tabLens: '01 सुरक्षा लेंस',
    tabSathi: '02 समझाओ साथी',
    tabDost: '03 न्याय दोस्त',

    personasKicker: 'जमीनी शोध • टियर-2 और टियर-3 भारत',
    personasTitle: 'बॉम्बे नहीं, भारत के लिए निर्मित',
    personasSub: 'उन्हें एक और ट्रेडिंग ऐप की नहीं, अपनी भाषा में समझाने वाले परिवार के सदस्य की जरूरत है।',
    personasPrinciple: 'मूल सिद्धांत: “अगर मेरी दादी इसे 10 सेकंड में इस्तेमाल न कर सकें, तो हम असफल हैं।”',
    scamTrapLabel: 'धोखाधड़ी का जाल: ',
    vulnerabilityLabel: 'जोखिम कारण: ',
    nyayaProtectionLabel: 'NYAYA सुरक्षा: ',

    impactKicker: 'राष्ट्रीय प्रभाव • यूनिट इकोनॉमिक्स',
    impactTitle: 'भारत के पैमाने पर प्रभाव',
    impactSub: 'प्रति 1,000 यूजर्स पर 1 स्कैम रोकने से 41 करोड़ भारतीय परिवारों के हर महीने ₹82 करोड़ से अधिक बचते हैं।',
    coverageLabel: 'लक्षित निवेशक और परिवार कवरेज:',
    monthlyWealthLabel: 'मासिक सुरक्षित धनराशि',
    monthlyScansLabel: 'अनुमानित मासिक स्कैन',
    unitCostLabel: 'न्यूनतम प्रति स्कैन लागत',

    simulatorTitle: DICTIONARY.hi.simulatorTitle,
    simulatorSub: DICTIONARY.hi.simulatorSub,
    scoresTitle: DICTIONARY.hi.scoresTitle,
    scoresSub: DICTIONARY.hi.scoresSub,
    aiHubTitle: 'NYAYA AI इंटेलिजेंस और वॉयस डिक्टेशन हब',
    aiHubSub: 'अपनी मातृभाषा में बोलकर धोखाधड़ी की घटना दर्ज करें, AI साथी से पूछें, या गूगल सर्च से सेबी रजिस्ट्रेशन जांचें।',
    alertFamily: DICTIONARY.hi.alertFamily,
    fileGrievance: DICTIONARY.hi.fileGrievance,
    dadiVoicePlay: DICTIONARY.hi.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.hi.dadiVoiceStop,

    footerQuote: '“निवेश जुगाड़ नहीं, न्याय जैसा लगना चाहिए। आइए भारत को सुरक्षित, समझदार और स्वावलंबी बनाएं।”',
    emergencyHelplinesTitle: 'आपातकालीन शिकायत हेल्पलाइन',
    publicGoodTitle: 'जनहित पारदर्शिता',
    zeroBrokingPledge: 'शून्य ब्रोकिंग शुल्क · शून्य विज्ञापन · 100% सट्टेबाजी-मुक्त',
  },
  hinglish: {
    brandSubtitle: 'Investor Suraksha',
    selectBhasha: 'Bhasha Chunein (11)',
    activeLanguageLabel: 'Active Bhasha',
    launchScan: 'Scan Karein',
    navHome: 'Home',
    navConnectShields: 'SIM & SMS Kavach',
    navOmnichannel: 'Omni-Scam Checker',
    navSimulator: 'WhatsApp Lens',
    navAiHub: 'AI Sathi & Voice',
    navScores: 'SCORES Complaint',
    navVeo: 'Veo 3 Video',
    navRadar: 'Bharat Radar',
    navGuardrails: 'Guardrails',

    quickShortcutsLabel: 'Quick Suraksha Shortcuts:',
    quickScanWhatsapp: 'WhatsApp Forward Check Karein',
    quickOmnichannel: 'Omnichannel Scam Check',
    quickVoiceAi: 'Bolkar Likhein & AI Hub',
    quickDraftScores: 'SEBI Complaint Banayein',
    quickThreatRadar: 'Bharat Threat Radar',

    heroTitle: `NYAYA — ${DICTIONARY.hinglish.tagline}`,
    heroLead: 'India ne 4 saal me 11Cr+ demat accounts jode. Scammers ne isey business model bana liya.',
    heroSubtagline: DICTIONARY.hinglish.subtagline,
    heroCtaSimulator: 'WhatsApp Simulator Chalayein',
    heroCtaScores: '3-Sawal SEBI Complaint',
    stat1: DICTIONARY.hinglish.stat1,
    stat2: DICTIONARY.hinglish.stat2,
    stat3: DICTIONARY.hinglish.stat3,
    stat4: DICTIONARY.hinglish.stat4,

    hubBadge: 'Full Protection Suite',
    hubTitle: 'NYAYA Ke Dedicated Suraksha Tools',
    hubSubtitle: 'Har scam vector ko check karne, voice me complaint bolne aur SEBI SCORES filing ke liye dedicated tools.',
    kavachTitle: DICTIONARY.hinglish.kavachTitle,
    kavachSub: DICTIONARY.hinglish.kavachSub,
    simulatorTitle: DICTIONARY.hinglish.simulatorTitle,
    simulatorSub: DICTIONARY.hinglish.simulatorSub,
    scoresTitle: DICTIONARY.hinglish.scoresTitle,
    scoresSub: DICTIONARY.hinglish.scoresSub,
    alertFamily: DICTIONARY.hinglish.alertFamily,
    fileGrievance: DICTIONARY.hinglish.fileGrievance,
    dadiVoicePlay: DICTIONARY.hinglish.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.hinglish.dadiVoiceStop,
  },
  ta: {
    brandSubtitle: 'முதலீட்டாளர் பாதுகாப்பு',
    selectBhasha: 'மொழியைத் தேர்ந்தெடுக்கவும் (11)',
    launchScan: 'ஸ்கேன் செய்',
    navHome: 'முகப்பு',
    navConnectShields: 'சிம் & SMS கவசம்',
    navOmnichannel: 'பல்துறை சோதனை',
    navSimulator: 'வாட்ஸ்அப் லென்ஸ்',
    navAiHub: 'AI தோழன் & குரல்',
    navScores: 'செபி புகார்',
    navVeo: 'Veo 3 வீடியோ',
    navRadar: 'பாரத் ரேடார்',
    navGuardrails: 'பாதுகாப்பு விதிகள்',

    quickShortcutsLabel: 'விரைவு பாதுகாப்பு வழிகள்:',
    quickScanWhatsapp: 'வாட்ஸ்அப் செய்தியை சோதிக்க',
    quickOmnichannel: 'மோசடி பரிசோதகர்',
    quickVoiceAi: 'குரல் பதிவு & AI மையம்',
    quickDraftScores: 'செபி புகார் எழுதுக',
    quickThreatRadar: 'பாரத் அச்சுறுத்தல் ரேடார்',

    heroTitle: `NYAYA — ${DICTIONARY.ta.tagline}`,
    heroLead: 'இந்தியாவில் 4 ஆண்டுகளில் 11 கோடி+ டீமேட் கணக்குகள் தொடங்கப்பட்டுள்ளன.',
    heroSubtagline: DICTIONARY.ta.subtagline,
    heroCtaSimulator: 'வாட்ஸ்அப் சிமுலேட்டரைத் திற',
    heroCtaScores: '3-கேள்வி செபி புகார்',
    stat1: DICTIONARY.ta.stat1,
    stat2: DICTIONARY.ta.stat2,
    stat3: DICTIONARY.ta.stat3,
    stat4: DICTIONARY.ta.stat4,

    hubTitle: 'நியாயா பாதுகாப்பு கருவிகள்',
    kavachTitle: DICTIONARY.ta.kavachTitle,
    kavachSub: DICTIONARY.ta.kavachSub,
    simulatorTitle: DICTIONARY.ta.simulatorTitle,
    simulatorSub: DICTIONARY.ta.simulatorSub,
    scoresTitle: DICTIONARY.ta.scoresTitle,
    scoresSub: DICTIONARY.ta.scoresSub,
    alertFamily: DICTIONARY.ta.alertFamily,
    fileGrievance: DICTIONARY.ta.fileGrievance,
    dadiVoicePlay: DICTIONARY.ta.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.ta.dadiVoiceStop,
  },
  mr: {
    brandSubtitle: 'गुंतवणूकदार सुरक्षा कवच',
    selectBhasha: 'भाषा निवडा (11)',
    launchScan: 'स्कॅन करा',
    navHome: 'मुख्यपृष्ठ',
    navConnectShields: 'सिम व SMS कवच',
    navOmnichannel: 'सर्वव्यापी तपासणी',
    navSimulator: 'व्हॉट्सॲप लेन्स',
    navAiHub: 'AI साथी व आवाज',
    navScores: 'सेबी तक्रार',
    navVeo: 'Veo 3 व्हिडिओ',
    navRadar: 'भारत रडार',
    navGuardrails: 'सुरक्षा नियम',

    quickShortcutsLabel: 'जलद सुरक्षा शॉर्टकट:',
    quickScanWhatsapp: 'व्हॉट्सॲप मेसेज तपासा',
    quickOmnichannel: 'सर्वव्यापी फसवणूक तपासणी',
    quickVoiceAi: 'आवाजाने टाइप करा व AI हब',
    quickDraftScores: 'सेबी तक्रार तयार करा',
    quickThreatRadar: 'भारत थ्रेट रडार',

    heroTitle: `NYAYA — ${DICTIONARY.mr.tagline}`,
    heroLead: 'भारताने ४ वर्षांत ११ कोटी+ डिमॅट खाती जोडली. फसवणूक करणाऱ्यांपासून कुटुंबाचे रक्षण करा.',
    heroSubtagline: DICTIONARY.mr.subtagline,
    heroCtaSimulator: 'व्हॉट्सॲप सिम्युलेटर सुरू करा',
    heroCtaScores: '३-प्रश्नांत सेबी तक्रार',
    stat1: DICTIONARY.mr.stat1,
    stat2: DICTIONARY.mr.stat2,
    stat3: DICTIONARY.mr.stat3,
    stat4: DICTIONARY.mr.stat4,

    hubTitle: 'NYAYA सुरक्षा साधने',
    kavachTitle: DICTIONARY.mr.kavachTitle,
    kavachSub: DICTIONARY.mr.kavachSub,
    simulatorTitle: DICTIONARY.mr.simulatorTitle,
    simulatorSub: DICTIONARY.mr.simulatorSub,
    scoresTitle: DICTIONARY.mr.scoresTitle,
    scoresSub: DICTIONARY.mr.scoresSub,
    alertFamily: DICTIONARY.mr.alertFamily,
    fileGrievance: DICTIONARY.mr.fileGrievance,
    dadiVoicePlay: DICTIONARY.mr.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.mr.dadiVoiceStop,
  },
  bn: {
    brandSubtitle: 'বিনিয়োগকারী সুরক্ষা',
    selectBhasha: 'ভাষা নির্বাচন করুন (11)',
    launchScan: 'স্ক্যান করুন',
    navHome: 'হোম',
    navConnectShields: 'সিম ও SMS কবচ',
    navOmnichannel: 'সর্বব্যাপী যাচাই',
    navSimulator: 'হোয়াটসঅ্যাপ লেন্স',
    navAiHub: 'AI সাথী ও ভয়েস',
    navScores: 'সেবি অভিযোগ',
    navVeo: 'Veo 3 ভিডিও',
    navRadar: 'ভারত রাডার',
    navGuardrails: 'সুরক্ষা নীতি',

    quickShortcutsLabel: 'দ্রুত সুরক্ষা শর্টকাট:',
    quickScanWhatsapp: 'হোয়াটসঅ্যাপ মেসেজ যাচাই',
    quickOmnichannel: 'অমনিচ্যানেল স্ক্যাম চেকার',
    quickVoiceAi: 'কণ্ঠে লিখুন ও AI হাব',
    quickDraftScores: 'সেবি অভিযোগ তৈরি করুন',
    quickThreatRadar: 'ভারত থ্রেট রাডার',

    heroTitle: `NYAYA — ${DICTIONARY.bn.tagline}`,
    heroLead: 'ভারতে ৪ বছরে ১১ কোটি+ ডিম্যাট অ্যাকাউন্ট খোলা হয়েছে। প্রতারকদের হাত থেকে পরিবারকে বাঁচান।',
    heroSubtagline: DICTIONARY.bn.subtagline,
    heroCtaSimulator: 'হোয়াটসঅ্যাপ সিমুলেটর খুলুন',
    heroCtaScores: '৩-প্রশ্নে সেবি অভিযোগ',
    stat1: DICTIONARY.bn.stat1,
    stat2: DICTIONARY.bn.stat2,
    stat3: DICTIONARY.bn.stat3,
    stat4: DICTIONARY.bn.stat4,

    hubTitle: 'NYAYA সুরক্ষা মডিউলসমূহ',
    kavachTitle: DICTIONARY.bn.kavachTitle,
    kavachSub: DICTIONARY.bn.kavachSub,
    simulatorTitle: DICTIONARY.bn.simulatorTitle,
    simulatorSub: DICTIONARY.bn.simulatorSub,
    scoresTitle: DICTIONARY.bn.scoresTitle,
    scoresSub: DICTIONARY.bn.scoresSub,
    alertFamily: DICTIONARY.bn.alertFamily,
    fileGrievance: DICTIONARY.bn.fileGrievance,
    dadiVoicePlay: DICTIONARY.bn.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.bn.dadiVoiceStop,
  },
  te: {
    brandSubtitle: 'పెట్టుబడిదారుల రక్షణ',
    selectBhasha: 'భాషను ఎంచుకోండి (11)',
    launchScan: 'స్కాన్ చేయండి',
    navHome: 'హోమ్',
    navConnectShields: 'సిమ్ & SMS కవచం',
    navOmnichannel: 'ఆమ్నీ-స్కామ్ చెకర్',
    navSimulator: 'వాట్సాప్ లెన్స్',
    navAiHub: 'AI సాథీ & వాయిస్',
    navScores: 'సెబీ ఫిర్యాదు',
    navVeo: 'Veo 3 వీడియో',
    navRadar: 'భారత్ రాడార్',
    navGuardrails: 'భద్రతా నియమాలు',

    quickShortcutsLabel: 'త్వరిత రక్షణ షార్ట్‌కట్‌లు:',
    quickScanWhatsapp: 'వాట్సాప్ మెసేజ్ తనిఖీ',
    quickOmnichannel: 'ఆమ్నీఛానల్ స్కామ్ తనిఖీ',
    quickVoiceAi: 'వాయిస్-టు-టెక్స్ట్ & AI హబ్',
    quickDraftScores: 'సెబీ ఫిర్యాదు రాయండి',
    quickThreatRadar: 'భారత్ థ్రెట్ రాడార్',

    heroTitle: `NYAYA — ${DICTIONARY.te.tagline}`,
    heroLead: 'భారతదేశంలో 4 ఏళ్లలో 11 కోట్లకు పైగా డీమ్యాట్ ఖాతాలు చేరాయి.',
    heroSubtagline: DICTIONARY.te.subtagline,
    heroCtaSimulator: 'వాట్సాప్ సిమ్యులేటర్ తెరవండి',
    heroCtaScores: '3-ప్రశ్నల సెబీ ఫిర్యాదు',
    stat1: DICTIONARY.te.stat1,
    stat2: DICTIONARY.te.stat2,
    stat3: DICTIONARY.te.stat3,
    stat4: DICTIONARY.te.stat4,

    hubTitle: 'NYAYA రక్షణ సాధనాలు',
    kavachTitle: DICTIONARY.te.kavachTitle,
    kavachSub: DICTIONARY.te.kavachSub,
    simulatorTitle: DICTIONARY.te.simulatorTitle,
    simulatorSub: DICTIONARY.te.simulatorSub,
    scoresTitle: DICTIONARY.te.scoresTitle,
    scoresSub: DICTIONARY.te.scoresSub,
    alertFamily: DICTIONARY.te.alertFamily,
    fileGrievance: DICTIONARY.te.fileGrievance,
    dadiVoicePlay: DICTIONARY.te.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.te.dadiVoiceStop,
  },
  gu: {
    brandSubtitle: 'રોકાણકાર સુરક્ષા કવચ',
    selectBhasha: 'ભાષા પસંદ કરો (11)',
    launchScan: 'સ્કેન કરો',
    navHome: 'હોમ',
    navConnectShields: 'સિમ અને SMS કવચ',
    navOmnichannel: 'સર્વવ્યાપી તપાસ',
    navSimulator: 'વોટ્સએપ લેન્સ',
    navAiHub: 'AI સાથી અને વોઇસ',
    navScores: 'સેબી ફરિયાદ',
    navVeo: 'Veo 3 વિડીયો',
    navRadar: 'ભારત રડાર',
    navGuardrails: 'સુરક્ષા નિયમો',

    quickShortcutsLabel: 'ઝડપી સુરક્ષા શોર્ટકટ્સ:',
    quickScanWhatsapp: 'વોટ્સએપ મેસેજ તપાસો',
    quickOmnichannel: 'ઓમ્નીચેનલ સ્કેમ ચેકર',
    quickVoiceAi: 'બોલીને લખો અને AI હબ',
    quickDraftScores: 'સેબી ફરિયાદ બનાવો',
    quickThreatRadar: 'ભારત થ્રેટ રડાર',

    heroTitle: `NYAYA — ${DICTIONARY.gu.tagline}`,
    heroLead: 'ભારતમાં ૪ વર્ષમાં ૧૧ કરોડ+ ડીમેટ ખાતા ઉમેરાયા. છેતરપિંડીથી પરિવારનું રક્ષણ કરો.',
    heroSubtagline: DICTIONARY.gu.subtagline,
    heroCtaSimulator: 'વોટ્સએપ સિમ્યુલેટર ખોલો',
    heroCtaScores: '૩-પ્રશ્નોમાં સેબી ફરિયાદ',
    stat1: DICTIONARY.gu.stat1,
    stat2: DICTIONARY.gu.stat2,
    stat3: DICTIONARY.gu.stat3,
    stat4: DICTIONARY.gu.stat4,

    hubTitle: 'NYAYA સુરક્ષા મોડ્યુલ્સ',
    kavachTitle: DICTIONARY.gu.kavachTitle,
    kavachSub: DICTIONARY.gu.kavachSub,
    simulatorTitle: DICTIONARY.gu.simulatorTitle,
    simulatorSub: DICTIONARY.gu.simulatorSub,
    scoresTitle: DICTIONARY.gu.scoresTitle,
    scoresSub: DICTIONARY.gu.scoresSub,
    alertFamily: DICTIONARY.gu.alertFamily,
    fileGrievance: DICTIONARY.gu.fileGrievance,
    dadiVoicePlay: DICTIONARY.gu.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.gu.dadiVoiceStop,
  },
  kn: {
    brandSubtitle: 'ಹೂಡಿಕೆದಾರರ ಸುರಕ್ಷಾ ಕವಚ',
    selectBhasha: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ (11)',
    launchScan: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    navHome: 'ಮುಖಪುಟ',
    navConnectShields: 'ಸಿಮ್ & SMS ಕವಚ',
    navOmnichannel: 'ಸರ್ವവ്യാಪಿ ತಪಾಸಣೆ',
    navSimulator: 'ವಾಟ್ಸಾಪ್ ಲೆನ್ಸ್',
    navAiHub: 'AI ಸಾಥಿ & ಧ್ವನಿ',
    navScores: 'ಸೆಬಿ ದೂರು',
    navVeo: 'Veo 3 ವೀಡಿಯೊ',
    navRadar: 'ಭಾರತ್ ರಾಡಾರ್',
    navGuardrails: 'ಸುರಕ್ಷಾ ನಿಯಮಗಳು',

    quickShortcutsLabel: 'ತ್ವರಿತ ಸುರಕ್ಷಾ ಶಾರ್ಟ್‌ಕಟ್‌ಗಳು:',
    quickScanWhatsapp: 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ',
    quickOmnichannel: 'ಆಮ್ನಿಚಾನೆಲ್ ಸ್ಕ್ಯಾಮ್ ಚೆಕರ್',
    quickVoiceAi: 'ಧ್ವನಿ ಬರಹ & AI ಹಬ್',
    quickDraftScores: 'ಸೆಬಿ ದೂರು ರಚಿಸಿ',
    quickThreatRadar: 'ಭಾರತ್ ಥ್ರೆಟ್ ರಾಡಾರ್',

    heroTitle: `NYAYA — ${DICTIONARY.kn.tagline}`,
    heroLead: 'ಭಾರತದಲ್ಲಿ ೪ ವರ್ಷಗಳಲ್ಲಿ ೧೧ ಕೋಟಿ+ ಡಿಮ್ಯಾಟ್ ಖಾತೆಗಳು ತೆರೆಯಲ್ಪಟ್ಟಿವೆ.',
    heroSubtagline: DICTIONARY.kn.subtagline,
    heroCtaSimulator: 'ವಾಟ್ಸಾಪ್ ಸಿಮ್ಯುಲೇಟರ್ ತೆರೆಯಿರಿ',
    heroCtaScores: '೩-ಪ್ರಶ್ನೆಗಳ ಸೆಬಿ ದೂರು',
    stat1: DICTIONARY.kn.stat1,
    stat2: DICTIONARY.kn.stat2,
    stat3: DICTIONARY.kn.stat3,
    stat4: DICTIONARY.kn.stat4,

    hubTitle: 'NYAYA ಸುರಕ್ಷಾ ಸಾಧನಗಳು',
    kavachTitle: DICTIONARY.kn.kavachTitle,
    kavachSub: DICTIONARY.kn.kavachSub,
    simulatorTitle: DICTIONARY.kn.simulatorTitle,
    simulatorSub: DICTIONARY.kn.simulatorSub,
    scoresTitle: DICTIONARY.kn.scoresTitle,
    scoresSub: DICTIONARY.kn.scoresSub,
    alertFamily: DICTIONARY.kn.alertFamily,
    fileGrievance: DICTIONARY.kn.fileGrievance,
    dadiVoicePlay: DICTIONARY.kn.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.kn.dadiVoiceStop,
  },
  pa: {
    brandSubtitle: 'ਨਿਵੇਸ਼ਕ ਸੁਰੱਖਿਆ ਕਵਚ',
    selectBhasha: 'ਭਾਸ਼ਾ ਚੁਣੋ (11)',
    launchScan: 'ਸਕੈਨ ਕਰੋ',
    navHome: 'ਮੁੱਖ ਪੰਨਾ',
    navConnectShields: 'ਸਿਮ ਤੇ SMS ਕਵਚ',
    navOmnichannel: 'ਸਰਬ-ਵਿਆਪੀ ਜਾਂਚ',
    navSimulator: 'ਵਟਸਐਪ ਲੈਂਸ',
    navAiHub: 'AI ਸਾਥੀ ਤੇ ਆਵਾਜ਼',
    navScores: 'ਸੇਬੀ ਸ਼ਿਕਾਇਤ',
    navVeo: 'Veo 3 ਵੀਡੀਓ',
    navRadar: 'ਭਾਰਤ ਰਡਾਰ',
    navGuardrails: 'ਸੁਰੱਖਿਆ ਨਿਯਮ',

    quickShortcutsLabel: 'ਤੁਰੰਤ ਸੁਰੱਖਿਆ ਸ਼ਾਰਟਕੱਟ:',
    quickScanWhatsapp: 'ਵਟਸਐਪ ਮੈਸੇਜ ਜਾਂਚੋ',
    quickOmnichannel: 'ਓਮਨੀਚੈਨਲ ਸਕੈਮ ਚੈਕਰ',
    quickVoiceAi: 'ਬੋਲ ਕੇ ਲਿਖੋ ਤੇ AI ਹੱਬ',
    quickDraftScores: 'ਸੇਬੀ ਸ਼ਿਕਾਇਤ ਬਣਾਓ',
    quickThreatRadar: 'ਭਾਰਤ ਥ੍ਰੈਟ ਰਡਾਰ',

    heroTitle: `NYAYA — ${DICTIONARY.pa.tagline}`,
    heroLead: 'ਭਾਰਤ ਨੇ 4 ਸਾਲਾਂ ਵਿੱਚ 11 ਕਰੋੜ+ ਡੀਮੈਟ ਖਾਤੇ ਜੋੜੇ। ਧੋਖੇਬਾਜ਼ਾਂ ਤੋਂ ਪਰਿਵਾਰ ਨੂੰ ਬਚਾਓ।',
    heroSubtagline: DICTIONARY.pa.subtagline,
    heroCtaSimulator: 'ਵਟਸਐਪ ਸਿਮੂਲੇਟਰ ਖੋਲ੍ਹੋ',
    heroCtaScores: '3-ਸਵਾਲ ਸੇਬੀ ਸ਼ਿਕਾਇਤ',
    stat1: DICTIONARY.pa.stat1,
    stat2: DICTIONARY.pa.stat2,
    stat3: DICTIONARY.pa.stat3,
    stat4: DICTIONARY.pa.stat4,

    hubTitle: 'NYAYA ਸੁਰੱਖਿਆ ਟੂਲਸ',
    kavachTitle: DICTIONARY.pa.kavachTitle,
    kavachSub: DICTIONARY.pa.kavachSub,
    simulatorTitle: DICTIONARY.pa.simulatorTitle,
    simulatorSub: DICTIONARY.pa.simulatorSub,
    scoresTitle: DICTIONARY.pa.scoresTitle,
    scoresSub: DICTIONARY.pa.scoresSub,
    alertFamily: DICTIONARY.pa.alertFamily,
    fileGrievance: DICTIONARY.pa.fileGrievance,
    dadiVoicePlay: DICTIONARY.pa.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.pa.dadiVoiceStop,
  },
  ml: {
    brandSubtitle: 'നിക്ഷേപക സുരക്ഷാ കവചം',
    selectBhasha: 'ഭാഷ തിരഞ്ഞെടുക്കുക (11)',
    launchScan: 'സ്കാൻ ചെയ്യുക',
    navHome: 'ഹോം',
    navConnectShields: 'സിം & SMS കവചം',
    navOmnichannel: 'ഓമ്‌നി-സ്കാം ചെക്കർ',
    navSimulator: 'വാട്ട്‌സ്ആപ്പ് ലെൻസ്',
    navAiHub: 'AI সাথী & വോയ്‌സ്',
    navScores: 'സെബി പരാതി',
    navVeo: 'Veo 3 വീഡിയോ',
    navRadar: 'ഭാരത് റഡാർ',
    navGuardrails: 'സുരക്ഷാ നിയമങ്ങൾ',

    quickShortcutsLabel: 'വേഗത്തിലുള്ള സുരക്ഷാ ഷോർട്ട്കട്ടുകൾ:',
    quickScanWhatsapp: 'വാട്ട്‌സ്ആപ്പ് സന്ദേശം പരിശോധിക്കുക',
    quickOmnichannel: 'ഓമ്‌നിചാനൽ തട്ടിപ്പ് പരിശോധന',
    quickVoiceAi: 'വോയ്‌സ്-ടു-ടെക്‌സ്റ്റ് & AI ഹബ്',
    quickDraftScores: 'സെബി പരാതി തയ്യാറാക്കുക',
    quickThreatRadar: 'ഭാരത് ത്രെറ്റ് റഡാർ',

    heroTitle: `NYAYA — ${DICTIONARY.ml.tagline}`,
    heroLead: '4 വർഷത്തിനുള്ളിൽ ഇന്ത്യയിൽ 11 കോടിയിലധികം ഡീമാറ്റ് അക്കൗണ്ടുകൾ ചേർത്തു.',
    heroSubtagline: DICTIONARY.ml.subtagline,
    heroCtaSimulator: 'വാട്ട്‌സ്ആപ്പ് സിമുലേറ്റർ തുറക്കുക',
    heroCtaScores: '3-ചോദ്യ സെബി പരാതി',
    stat1: DICTIONARY.ml.stat1,
    stat2: DICTIONARY.ml.stat2,
    stat3: DICTIONARY.ml.stat3,
    stat4: DICTIONARY.ml.stat4,

    hubTitle: 'NYAYA സുരക്ഷാ സംവിധാനങ്ങൾ',
    kavachTitle: DICTIONARY.ml.kavachTitle,
    kavachSub: DICTIONARY.ml.kavachSub,
    simulatorTitle: DICTIONARY.ml.simulatorTitle,
    simulatorSub: DICTIONARY.ml.simulatorSub,
    scoresTitle: DICTIONARY.ml.scoresTitle,
    scoresSub: DICTIONARY.ml.scoresSub,
    alertFamily: DICTIONARY.ml.alertFamily,
    fileGrievance: DICTIONARY.ml.fileGrievance,
    dadiVoicePlay: DICTIONARY.ml.dadiVoicePlay,
    dadiVoiceStop: DICTIONARY.ml.dadiVoiceStop,
  },
};

/**
 * Returns the complete localized string dictionary for the given LanguageCode,
 * falling back cleanly to English (`BASE_EN`) for any unspecified keys.
 */
export function getStrings(lang: LanguageCode): AppTranslationBundle {
  return {
    ...BASE_EN,
    ...(OVERRIDES[lang] || {}),
  };
}

/**
 * Simple key-based localization lookup utility.
 */
export function t(lang: LanguageCode, key: keyof AppTranslationBundle): string {
  const bundle = OVERRIDES[lang];
  if (bundle && bundle[key]) {
    return bundle[key] as string;
  }
  return BASE_EN[key];
}

/**
 * Maps NYAYA LanguageCode to BCP-47 speech recognition / synthesis locale tag.
 */
export function getSpeechLocale(lang: LanguageCode): string {
  const map: Record<LanguageCode, string> = {
    hi: 'hi-IN',
    en: 'en-IN',
    hinglish: 'en-IN',
    ta: 'ta-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    te: 'te-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
    pa: 'pa-IN',
    ml: 'ml-IN',
  };
  return map[lang] || 'hi-IN';
}

/**
 * Returns metadata for the active language option.
 */
export function getLanguageOption(lang: LanguageCode) {
  return LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
}
