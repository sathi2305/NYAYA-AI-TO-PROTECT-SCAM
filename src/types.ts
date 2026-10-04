export type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'mr'
  | 'bn'
  | 'te'
  | 'gu'
  | 'kn'
  | 'pa'
  | 'ml'
  | 'hinglish';

export type PageId =
  | 'home'
  | 'simulator'
  | 'omnichannel'
  | 'connect-shields'
  | 'ai-hub'
  | 'scores'
  | 'veo'
  | 'radar'
  | 'guardrails';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  native: string;
}

export type ScamChannel =
  | 'whatsapp'
  | 'sms'
  | 'email'
  | 'google_ad'
  | 'reel'
  | 'post'
  | 'telegram'
  | 'sim_swap';

export type ComplaintStatus =
  | 'Draft'
  | 'Filed with SEBI'
  | 'Under Investigation'
  | 'FIR Registered (1930)'
  | 'Restitution Claimed'
  | 'Closed';

export interface ArchivedComplaint {
  id: string;
  dossierId: string;
  title: string;
  category: string;
  amountLost: string;
  victimCity: string;
  victimState: string;
  platform: string;
  dateOfIncident: string;
  status: ComplaintStatus;
  savedAt: string;
  lastUpdated: string;
  formData: ScoresComplaintForm;
  step: number;
  officialFirNumber?: string;
  notes?: string;
}

export interface ConnectedShieldConfig {
  whatsappNumber: string;
  whatsappConnected: boolean;
  simProvider: string;
  simNumber: string;
  simShieldActive: boolean;
  smsSmishingFilter: boolean;
  sancharSaathiLinked: boolean;
  cyber1930AutoAlert: boolean;
  lastScannedTime?: string;
  blockedAttemptsCount: number;
}

export interface ShieldInterceptedEvent {
  id: string;
  timestamp: string;
  channel: 'whatsapp' | 'sms' | 'sim';
  sender: string;
  headerOrNumber: string;
  snippet: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  actionTaken: 'Blocked & Quarantined' | 'Flagged with Warning' | 'Reported to 1930 / Sanchar Saathi';
  traiHeaderStatus?: 'Spoofed' | 'Unregistered' | 'Suspicious Bulk' | 'Genuine';
  riskScore: number;
}

export type OmnichannelCategory =
  | 'google'
  | 'mail'
  | 'post'
  | 'reels'
  | 'sms'
  | 'whatsapp'
  | 'social_post'
  | 'call';

export interface OmnichannelPreset {
  id: string;
  category: OmnichannelCategory;
  categoryLabel: string;
  title: string;
  badge: string;
  senderOrDomain: string;
  content: string;
  additionalDetails?: string;
  riskScore: number;
  riskLevel: 'RED' | 'YELLOW' | 'GREEN';
  keyRedFlags: string[];
  regulationsViolated: string[];
  dadiAdvice: Partial<Record<LanguageCode, string>>;
}

export interface OmnichannelAnalysisResult {
  riskScore: number;
  riskLevel: 'RED' | 'YELLOW' | 'GREEN';
  threatCategory: string;
  channelVector: OmnichannelCategory | string;
  technicalIndicators: string[];
  regulatoryViolations: string[];
  reasons: string[];
  dadiAdvice: string;
  actionSteps: string[];
  goldenHourAdvice?: string;
  deepfakeLikelihood?: number | null;
}

export interface ScamSample {
  id: string;
  title: string;
  sender: string;
  senderRole: string;
  forwardTag: string;
  content: string;
  type: 'reel' | 'pdf' | 'link' | 'message';
  riskLevel: 'RED' | 'YELLOW' | 'GREEN';
  riskScore: number; // 0-100
  deepfakeScore?: number;
  reasons: string[];
  sebiReference: string;
  dadiAdvice: {
    [key in LanguageCode]?: string;
  };
}

export interface ScoresComplaintForm {
  whatHappened: string;
  category: string;
  scammerNameOrNumber: string;
  platform: string;
  dateOfIncident: string;
  amountLost: string;
  utrOrTransactionId: string;
  evidenceType: string;
  victimCity: string;
  victimState: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  senderContext: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  dadiProverb: string;
}

export interface ThreatCity {
  city: string;
  state: string;
  tier: 'Tier-2' | 'Tier-3';
  activeScamsDetected: number;
  commonPattern: string;
  riskStatus: 'Critical' | 'Elevated' | 'Monitoring';
  lat: number;
  lng: number;
}

export type NotificationType = 'radar_scam' | 'complaint_status';

export interface InAppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'high' | 'medium' | 'info';
  targetPage?: PageId;
  metadata?: {
    city?: string;
    state?: string;
    complaintId?: string;
    scamSampleId?: string;
    newStatus?: string;
    amount?: string;
  };
}

declare module 'react' {
  interface AriaAttributes {
    'aria-description'?: string;
  }
}

