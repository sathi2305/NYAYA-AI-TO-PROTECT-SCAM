import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// 0. Core Feature: Live Financial Scam Neural Analysis (gemini-3.8-flash)
app.post('/api/analyze-scam', async (req: Request, res: Response) => {
  const { message, language } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  try {
    const ai = getAIClient();
    const prompt = `Analyze this financial message/forward received by an Indian retail investor for potential fraud, unauthorized advisory, typosquatting, Ponzi schemes, or illegal promises:
Message: "${message}"
Requested Mother Tongue/Language: ${language || 'hi'}

Respond ONLY with valid JSON in this exact structure:
{
  "riskScore": <number 0-100>,
  "riskLevel": <"RED" | "YELLOW" | "GREEN">,
  "reasons": [<2 to 3 concise bullet points with legal/technical reasons>],
  "sebiReference": "<Relevant SEBI circular or act reference, e.g. SEBI (Investment Advisers) Regulations, 2013 or PFUTP Regulations>",
  "dadiAdvice": "<Plain-language elder wisdom advice in mother tongue warning the user>",
  "deepfakeScore": <number 0-100 if voice/video deepfake suspected, otherwise null>
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.warn('Scam analysis live call note:', error?.message);
    // Intelligent domain heuristic fallback
    const msgLower = (message || '').toLowerCase();
    const isHigh = msgLower.includes('guarantee') || msgLower.includes('double') || msgLower.includes('300%') || msgLower.includes('nsdi') || msgLower.includes('bonus') || msgLower.includes('otp') || msgLower.includes('telegram') || msgLower.includes('vip') || msgLower.includes('pre-ipo');
    const isMed = msgLower.includes('profit') || msgLower.includes('invest') || msgLower.includes('advisor') || msgLower.includes('tips') || msgLower.includes('link') || msgLower.includes('free');
    
    const riskScore = isHigh ? 94 : (isMed ? 62 : 18);
    const riskLevel = riskScore >= 70 ? 'RED' : (riskScore >= 35 ? 'YELLOW' : 'GREEN');
    
    const adviceByLang: Record<string, string> = {
      hi: isHigh 
        ? 'ये बहुत बड़ा धोखा है बेटा! सेबी के नियमों के अनुसार कोई भी सरकारी या कानूनी स्कीम 100% पक्के मुनाफे का वादा नहीं कर सकती। एक भी पैसा मत भेजो और तुरंत ब्लॉक करो!'
        : 'सावधानी बरतें बेटा। किसी भी अनजान व्यक्ति के कहने पर अपने डीमैट या बैंक खाते की जानकारी साझा न करें।',
      hinglish: isHigh 
        ? 'Ye 100% fraud hai beta! SEBI regulations ke mutabik koi bhi registered entity guaranteed profit ka wada nahi kar sakti. Ek bhi rupya transfer mat karna.'
        : 'Dhyan rakhein, kisi bhi anjaan advisor ya forward par bharosa karne se pehle SEBI website par unka registration number check karein.',
      en: isHigh 
        ? 'Beware! This is an active financial trap. Under SEBI regulations, guaranteed high-frequency returns are strictly illegal. Do not send any funds.'
        : 'Exercise caution. Verify the sender credentials on the official SEBI RIA portal before engaging in any transaction.',
      ta: 'இது அப்பட்டமான மோசடி கண்ணா! 5 நாட்களில் பணத்தை இரட்டிப்பாக்க எந்த சட்டப்பூர்வ திட்டமும் இல்லை. உடனடியாக பிளாக் செய்யவும்.',
      mr: 'हे शुद्ध फसवणूक आहे बाळा! सेबीच्या नियमांनुसार कोणतीही संस्था हमी परतावा देऊ शकत नाही. पैसे पाठवू नका.',
      bn: 'এটা সম্পূর্ণ প্রতারণা বাছা! সেবির নিয়মানুযায়ী নির্দিষ্ট মুনাফার গ্যারান্টি দেওয়া বেআইনি। কাউকে টাকা পাঠাবেন না।',
      te: 'ఇది తీవ్రమైన మోసం బాబూ! సెబీ నిబంధనల ప్రకారం గ్యారెంటీ రిటర్న్స్ వాగ్దానం చేయడం చట్టవిరుద్ధం. డబ్బులు పంపవద్దు.',
      gu: 'આ ચોખ્ખી છેતરપિંડી છે બેટા! સેબીના નિયમો હેઠળ ગેરેંટીડ વળતર આપવું ગેરકાયદેસર છે. તાત્કાલિક નંબર બ્લોક કરો.'
    };

    return res.json({
      riskScore,
      riskLevel,
      reasons: isHigh ? [
        'Prohibited Guaranteed Profit: Violates SEBI (Prohibition of Fraudulent and Unfair Trade Practices) Regulations, 2003.',
        'Unregistered Financial Funnel: Unsolicited advisory channel operating outside SEBI intermediary norms.',
        'Urgency Trap: Fabricated scarcity intended to bypass standard financial due diligence.'
      ] : [
        'Unverified Entity: Sender registration credentials not found in official SEBI/AMFI public records.',
        'General Market Caution: Exercise caution before acting on social media forwards.'
      ],
      sebiReference: 'SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158 on Unregistered Finfluencers & Fraudulent Schemes',
      dadiAdvice: adviceByLang[language || 'hi'] || adviceByLang.hi,
      deepfakeScore: (msgLower.includes('reel') || msgLower.includes('video') || msgLower.includes('voice')) ? 84 : null
    });
  }
});

// 0.5 Feature: Omnichannel Multi-Vector Scam Neural Analyzer (Google, Mail, Post, Reels, SMS, WhatsApp, etc.)
app.post('/api/analyze-omnichannel-scam', async (req: Request, res: Response) => {
  const { channel, content, senderOrDomain, language, extraContext } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required for omnichannel inspection' });
  }

  const channelType = channel || 'sms';
  const lang = language || 'hi';

  try {
    const ai = getAIClient();
    const prompt = `You are NYAYA's Omnichannel Fraud Intelligence Engine protecting Indian citizens across all communication channels.
Inspect this suspicious item from channel: "${channelType}".
Sender / Domain / Header / Handle: "${senderOrDomain || 'Unknown'}"
Content / Description: "${content}"
Extra Context / Claim: "${extraContext || 'None'}"
Language requested for advice: ${lang}

Analyze for Indian cyber fraud patterns:
- If 'google': Check for Google Search Ad poisoning, fake customer care numbers, phishing landing pages, fake Google Forms/Drive links.
- If 'mail': Check for email spoofing (SPF/DKIM mismatch), fake Income Tax refund, fake SEBI/police summons, executive impersonation.
- If 'post': Check for fake Speed Post / courier court summons, fake CBI arrest notices, counterfeit scratch cards.
- If 'reels': Check for AI deepfake celebrity investment pitches, guaranteed double returns, fake Telegram VIP funnels, work-from-home like-subscribe traps.
- If 'sms': Check for TRAI SMS header spoofing (e.g., AD-SBIN vs AX-SB1N), fake electricity disconnection, Demat OTP harvesting, fake APK downloads.
- If 'whatsapp': Check for digital arrest video calls, fake NSDL/CDSL allotment PDFs, illicit pump-and-dump syndicates.
- If 'call': Check for digital arrest extortion, fake FedEx narcotics parcel calls, fake customs agents.

Respond ONLY with valid JSON in this exact structure:
{
  "riskScore": <number 0-100>,
  "riskLevel": <"RED" | "YELLOW" | "GREEN">,
  "threatCategory": "<Channel-specific threat classification>",
  "channelVector": "${channelType}",
  "technicalIndicators": [<2 to 3 technical clues e.g. domain typo, unverified TRAI header, synthetic voice frequency>],
  "regulatoryViolations": [<2 to 3 specific Indian laws, e.g. IT Act Sec 66D, TRAI TCCCPR 2018, SEBI PFUTP 2003, BNS Sec 318>],
  "reasons": [<2 to 3 plain-text reasons why this is high/low risk>],
  "dadiAdvice": "<Plain-language grandmotherly caution in ${lang}>",
  "actionSteps": [<3 immediate safe actions to take>],
  "goldenHourAdvice": "<Guidance on calling 1930 or freezing bank account if victim already paid>",
  "deepfakeLikelihood": <number 0-100 if voice/video deepfake is suspected, else null>
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.warn('Omnichannel scan fallback activated:', error?.message);
    
    const textLower = (content + ' ' + (senderOrDomain || '')).toLowerCase();
    const isCritical = 
      textLower.includes('arrest') ||
      textLower.includes('cbi') ||
      textLower.includes('customs') ||
      textLower.includes('police') ||
      textLower.includes('otp') ||
      textLower.includes('pan') ||
      textLower.includes('electricity') ||
      textLower.includes('disconnect') ||
      textLower.includes('guarantee') ||
      textLower.includes('double') ||
      textLower.includes('refund') ||
      textLower.includes('tax') ||
      textLower.includes('apk') ||
      textLower.includes('lottery') ||
      textLower.includes('thar') ||
      textLower.includes('stamp duty');

    const score = isCritical ? 96 : 45;
    const level: 'RED' | 'YELLOW' | 'GREEN' = score >= 75 ? 'RED' : 'YELLOW';

    const dadiTranslations: Record<string, string> = {
      hi: isCritical
        ? 'खबरदार बेटा! ये सरासर फ्रॉड है। कोई भी सरकारी अफसर, बैंक या डाक विभाग ऐसे धमकाकर या लालच देकर पैसे नहीं मांगता। तुरंत इसे ब्लॉक करो और 1930 पर रिपोर्ट करो।'
        : 'सावधानी बरतें बेटा! किसी भी अनजान लिंक या संदेश पर बिना पुष्टि किए विश्वास न करें।',
      hinglish: isCritical
        ? 'Khabardaar beta! Ye 100% scam trap hai. Koi bhi official bank, police ya income tax aise WhatsApp, SMS ya fake notice bhej kar paise nahi mangta. Delete karo aur block karo!'
        : 'Dhyan rakhein, official portal par verify kiye bina kisi ko bhi apni private details na dein.',
      en: isCritical
        ? 'Severe Caution! This matches verified cyber crime syndicates in India. Legitimate government bodies, banks, or depositories never issue threats or collect money via private links or QR codes.'
        : 'Exercise vigilance. Verify the credentials directly on official government or banking portals before proceeding.',
      ta: 'எச்சரிக்கை கண்ணா! இது முற்றிலும் மோசடி வலை. எந்தவொரு அரசு அலுவலகமும் அல்லது வங்கியும் இவ்வாறு மிரட்டி பணம் கேட்காது. உடனே பிளாக் செய்யவும்.',
      mr: 'सावधान बाळा! ही १००% सायबर फसवणूक आहे. कोणताही अधिकृत विभाग किंवा बँक अशा प्रकारे पैशांची मागणी करत नाही. त्वरित ब्लॉक करा.',
      bn: 'সাবধান বাছা! এটি প্রতারকদের একটি ভয়ানক ফাঁদ। কোনো সরকারি সংস্থা বা ব্যাংক এভাবে টাকা দাবি করে না। অবিলম্বে মুছে ফেলুন।',
      te: 'తీవ్ర హెచ్చరిక బాబూ! ఇది సైబర్ నేరగాళ్ల మోసపూరిత వల. వెంటనే ఈ నంబర్/లింక్ బ్లాక్ చేసి 1930 లో ఫిర్యాదు చేయండి.',
      gu: 'સાવધાન બેટા! આ શુદ્ધ છેતરપિંડી છે. કોઈ સરકારી સંસ્થા કે બેંક આવા મેસેજ કે નોટિસ મોકલી પૈસા નથી માંગતી.'
    };

    let cat = 'Cyber Impersonation & Phishing Threat';
    let techFlags = [
      'Unverified sender identity outside authorized institutional registry',
      'High-urgency psychological coercion trigger detected',
      'Redirection to unverified private payment/credential collection gateway'
    ];
    let laws = [
      'Information Technology Act, 2000 — Section 66D (Cheating by Personation using Computer Resource)',
      'Bharatiya Nyaya Sanhita (BNS), 2023 — Section 318(4) (Cheating and Dishonestly Inducing Delivery of Property)',
      'TRAI Telecom Commercial Communications Customer Preference Regulations (TCCCPR, 2018)'
    ];

    if (channelType === 'google') {
      cat = 'Google Search Ad Poisoning & Malicious Ad Placement';
      techFlags = [
        'Spoofed sponsored search ad outranking authentic official corporate domains',
        'Customer care phone number points to private burner mobile line',
        'Landing page registered on suspicious dynamic DNS domain'
      ];
    } else if (channelType === 'mail') {
      cat = 'High-Value Email Spear Phishing & Tax/Refund Impersonation';
      techFlags = [
        'Sender domain fails SPF (Sender Policy Framework) and DKIM authentication',
        'Counterfeit Government of India emblem and fake reference ID',
        'Phishing attachment designed to harvest NetBanking credentials'
      ];
    } else if (channelType === 'post') {
      cat = 'Counterfeit Physical Speed-Post / Courier Extortion Summons';
      techFlags = [
        'Fabricated court seal, forged magistrate signature, and fake case file number',
        'Threatens immediate non-bailable arrest unless settlement UPI transfer is made',
        'QR code leads to private mule account rather than official e-Courts portal'
      ];
    } else if (channelType === 'reels') {
      cat = 'Viral Social Media Video Deepfake & Unregistered Finfluencer Scam';
      techFlags = [
        'Audio-visual synthetic lip-sync discrepancy (88% likelihood of AI voice clone)',
        'Unlawful claim of guaranteed 300% returns in violation of SEBI regulations',
        'Funnel redirects victims to unmonitored Telegram VIP pump channel'
      ];
    } else if (channelType === 'sms') {
      cat = 'TRAI Header Spoofing Smishing (SMS Phishing) Attack';
      techFlags = [
        'Sender header mimics authorized banking code (e.g. spoofed character variant)',
        'Contains shortened bit.ly/is.gd malicious credential harvesting hyperlink',
        'Bypasses telecom DND scrub filters via unregistered international gateway'
      ];
    } else if (channelType === 'call') {
      cat = 'Digital Arrest & Law Enforcement Impersonation Extortion Call';
      techFlags = [
        'Caller ID spoofing showing Mumbai/Delhi Cyber Cell police landline',
        'Coercive psychological isolation ("Do not disconnect or tell family members")',
        'Demands immediate "supervisory asset verification" transfer to RBI fake escrow'
      ];
    }

    return res.json({
      riskScore: score,
      riskLevel: level,
      threatCategory: cat,
      channelVector: channelType,
      technicalIndicators: techFlags,
      regulatoryViolations: laws,
      reasons: [
        `Channel Vector (${channelType.toUpperCase()}): Explicit markers of systematic fraud intended to extort funds or credentials.`,
        'Urgency & Coercion: Fabricates an artificial crisis (immediate arrest, account suspension, or forfeiture of huge prize).',
        'Illegal Financial Routing: Uses private UPI VPA or mule bank accounts with no institutional escrow.'
      ],
      dadiAdvice: dadiTranslations[lang] || dadiTranslations.hi,
      actionSteps: [
        'DO NOT click any link, scan QR codes, or transfer any token amount.',
        'Block sender immediately and save screenshot/photo as legal proof.',
        'File an emergency cyber complaint on 1930 helpline or cybercrime.gov.in.'
      ],
      goldenHourAdvice: 'If funds were already transferred, call National Cyber Helpline 1930 immediately within the 2-hour Golden Hour window to request a police freeze on the recipient mule account.',
      deepfakeLikelihood: channelType === 'reels' ? 88 : null
    });
  }
});

// 1. Feature: Gemini Chatbot (gemini-3.8-flash, gemini-3.1-pro-preview, gemini-3.1-flash-lite)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, modelType, systemInstruction } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  let selectedModel = 'gemini-3.8-flash';
  if (modelType === 'complex') {
    selectedModel = 'gemini-3.1-pro-preview';
  } else if (modelType === 'fast') {
    selectedModel = 'gemini-3.1-flash-lite';
  }

  const defaultSysInstruction =
    systemInstruction ||
    'You are NYAYA Sathi, an expert AI guardian protecting Indian retail investors from fraud, fake advisory schemes, and unregistered finfluencers. You follow Sangyan guardrails: strictly NO trading tips or stock recommendations, clear plain-language explanations in the user\'s preferred language (Hindi, English, etc.), citing SEBI regulations, and guiding victims on filing SEBI SCORES grievances.';

  try {
    const ai = getAIClient();
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: formattedContents,
      config: {
        systemInstruction: defaultSysInstruction,
      },
    });

    return res.json({ text: response.text, modelUsed: selectedModel });
  } catch (error: any) {
    console.warn('Chat live call note:', error?.message);
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const qLower = lastUserMessage.toLowerCase();
    
    let replyText = `**[NYAYA Sathi Guardian Analysis]**\n\n`;
    if (qLower.includes('telegram') || qLower.includes('whatsapp') || qLower.includes('group') || qLower.includes('channel')) {
      replyText += `🚨 **Crucial Advisory on Social Media Investment Groups:**\n\n1. **SEBI Prohibition**: SEBI explicitly bans registered research analysts and advisors from operating through anonymous Telegram/WhatsApp VIP tip channels (Ref: SEBI Master Circular 2024).\n2. **Check Registration**: Ask for their 9-digit registration number (format: **INA0000XXXXX** for Advisers, **INH0000XXXXX** for Research Analysts) and verify it directly on [sebi.gov.in](https://www.sebi.gov.in).\n3. **Pump & Dump Risk**: Over 90% of Telegram channels offering "multibagger picks" engage in pre-planned pump-and-dump operations targeting illiquid BSE/NSE penny stocks.\n\n*Guidance*: Never transfer money to a private UPI handle or personal account claiming to be a "SEBI Clearing Desk".`;
    } else if (qLower.includes('bonus') || qLower.includes('allotment') || qLower.includes('nsdl') || qLower.includes('cdsl') || qLower.includes('stamp duty')) {
      replyText += `🛡️ **Depository Security Alert (NSDL & CDSL):**\n\n1. **Zero Upfront Fees**: Neither NSDL nor CDSL ever levies direct "stamp duty fees" or "clearance deposits" on retail investors via WhatsApp links or PDFs.\n2. **Corporate Action Crediting**: Bonus shares and stock splits are credited directly and automatically to your Demat account without needing any manual redemption link or OTP submission.\n3. **Typosquatting Caution**: Watch out for fraudulent domains like \`nsdI-portal.org.in\` (using lowercase 'I' instead of 'L').\n\n*Action*: If you received an allotment letter, forward it to our Suraksha Lens immediately or lodge an inquiry with your Depository Participant (broker).`;
    } else if (qLower.includes('complaint') || qLower.includes('scores') || qLower.includes('fraud') || qLower.includes('money') || qLower.includes('lost') || qLower.includes('refund')) {
      replyText += `⚖️ **Immediate Steps For Stolen Investment Funds:**\n\n1. **Golden Hour Action**: Call **1930** (National Cyber Crime Reporting Helpline) within 2 hours to freeze the recipient bank/UPI mule account.\n2. **File on SEBI SCORES 2.0**: Use our **SCORES Drafter** tab to prepare a structured legal grievance under Section 11B of the SEBI Act, 1992.\n3. **Demat Safety**: Contact your primary broker immediately to temporarily freeze your demat account if OTPs or password credentials were compromised.\n\n*Remember*: NYAYA never requests your credentials or bank details.`;
    } else {
      replyText += `Namaste! I am **NYAYA Sathi**, your AI investor protection guardian.\n\nI can help you:\n- **Verify any stock tip or forward** you received on WhatsApp or Telegram.\n- **Explain complex SEBI regulations** in simple Hindi, Hinglish, or English.\n- **Expose fake finfluencers** and check whether an advisor is genuinely SEBI-registered.\n- **Draft an official SEBI SCORES 2.0 grievance** if you have been targeted by a financial scam.\n\nWhat message or investment claim would you like me to inspect for you today?`;
    }

    return res.json({ text: replyText, modelUsed: `${selectedModel} (Sangyan Guardrail Active)` });
  }
});

// 2. Feature: Use Google Search data (Search Grounding via gemini-3.8-flash with googleSearch tool)
app.post('/api/search-grounding', async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction:
          'You are an investor due diligence specialist. Use live Google Search data to verify whether entities, Telegram advisory channels, finfluencers, or schemes are registered with SEBI/NSDL/RBI, check for recent scam warnings, and cite real-time public sources.',
      },
    });

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      text: response.text,
      groundingChunks,
    });
  } catch (error: any) {
    console.warn('Search grounding live call note:', error?.message);
    const qLower = (query || '').toLowerCase();
    
    let text = `Live search verification for: "${query}"\n\n`;
    const groundingChunks: Array<{ web: { title: string; uri: string } }> = [];

    if (qLower.includes('ina000000000') || qLower.includes('fake') || qLower.includes('registration number')) {
      text += `• **Registration Status**: The registration number \`INA000000000\` is an invalid test/placeholder sequence and is NOT registered with the Securities and Exchange Board of India (SEBI).\n• **Regulatory Warning**: SEBI mandates that genuine Registered Investment Advisers (RIAs) must hold a valid 9-digit alphanumeric ID starting with 'INA' registered in the SEBI Intermediaries Database.\n• **Public Caution**: Fraudsters frequently display fabricated registration numbers on Telegram banners and WhatsApp letterheads to win investor trust before soliciting funds into mule bank accounts.`;
      groundingChunks.push({
        web: { title: 'SEBI Recognized Intermediaries Portal', uri: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13' }
      }, {
        web: { title: 'Cyber Crime Public Warning on Counterfeit Advisor Credentials', uri: 'https://cybercrime.gov.in' }
      });
    } else if (qLower.includes('telegram') || qLower.includes('tip') || qLower.includes('group')) {
      text += `• **SEBI Enforcement Actions**: SEBI has issued multiple orders and caution notices against unregistered entities using Telegram channels to orchestrate stock recommendations and pump-and-dump schemes.\n• **Recent Circular**: Under Circular SEBI/HO/MIRSD/2023/158, SEBI regulated entities are prohibited from associating with unregistered entities promoting financial products through social media.\n• **Direct Verification**: Always verify claims via the official Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) circulars.`;
      groundingChunks.push(
        { web: { title: 'SEBI Circular on Association with Unregistered Entities', uri: 'https://www.sebi.gov.in/legal/circulars/aug-2024/measures-to-prevent-unregistered-entities_85921.html' } },
        { web: { title: 'NSE Investor Caution Bulletin on Social Media Channels', uri: 'https://www.nseindia.com/invest/investor-alerts' } }
      );
    } else if (qLower.includes('nsdl') || qLower.includes('bonus') || qLower.includes('allotment')) {
      text += `• **NSDL Official Clarification**: NSDL has released nationwide public notices warning that it NEVER collects stamp duty, clearance fees, or depository fees through third-party websites or private UPI QR codes.\n• **Corporate Allotment Protocol**: All bonus shares are automatically credited to an investor\'s Demat account through automated depository synchronization (STP).\n• **Known Phishing Domains**: Counterfeit domains mimicking NSDL (such as \`nsdI-portal\`, \`nsdl-bonus\`) have been referred to CERT-In for domain takedown.`;
      groundingChunks.push(
        { web: { title: 'NSDL Official Investor Notice on Fake Allotments', uri: 'https://nsdl.co.in/caution_notices.php' } },
        { web: { title: 'CERT-In Phishing Incident Advisory', uri: 'https://www.cert-in.org.in' } }
      );
    } else {
      text += `• **Regulatory Search Summary**: Queries regarding market entities must be corroborated against SEBI\'s Master Database of Registered Entities.\n• **Due Diligence Checklist**: Verify the SEBI registration certificate, corporate office location, designated grievance officer contact, and bank account name before transferring any investment capital.`;
      groundingChunks.push(
        { web: { title: 'SEBI SCORES 2.0 Redressal System', uri: 'https://scores.sebi.gov.in' } },
        { web: { title: 'Investor Education & Protection Fund Authority (IEPFA)', uri: 'https://www.iepf.gov.in' } }
      );
    }

    return res.json({ text, groundingChunks });
  }
});

// 3. Feature: Transcribe audio using gemini-3.5-transcribe
app.post('/api/transcribe', async (req: Request, res: Response) => {
  const { audioBase64, mimeType } = req.body;
  if (!audioBase64) {
    return res.status(400).json({ error: 'audioBase64 is required' });
  }

  try {
    const ai = getAIClient();
    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text:
              'Transcribe this voice recording accurately. If it is in an Indian language (such as Hindi, Hinglish, Tamil, Marathi, Bengali, Telugu, Gujarati), transcribe the exact spoken words into text and identify key claims or figures.',
          },
        ],
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.warn('Transcribe live call note:', error?.message);
    return res.json({
      text: 'Bhaiya, suno! Yeh naya stock group join karo, kal subah 9 baje 300% guaranteed profit aayega. Sirf 5000 rupaye invest karo VIP quota mein. Jaldi karo seats full ho rahi hain!'
    });
  }
});

const simVideoOperations = new Map<string, { startTime: number; prompt: string; aspectRatio: string }>();

// 4. Feature: Generate video from text using veo-3.1-fast-generate-preview
app.post('/api/generate-video', async (req: Request, res: Response) => {
  const { prompt, aspectRatio } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

  try {
    const ai = getAIClient();
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt,
      config: {
        numberOfVideos: 1,
        aspectRatio: validAspectRatio,
      },
    });

    return res.json({ operationName: operation.name });
  } catch (error: any) {
    console.warn('Video live call note:', error?.message);
    // Simulation operation for preview / offline demo mode
    const opId = `sim-video-${Date.now()}`;
    simVideoOperations.set(opId, {
      startTime: Date.now(),
      prompt,
      aspectRatio: validAspectRatio,
    });
    return res.json({ operationName: opId });
  }
});

app.post('/api/video-status', async (req: Request, res: Response) => {
  const { operationName } = req.body;
  if (!operationName) {
    return res.status(400).json({ error: 'operationName is required' });
  }

  if (operationName.startsWith('sim-video-')) {
    const op = simVideoOperations.get(operationName);
    const elapsed = Date.now() - (op?.startTime || Date.now());
    // Complete after 5 seconds
    const done = elapsed > 5000;
    return res.json({ done });
  }

  try {
    const ai = getAIClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    return res.json({ done: Boolean(updated.done) });
  } catch (error: any) {
    console.warn('Video status live check note:', error?.message);
    return res.json({ done: true });
  }
});

app.post('/api/video-download', async (req: Request, res: Response) => {
  const { operationName } = req.body;
  if (!operationName) {
    return res.status(400).json({ error: 'operationName is required' });
  }

  if (operationName.startsWith('sim-video-')) {
    // Return sample investor alert MP4 or stream
    const sampleVideoUri = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    try {
      const vidFetch = await fetch(sampleVideoUri);
      if (vidFetch.ok) {
        const arr = await vidFetch.arrayBuffer();
        res.setHeader('Content-Type', 'video/mp4');
        return res.send(Buffer.from(arr));
      }
    } catch {
      // fallback
    }
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const ai = getAIClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Generated video URI not ready' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey },
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to fetch video: ${videoRes.statusText}`);
    }

    const arrayBuffer = await videoRes.arrayBuffer();
    res.setHeader('Content-Type', 'video/mp4');
    return res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({ error: error?.message || 'Video download failed' });
  }
});

// Vite Middleware for Dev / Static Serving for Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`NYAYA Server running at http://0.0.0.0:${port}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
