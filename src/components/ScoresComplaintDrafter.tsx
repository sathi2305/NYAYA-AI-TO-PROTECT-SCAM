import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer,
  X,
  QrCode,
  Scale,
  Award,
  RotateCcw,
  Save,
  History,
  Trash2,
  Clock,
  CheckCircle2,
  Edit3,
  Search,
  Plus,
  Eye,
  Tag,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { LanguageCode, ScoresComplaintForm, ArchivedComplaint, ComplaintStatus } from '../types';
import { getStrings } from '../utils/i18n';

interface ScoresComplaintDrafterProps {
  currentLanguage: LanguageCode;
  initialData?: Partial<ScoresComplaintForm>;
}

const STORAGE_KEY_CURRENT = 'nyaya_scores_complaint_draft';
const STORAGE_KEY_STEP = 'nyaya_scores_draft_step';
const STORAGE_KEY_DOSSIER = 'nyaya_scores_dossier_id';
const STORAGE_KEY_ARCHIVE = 'nyaya_scores_saved_drafts_history';
const STORAGE_KEY_TIME = 'nyaya_scores_last_saved_time';

export const ScoresComplaintDrafter: React.FC<ScoresComplaintDrafterProps> = ({
  currentLanguage,
  initialData,
}) => {
  const defaultFormData: ScoresComplaintForm = {
    whatHappened:
      initialData?.whatHappened ||
      'Unsolicited recommendation promising guaranteed 300% returns in 5 days via fake NSDL bonus allotment link.',
    category: initialData?.category || 'Unregistered Investment Advisory & Phishing',
    scammerNameOrNumber: initialData?.scammerNameOrNumber || '+91 9845X XXXXX (Telegram VIP Channel)',
    platform: initialData?.platform || 'Telegram / WhatsApp',
    dateOfIncident: initialData?.dateOfIncident || new Date().toISOString().split('T')[0],
    amountLost: initialData?.amountLost || '12500',
    utrOrTransactionId: initialData?.utrOrTransactionId || 'UPI/489102847192',
    evidenceType: initialData?.evidenceType || 'Screenshots of chat, fake NSDL PDF letter, payment receipt',
    victimCity: initialData?.victimCity || 'Nashik',
    victimState: initialData?.victimState || 'Maharashtra',
  };

  const [viewMode, setViewMode] = useState<'drafter' | 'archive'>('drafter');
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedArchiveItemForInspection, setSelectedArchiveItemForInspection] = useState<ArchivedComplaint | null>(null);

  const [step, setStep] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStep = localStorage.getItem(STORAGE_KEY_STEP);
        if (savedStep) {
          const s = parseInt(savedStep, 10);
          if (s >= 1 && s <= 4) return s;
        }
      } catch {}
    }
    return 1;
  });

  const [showLetterheadModal, setShowLetterheadModal] = useState<boolean>(false);
  const [archiveSuccessToast, setArchiveSuccessToast] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY_TIME) || 'Just now';
    }
    return 'Just now';
  });

  const [dossierId, setDossierId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_DOSSIER);
      if (saved) return saved;
    }
    return `SCORES-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  });
  
  const [formData, setFormData] = useState<ScoresComplaintForm>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return { ...defaultFormData, ...parsed };
          }
        }
      } catch (err) {
        console.warn('Failed to parse draft from localStorage:', err);
      }
    }
    return defaultFormData;
  });

  const initialSeedDrafts: ArchivedComplaint[] = [
    {
      id: 'seed-draft-1',
      dossierId: 'SCORES-2024-MH-948192',
      title: 'Counterfeit NSDL Bonus Allotment Phishing',
      category: 'Fake NSDL / Depository Allotment Letterhead',
      amountLost: '12500',
      victimCity: 'Nashik',
      victimState: 'Maharashtra',
      platform: 'WhatsApp / Fake Portal (nsdI-portal.org.in)',
      dateOfIncident: '2024-09-18',
      status: 'FIR Registered (1930)',
      officialFirNumber: 'MHA/CYBER/2024/94812',
      notes: 'Cyber Police 1930 registered complaint. Bank accounts of receiver frozen under Section 11B.',
      savedAt: '2 days ago',
      lastUpdated: 'Yesterday at 4:30 PM',
      step: 4,
      formData: {
        whatHappened: 'Received an urgent letterhead claiming 500 bonus shares of Tata Tech allotted to my Demat account ending in 4821. Demanded ₹12,500 advance stamp duty into a private clearing account within 24 hours or shares will be forfeited.',
        category: 'Fake NSDL / Depository Allotment Letterhead',
        scammerNameOrNumber: '+91 9821X XXXXX (@NSDL_Bonus_Helpdesk)',
        platform: 'WhatsApp / Fake Portal (nsdI-portal.org.in)',
        dateOfIncident: '2024-09-18',
        amountLost: '12500',
        utrOrTransactionId: 'UPI/489102847192',
        evidenceType: 'Fake NSDL letterhead PDF, payment UPI screenshot, WhatsApp chat export',
        victimCity: 'Nashik',
        victimState: 'Maharashtra',
      },
    },
    {
      id: 'seed-draft-2',
      dossierId: 'SCORES-2024-MP-710245',
      title: 'Telegram VIP Stock Advisory Syndicate',
      category: 'Unregistered Telegram Finfluencer Pump & Dump',
      amountLost: '45000',
      victimCity: 'Indore',
      victimState: 'Madhya Pradesh',
      platform: 'Telegram VIP Channel',
      dateOfIncident: '2024-09-24',
      status: 'Filed with SEBI',
      notes: 'Grievance submitted to SEBI SCORES portal. Awaiting resolution response from compliance officer.',
      savedAt: '4 days ago',
      lastUpdated: '3 days ago at 11:15 AM',
      step: 4,
      formData: {
        whatHappened: 'Joined a Telegram VIP channel promising 300% weekly return on illiquid penny stock. Directed to place market buy orders on BSE while channel operators dumped holdings, crashing the stock 78% within 2 hours.',
        category: 'Unregistered Telegram Finfluencer Pump & Dump',
        scammerNameOrNumber: '@Bharat_Multibagger_VIP (+91 7012X XXXXX)',
        platform: 'Telegram VIP Stock Advisory Channel',
        dateOfIncident: '2024-09-24',
        amountLost: '45000',
        utrOrTransactionId: 'NEFT/INDB00294819',
        evidenceType: 'Telegram chat history, demat trade contract notes, broker ledger',
        victimCity: 'Indore',
        victimState: 'Madhya Pradesh',
      },
    }
  ];

  const [savedDraftsList, setSavedDraftsList] = useState<ArchivedComplaint[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_ARCHIVE);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return initialSeedDrafts;
  });

  const filteredDrafts = savedDraftsList.filter((d) => {
    const matchesSearch =
      (d.title || '').toLowerCase().includes(archiveSearch.toLowerCase()) ||
      (d.dossierId || '').toLowerCase().includes(archiveSearch.toLowerCase()) ||
      (d.category || '').toLowerCase().includes(archiveSearch.toLowerCase()) ||
      (d.victimCity || '').toLowerCase().includes(archiveSearch.toLowerCase()) ||
      (d.platform || '').toLowerCase().includes(archiveSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [copied, setCopied] = useState<boolean>(false);

  // Sync external incoming initialData from simulator if requested
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => {
        const merged = { ...prev, ...initialData };
        try {
          localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(merged));
        } catch {}
        return merged;
      });
      setStep(4);
      setViewMode('drafter');
    }
  }, [initialData]);

  // Persist form data, step, and dossierId on changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(formData));
      localStorage.setItem(STORAGE_KEY_STEP, step.toString());
      localStorage.setItem(STORAGE_KEY_DOSSIER, dossierId);
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(STORAGE_KEY_TIME, nowStr);
      setLastSavedTime(nowStr);
    } catch (e) {
      console.warn('Auto-save error to localStorage:', e);
    }
  }, [formData, step, dossierId]);

  const handleResetDraft = () => {
    const fresh: ScoresComplaintForm = {
      whatHappened: '',
      category: 'Unregistered Investment Advisory & Phishing',
      scammerNameOrNumber: '',
      platform: 'Telegram / WhatsApp',
      dateOfIncident: new Date().toISOString().split('T')[0],
      amountLost: '',
      utrOrTransactionId: '',
      evidenceType: 'Screenshots of chat, payment receipt',
      victimCity: '',
      victimState: '',
    };
    const newDossier = `SCORES-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setEditingDraftId(null);
    setFormData(fresh);
    setStep(1);
    setDossierId(newDossier);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(fresh));
        localStorage.setItem(STORAGE_KEY_STEP, '1');
        localStorage.setItem(STORAGE_KEY_DOSSIER, newDossier);
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        localStorage.setItem(STORAGE_KEY_TIME, nowStr);
        setLastSavedTime(nowStr);
      } catch {}
    }
  };

  const handleSaveToArchive = () => {
    const nowStr = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    if (editingDraftId) {
      // Update existing draft in archive
      const updated = savedDraftsList.map((item) =>
        item.id === editingDraftId
          ? {
              ...item,
              category: formData.category,
              amountLost: formData.amountLost,
              victimCity: formData.victimCity,
              victimState: formData.victimState,
              platform: formData.platform,
              dateOfIncident: formData.dateOfIncident,
              formData: { ...formData },
              step,
              lastUpdated: nowStr,
            }
          : item
      );
      setSavedDraftsList(updated);
      try {
        localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
      } catch {}
      setArchiveSuccessToast(true);
      setTimeout(() => setArchiveSuccessToast(false), 2500);
      return;
    }

    const entry: ArchivedComplaint = {
      id: 'draft-' + Date.now(),
      dossierId,
      title: formData.category || 'Investment Scam Grievance',
      category: formData.category || 'Investment Scam Grievance',
      amountLost: formData.amountLost || '0',
      victimCity: formData.victimCity || 'Unspecified City',
      victimState: formData.victimState || 'India',
      platform: formData.platform,
      dateOfIncident: formData.dateOfIncident || new Date().toISOString().split('T')[0],
      status: 'Draft',
      savedAt: nowStr,
      lastUpdated: nowStr,
      formData: { ...formData },
      step,
    };

    const updated = [entry, ...savedDraftsList.filter((d) => d.dossierId !== dossierId)];
    setSavedDraftsList(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
      } catch {}
    }
    setArchiveSuccessToast(true);
    setTimeout(() => setArchiveSuccessToast(false), 2500);
  };

  const handleEditComplaint = (entry: ArchivedComplaint) => {
    setEditingDraftId(entry.id);
    setFormData({ ...entry.formData });
    setStep(entry.step || 1);
    setDossierId(entry.dossierId);
    setViewMode('drafter');
  };

  const handleUpdateStatus = (id: string, newStatus: ComplaintStatus) => {
    const nowStr = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    const updated = savedDraftsList.map((d) =>
      d.id === id ? { ...d, status: newStatus, lastUpdated: nowStr } : d
    );
    setSavedDraftsList(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
      } catch {}
    }
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = savedDraftsList.map((d) => (d.id === id ? { ...d, notes } : d));
    setSavedDraftsList(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
      } catch {}
    }
  };

  const handleDeleteFromArchive = (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint draft from local storage?')) {
      const updated = savedDraftsList.filter((d) => d.id !== id);
      setSavedDraftsList(updated);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
        } catch {}
      }
      if (editingDraftId === id) {
        setEditingDraftId(null);
      }
    }
  };

  const handleDuplicateComplaint = (entry: ArchivedComplaint) => {
    const newDossier = `SCORES-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const cloned: ArchivedComplaint = {
      ...entry,
      id: 'draft-' + Date.now(),
      dossierId: newDossier,
      title: `${entry.title} (Copy)`,
      status: 'Draft',
      savedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      lastUpdated: 'Just now',
    };
    const updated = [cloned, ...savedDraftsList];
    setSavedDraftsList(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ARCHIVE, JSON.stringify(updated));
    } catch {}
  };

  const presets = [
    {
      title: 'Fake NSDL Allotment',
      category: 'Fake NSDL / Depository Allotment Letterhead',
      amount: '12500',
      platform: 'WhatsApp / Fake Portal (nsdI-portal.org.in)',
      scammer: '+91 9821X XXXXX (@NSDL_Bonus_Helpdesk)',
      whatHappened: 'Received an urgent letterhead claiming 500 bonus shares of Tata Tech allotted to my Demat account ending in 4821. Demanded ₹12,500 advance stamp duty into a private clearing account within 24 hours or shares will be forfeited.',
      evidence: 'Fake NSDL letterhead PDF, payment UPI screenshot, WhatsApp chat export',
      city: 'Nashik',
      state: 'Maharashtra',
      utr: 'UPI/489102847192'
    },
    {
      title: 'Telegram Pump & Dump',
      category: 'Unregistered Telegram Finfluencer Pump & Dump',
      amount: '45000',
      platform: 'Telegram VIP Stock Advisory Channel',
      scammer: '@Bharat_Multibagger_VIP (+91 7012X XXXXX)',
      whatHappened: 'Joined a Telegram VIP channel promising 300% weekly return on illiquid penny stock. Directed to place market buy orders on BSE while channel operators dumped holdings, crashing the stock 78% within 2 hours.',
      evidence: 'Telegram chat history, demat trade contract notes, broker ledger',
      city: 'Indore',
      state: 'Madhya Pradesh',
      utr: 'NEFT/INDB00294819'
    },
    {
      title: 'Counterfeit Broker Trading APK',
      category: 'Unregistered Broker APK & Fake Institutional Account',
      amount: '95000',
      platform: 'Direct APK Install via WhatsApp',
      scammer: 'MorganInstitutional-VIP.apk (+91 8841X XXXXX)',
      whatHappened: 'Targeted with an unverified Android APK claiming to offer foreign institutional investor (FII) discounted IPO shares. Funds deposited via UPI were displayed as fake balance in the app, but all withdrawal requests were blocked with demands for additional "clearance tax".',
      evidence: 'APK install file link, bank statement showing UPI transfers to mule merchant accounts, WhatsApp voice messages',
      city: 'Surat',
      state: 'Gujarat',
      utr: 'IMPS/409284719283'
    }
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setFormData({
      whatHappened: preset.whatHappened,
      category: preset.category,
      scammerNameOrNumber: preset.scammer,
      platform: preset.platform,
      dateOfIncident: new Date().toISOString().split('T')[0],
      amountLost: preset.amount,
      utrOrTransactionId: preset.utr,
      evidenceType: preset.evidence,
      victimCity: preset.city,
      victimState: preset.state,
    });
    setStep(4);
  };

  const generateComplaintText = () => {
    return `FORMAL GRIEVANCE SUBMISSION FOR SEBI SCORES PORTAL
Under SEBI (Prohibition of Fraudulent and Unfair Trade Practices Relating to Securities Market) Regulations, 2003

To,
The Investor Grievance Officer,
Securities and Exchange Board of India (SEBI),
Bandra-Kurla Complex, Mumbai - 400051

SUBJECT: Urgent Complaint Against Unregistered Entity / Fraudulent Scheme Operating on ${formData.platform}

1. COMPLAINANT INCIDENT SUMMARY:
   - Date of Occurrence: ${formData.dateOfIncident}
   - Complainant Location: ${formData.victimCity}, ${formData.victimState}
   - Disputed Financial Amount: INR ${Number(formData.amountLost).toLocaleString('en-IN')}
   - Transaction / UTR Reference: ${formData.utrOrTransactionId || 'N/A'}

2. DETAILS OF ACCUSED ENTITY / CHANNELS:
   - Handle / Contact / Group: ${formData.scammerNameOrNumber}
   - Medium Used: ${formData.platform}
   - Nature of Violation: ${formData.category}

3. STATEMENT OF FACT:
${formData.whatHappened}
The accused entity falsely claimed regulatory affiliation with SEBI / NSDL and promised guaranteed high-frequency returns, in direct contravention of SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158.

4. RELIEF SOUGHT:
   a) Freeze associated fraudulent bank / UPI receiving accounts immediately.
   b) Issue public advisory regarding the counterfeit domain/channel.
   c) Direct refund of stolen sum under Section 11B of the SEBI Act, 1992.
   d) Escalation to National Cyber Crime Reporting Portal (1930) for criminal prosecution.

5. EVIDENCE SUBMITTED:
   - ${formData.evidenceType}

---
शिकायत सारांश (हिन्दी में अनुवाद):
उपरोक्त मामले में प्रार्थी के साथ ${formData.platform} पर अवैध मुनाफा और फर्जी एनआईडीएल पत्र दिखाकर धोखाधड़ी की गई है। कुल विवादित राशि ₹${Number(formData.amountLost).toLocaleString('en-IN')} है। कृपया इस चैनल के विरुद्ध सेबी अधिनियम के तहत सख्त कानूनी कार्रवाई करें और राशि वापस दिलाने में सहायता करें।

Generated via NYAYA Nyaya-Dost Grievance Engine (Sangyan Guardrail Compliant)
Reference ID: NYAYA-SEBI-${Date.now().toString().slice(-6)}
`;
  };

  const handleCopy = () => {
    const text = generateComplaintText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const text = generateComplaintText();
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `SEBI-SCORES-Complaint-${formData.victimCity}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintReport = () => {
    setShowLetterheadModal(true);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const s = getStrings(currentLanguage);

  return (
    <section id="scores" className="border-t border-slate-800 bg-[#080f17] py-16 lg:py-24 print:border-0 print:bg-white print:py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 no-print">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Track B • NYAYA DOST Grievance Assistant
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.scoresTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.scoresSub}
          </p>
        </div>

        {/* Main View Mode Selector: Drafter vs My Complaints Archive */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center p-1 rounded-xl bg-[#0c1622] border border-slate-700/80">
          <button
            onClick={() => setViewMode('drafter')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'drafter'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Active Grievance Drafter {step < 4 ? `(Step ${step}/3)` : '(Ready)'}</span>
          </button>
          <button
            onClick={() => setViewMode('archive')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'archive'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            <span>My Complaints Archive ({savedDraftsList.length})</span>
          </button>
        </div>

        {/* Editing Existing Draft Banner */}
        {viewMode === 'drafter' && editingDraftId && (
          <div className="mx-auto mt-4 max-w-3xl flex items-center justify-between rounded-xl bg-amber-500/10 border border-amber-500/40 px-4 py-2.5 text-xs text-amber-300 shadow-md">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-amber-400" />
              <span>
                <strong>Editing Archived Complaint:</strong> <span className="font-mono text-white">{dossierId}</span>. Changes will update this record in local storage.
              </span>
            </div>
            <button
              onClick={handleResetDraft}
              className="text-xs font-semibold text-slate-300 hover:text-white underline ml-3 shrink-0"
            >
              Exit &amp; Start Fresh
            </button>
          </div>
        )}

        {/* Persistence Status & Archive Toolbar */}
        {viewMode === 'drafter' && (
          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700/80 bg-[#0d1826] px-4 py-2 text-xs text-slate-300 shadow-md">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Auto-saved to Local Storage</span>
              <span className="hidden sm:inline text-slate-500">·</span>
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="h-3 w-3 text-slate-400" />
                <span>Last saved: {lastSavedTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('archive')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                title="View all saved complaint drafts"
              >
                <History className="h-3.5 w-3.5 text-emerald-400" />
                <span>View Archive ({savedDraftsList.length})</span>
              </button>

              <button
                onClick={handleResetDraft}
                className="flex items-center gap-1 rounded-lg border border-rose-900/40 bg-rose-950/30 px-2.5 py-1 text-[11px] font-medium text-rose-300 hover:bg-rose-900/50 transition-colors"
                title="Clear draft and start fresh"
              >
                <RotateCcw className="h-3 w-3 text-rose-400" />
                <span>Start Fresh</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: ACTIVE DRAFTER */}
        {viewMode === 'drafter' && (
          <div>
            {/* Quick Test Scenario Presets */}
            <div className="mx-auto mt-3 max-w-3xl rounded-xl border border-slate-800 bg-[#0c1622] p-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>1-Click Test Scenarios:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  className="rounded-lg border border-slate-700/80 bg-[#070e16] px-3 py-1 text-[11px] font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
                >
                  ⚡ {p.title} (₹{Number(p.amount).toLocaleString('en-IN')})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Step Indicator */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-between">
          <div
            onClick={() => setStep(1)}
            className={`flex cursor-pointer items-center gap-2 ${
              step >= 1 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === 1
                  ? 'bg-emerald-500 text-slate-950'
                  : step > 1
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              1
            </span>
            <span className="text-xs font-semibold">Q1: Kya Hua?</span>
          </div>

          <div className="h-0.5 w-12 bg-slate-800 sm:w-20" />

          <div
            onClick={() => setStep(2)}
            className={`flex cursor-pointer items-center gap-2 ${
              step >= 2 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === 2
                  ? 'bg-emerald-500 text-slate-950'
                  : step > 2
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </span>
            <span className="text-xs font-semibold">Q2: Kab aur Kitna?</span>
          </div>

          <div className="h-0.5 w-12 bg-slate-800 sm:w-20" />

          <div
            onClick={() => setStep(3)}
            className={`flex cursor-pointer items-center gap-2 ${
              step >= 3 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === 3
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              3
            </span>
            <span className="text-xs font-semibold">Q3: Kiske Saath?</span>
          </div>
        </div>

        {/* Wizard Form & Real-time Legal Preview */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form Step Column */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#0d1622] p-6 lg:col-span-5">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase">Step 1 of 3</div>
                  <h3 className="text-lg font-bold text-white">Q1: Kya hua aapke saath? (What happened?)</h3>
                  <p className="text-xs text-slate-400">
                    Select the fraud pattern and describe in simple words.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">Fraud Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Unregistered Investment Advisory & Guaranteed Returns">
                      Unregistered Advisor (300% profit promise)
                    </option>
                    <option value="Fake NSDL / Depository Allotment Letterhead">
                      Fake NSDL / CDSL Letter (Advance stamp duty fee)
                    </option>
                    <option value="Typosquatting Phishing Link & Demat OTP Theft">
                      Typosquatting Link (Fake Tata/Reliance dividend site)
                    </option>
                    <option value="Deepfake Finfluencer Video Endorsement">
                      Deepfake Finfluencer Reel on Instagram/YouTube
                    </option>
                    <option value="Telegram / WhatsApp VIP Pump & Dump Group">
                      Telegram VIP Stock Tips Group
                    </option>
                    <option value="Unauthorized Dabba Trading Application">
                      Illegal Off-Exchange Dabba Trading App
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">
                    Aapke shabdon me (What exactly did they tell you?)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.whatHappened}
                    onChange={(e) => setFormData({ ...formData, whatHappened: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="E.g. Mujhe Telegram group me add kiya aur bola 5 din me paisa 3 guna hoga..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    <span>Next: Kab aur Kitna?</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase">Step 2 of 3</div>
                  <h3 className="text-lg font-bold text-white">Q2: Kab aur Kitna? (When & How much?)</h3>
                  <p className="text-xs text-slate-400">
                    Accurate dates and transaction IDs help SEBI freeze illicit accounts.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Date of Incident</label>
                    <input
                      type="date"
                      value={formData.dateOfIncident}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfIncident: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300">Amount (₹ INR)</label>
                    <input
                      type="number"
                      value={formData.amountLost}
                      onChange={(e) => setFormData({ ...formData, amountLost: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="12500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">
                    Transaction / UPI / UTR Ref (If transferred)
                  </label>
                  <input
                    type="text"
                    value={formData.utrOrTransactionId}
                    onChange={(e) =>
                      setFormData({ ...formData, utrOrTransactionId: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="E.g. UPI/409283719283 or NA if stopped in time"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Your City</label>
                    <input
                      type="text"
                      value={formData.victimCity}
                      onChange={(e) => setFormData({ ...formData, victimCity: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Nashik"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300">State</label>
                    <input
                      type="text"
                      value={formData.victimState}
                      onChange={(e) => setFormData({ ...formData, victimState: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                  >
                    <span>Next: Kiske Saath?</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase">Step 3 of 3</div>
                  <h3 className="text-lg font-bold text-white">Q3: Kiske saath? (Scammer Details)</h3>
                  <p className="text-xs text-slate-400">
                    Platform, mobile numbers, group links, and available screenshots.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">Platform Used</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Telegram Group">Telegram Group</option>
                    <option value="WhatsApp Group or Direct Call">WhatsApp Group / Direct Message</option>
                    <option value="Instagram Reel / Direct Message">Instagram Reel / Finfluencer DM</option>
                    <option value="SMS / Web Phishing Portal">SMS Phishing Link</option>
                    <option value="YouTube Shorts / Ad Link">YouTube Shorts Sponsored Ad</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">
                    Scammer Name, Handle, or Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.scammerNameOrNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, scammerNameOrNumber: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="E.g. @VIP_Wealth_Club_09 or +91 9845X XXXXX"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">Evidence You Have</label>
                  <input
                    type="text"
                    value={formData.evidenceType}
                    onChange={(e) => setFormData({ ...formData, evidenceType: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-[#080e14] px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Screenshots of chat, fake PDF, transaction slip"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <div className="flex-1 text-right">
                    <span className="text-xs font-medium text-emerald-400">
                      ✓ Draft Ready to File!
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Generated Legal Draft Column */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#0b141f] p-6 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Auto-Generated SEBI SCORES Complaint
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Legally valid format in English + Hindi summary
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSaveToArchive}
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-colors shadow-sm"
                    title="Save this grievance to your local offline archive"
                  >
                    {archiveSuccessToast ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Archived!</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Save to Archive</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrintReport}
                    aria-label="Print Report as PDF for Physical Submission"
                    aria-description="Formats the current grievance into an official A4 PDF-ready layout and opens the print dialog for physical submission to SEBI or Cyber Crime authorities."
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                    title="Format and Print PDF-Ready Report for Physical Submission"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Report</span>
                  </button>

                  <button
                    onClick={() => setShowLetterheadModal(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors shadow-sm"
                    title="Preview Official Government Letterhead Dossier"
                  >
                    <Eye className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Preview Dossier</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                    title="Copy full text"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                    title="Download as file"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Save .txt</span>
                  </button>
                </div>
              </div>

              {/* Legal Text Area */}
              <div className="mt-4 max-h-[350px] overflow-y-auto rounded-xl border border-slate-800 bg-[#060a0f] p-4 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/30">
                {generateComplaintText()}
              </div>

              {/* Social Media Sharing & Awareness Bar */}
              <div className="mt-4 rounded-xl border border-slate-700/60 bg-[#070e16] p-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs">
                    <span className="font-semibold text-white">Share Scam Alert: </span>
                    <span className="text-slate-400">Warn friends &amp; family on social media</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp Share Button */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `🚨 SCAM ALERT — Bharat Investor Warning!\n\nI just generated an official SEBI SCORES complaint regarding a financial fraud attempt on ${formData.platform}:\n⚠️ Fraud Type: ${formData.category}\n⚠️ Handle/Contact: ${formData.scammerNameOrNumber}\n⚠️ Disputed Amount: ₹${Number(formData.amountLost).toLocaleString('en-IN')}\n\nNever share your Demat OTP or transfer money for guaranteed returns! Verify suspicious links with NYAYA Suraksha Kavach.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-[#20ba59] transition-colors"
                      title="Share Scam Alert on WhatsApp"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>WhatsApp Alert</span>
                    </a>

                    {/* Twitter/X Share Button */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `🚨 INVESTOR SCAM ALERT: Just generated an official SEBI complaint against an investment scam on ${formData.platform} (${formData.category}). Disputed sum: ₹${Number(formData.amountLost).toLocaleString('en-IN')}.\n\nDon't share Demat OTPs or fall for guaranteed returns!`
                      )}&hashtags=SEBI,InvestorProtection,ScamAlert,Bharat`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-black px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-900 transition-colors"
                      title="Share Scam Alert on X / Twitter"
                    >
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Post on X</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions to file on SEBI SCORES portal */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/70 pt-4">
              <div className="text-xs text-slate-400">
                <span>SEBI Portal: </span>
                <span className="font-semibold text-slate-200">scores.sebi.gov.in</span>
                <span aria-hidden="true" className="mx-1.5">
                  ·
                </span>
                <span>Toll-Free Helpline: </span>
                <span className="font-semibold text-emerald-400 font-mono-numbers">1800 22 7575</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handlePrintReport}
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-500/15 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                >
                  <Printer className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Print Report (PDF Layout)</span>
                </button>

                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <span>Go to Official SEBI SCORES Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* VIEW 2: MY COMPLAINTS ARCHIVE */}
    {viewMode === 'archive' && (
      <div className="mx-auto mt-6 max-w-5xl space-y-6 animate-fadeIn">
        {/* Archive Controls: Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#0d1622] p-4 shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
              placeholder="Search by Dossier ID, Category, Scammer, or City..."
              className="w-full rounded-xl border border-slate-700 bg-[#070e17] pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleResetDraft();
                setViewMode('drafter');
              }}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>New Grievance Draft</span>
            </button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Draft', 'Filed with SEBI', 'Under Investigation', 'FIR Registered (1930)', 'Restitution Claimed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'border border-slate-800 bg-[#09121d] text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Complaints Archive List */}
        {filteredDrafts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-[#09131e] p-12 text-center space-y-3">
            <FolderOpen className="mx-auto h-12 w-12 text-slate-600 stroke-[1.5]" />
            <h3 className="text-sm font-bold text-white">No Complaints Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {archiveSearch || statusFilter !== 'All'
                ? 'No saved drafts match your search filters. Try clearing filters.'
                : 'You have not saved any complaints yet. Your active drafts will appear here.'}
            </p>
            <button
              onClick={() => {
                setArchiveSearch('');
                setStatusFilter('All');
                setViewMode('drafter');
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create New Complaint</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDrafts.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-slate-800 bg-[#09131e] p-5 transition-all hover:border-slate-700 shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {entry.dossierId}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400">{entry.savedAt}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        entry.status === 'Filed with SEBI'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : entry.status === 'FIR Registered (1930)'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : entry.status === 'Restitution Claimed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Status:</span>
                    <select
                      value={entry.status}
                      onChange={(e) => handleUpdateStatus(entry.id, e.target.value as ComplaintStatus)}
                      className="rounded-lg border border-slate-700 bg-[#060c12] px-2.5 py-1 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Filed with SEBI">Filed with SEBI</option>
                      <option value="Under Investigation">Under Investigation</option>
                      <option value="FIR Registered (1930)">FIR Registered (1930)</option>
                      <option value="Restitution Claimed">Restitution Claimed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white">
                    {entry.title || entry.category}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {entry.formData.whatHappened}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-4 text-slate-400">
                    <span>
                      Disputed: <strong className="text-rose-400 font-mono">₹{Number(entry.amountLost || 0).toLocaleString('en-IN')}</strong>
                    </span>
                    <span>•</span>
                    <span>Platform: <strong>{entry.platform}</strong></span>
                    <span>•</span>
                    <span>City: <strong>{entry.victimCity}, {entry.victimState}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setFormData({ ...entry.formData });
                        setDossierId(entry.dossierId);
                        handlePrintReport();
                      }}
                      aria-label={`Print Report for ${entry.dossierId}`}
                      aria-description="Formats this archived complaint into an A4 PDF-ready layout and opens the print dialog for physical submission."
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                      title="Print PDF-ready physical copy"
                    >
                      <Printer className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Print Report</span>
                    </button>

                    <button
                      onClick={() => {
                        setFormData({ ...entry.formData });
                        setDossierId(entry.dossierId);
                        setShowLetterheadModal(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      <Eye className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Inspect Letterhead</span>
                    </button>

                    <button
                      onClick={() => handleEditComplaint(entry)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit & File</span>
                    </button>

                    <button
                      onClick={() => handleDuplicateComplaint(entry)}
                      className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                      title="Duplicate Draft"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteFromArchive(entry.id)}
                      className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:border-rose-800 hover:bg-rose-950/40 hover:text-rose-400"
                      title="Delete Draft"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>

      {/* PDF-Ready Printable Grievance Report & Official Letterhead Modal */}
      <div
        id="scores-printable-report"
        className={
          showLetterheadModal
            ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto print:static print:bg-white print:p-0 print:overflow-visible'
            : 'hidden print:block'
        }
      >
        <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden print:max-h-none print:max-w-none print:rounded-none print:border-0 print:bg-white print:shadow-none print:overflow-visible">
          {/* Modal Top Action Bar (Non-printable) */}
          <div className="no-print flex items-center justify-between border-b border-slate-700 bg-[#0c1622] px-5 py-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="font-bold text-white uppercase tracking-wider">
                Official SEBI SCORES 2.0 &amp; CyberCell Physical Submission Report
              </span>
              <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-800 font-mono">
                {dossierId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                title="Print this formal legal report or save as PDF"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Report / Save as PDF</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export .txt</span>
              </button>
              <button
                onClick={() => setShowLetterheadModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                title="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Printable White Paper Document Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950/50 flex justify-center print:overflow-visible print:p-0 print:bg-white">
            <div className="w-full max-w-3xl bg-white text-slate-900 shadow-xl rounded-lg p-6 sm:p-10 border border-slate-200 font-serif leading-relaxed text-xs sm:text-sm print:max-w-none print:shadow-none print:border-0 print:p-0">
              {/* Government / SEBI Formal Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <div className="text-[11px] font-sans font-bold tracking-widest text-slate-600 uppercase">
                  Physical &amp; Electronic Grievance Filing Dossier • Form SCORES-2.0 / 1930
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-bold font-serif tracking-tight text-slate-950 uppercase">
                  Securities and Exchange Board of India (SEBI)
                </div>
                <div className="text-xs font-sans text-slate-700 font-semibold">
                  Office of Investor Assistance &amp; Education • National Cyber Crime Reporting Portal (1930)
                </div>
                <div className="text-[11px] font-sans text-slate-500">
                  SEBI Bhavan, Plot No. C4-A, &apos;G&apos; Block, Bandra-Kurla Complex, Bandra (East), Mumbai - 400 051
                </div>
              </div>

              {/* Dossier Meta Strip */}
              <div className="mt-4 flex flex-wrap items-center justify-between border-b border-slate-300 pb-3 font-sans text-xs">
                <div>
                  <span className="text-slate-600 font-medium">Unique Grievance Ref: </span>
                  <strong className="font-mono text-slate-950">{dossierId}</strong>
                </div>
                <div>
                  <span className="text-slate-600 font-medium">Date of Incident: </span>
                  <strong className="text-slate-950">{formData.dateOfIncident || new Date().toISOString().split('T')[0]}</strong>
                </div>
                <div>
                  <span className="text-slate-600 font-medium">Jurisdiction: </span>
                  <strong className="text-slate-950">{formData.victimCity || 'N/A'}, {formData.victimState || 'India'}</strong>
                </div>
              </div>

              {/* Formal Title & Subject */}
              <div className="mt-5 font-sans">
                <div className="font-bold text-slate-950 uppercase tracking-wide text-xs">
                  SUBJECT: FORMAL STATUTORY COMPLAINT &amp; PHYSICAL EVIDENCE SUBMISSION AGAINST UNREGISTERED FINANCIAL FRAUD ON {(formData.platform || 'DIGITAL CHANNEL').toUpperCase()}
                </div>
                <div className="text-xs italic text-slate-700 mt-0.5">
                  Submitted under Section 11B of the SEBI Act, 1992, SEBI (PFUTP) Regulations, 2003, and Section 318(4) of the Bharatiya Nyaya Sanhita (BNS), 2023
                </div>
              </div>

              {/* Section 1: Parties Details */}
              <div className="mt-5 space-y-3 font-sans">
                <div className="rounded-md bg-slate-50 p-3.5 border border-slate-300">
                  <div className="font-bold uppercase text-[11px] tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                    1. Complainant &amp; Disputed Transaction Particulars
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="text-slate-600">Complainant City / State:</span>{' '}
                      <span className="font-semibold text-slate-950">{formData.victimCity || 'Unspecified'}, {formData.victimState || 'India'}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Disputed Financial Loss:</span>{' '}
                      <span className="font-bold text-rose-700 font-mono">INR ₹{Number(formData.amountLost || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">UTR / UPI / Bank Reference:</span>{' '}
                      <span className="font-mono font-semibold text-slate-950">{formData.utrOrTransactionId || 'N/A (Preventive Report)'}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Violation Category:</span>{' '}
                      <span className="font-semibold text-slate-950">{formData.category}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-slate-50 p-3.5 border border-slate-300">
                  <div className="font-bold uppercase text-[11px] tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                    2. Accused Entity, Channel &amp; Suspect Identifiers
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="text-slate-600">Suspect Handle / Phone / URL:</span>{' '}
                      <span className="font-semibold text-slate-950">{formData.scammerNameOrNumber || 'Unknown'}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Platform / Communication Medium:</span>{' '}
                      <span className="font-semibold text-slate-950">{formData.platform}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Statement of Facts */}
              <div className="mt-5 font-serif leading-relaxed text-justify">
                <div className="font-sans font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-300 pb-1">
                  3. Statement of Facts &amp; Violation Narrative
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-900">
                  {formData.whatHappened}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-900">
                  The accused individual(s) and entity falsely represented themselves as authorized intermediaries registered under the Securities and Exchange Board of India (Investment Advisers) Regulations, 2013, and solicited retail funds under the promise of guaranteed non-market-linked returns. This conduct explicitly violates SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158 and Section 12A of the SEBI Act, 1992.
                </p>
              </div>

              {/* Section 3: Relief Sought */}
              <div className="mt-5 font-serif">
                <div className="font-sans font-bold text-slate-950 uppercase text-xs tracking-wider border-b border-slate-300 pb-1">
                  4. Formal Prayer for Relief &amp; Enforcement Action
                </div>
                <ol className="mt-2 list-decimal list-inside space-y-1 text-xs sm:text-sm text-slate-900">
                  <li>Immediate issuance of directions under Section 11B of the SEBI Act to freeze the receiving bank/UPI mule accounts linked to UTR: <strong>{formData.utrOrTransactionId || 'Provided in Annexure'}</strong>.</li>
                  <li>Concurrent lien/freeze action via the National Cyber Crime Reporting Portal (Helpline 1930) and Nodal Bank Officer.</li>
                  <li>Direction for restitution and refund of ₹{Number(formData.amountLost || 0).toLocaleString('en-IN')} to the complainant&apos;s bank account.</li>
                  <li>Immediate takedown of the fraudulent handle/domain &ldquo;{formData.scammerNameOrNumber}&rdquo; to protect retail investors.</li>
                </ol>
              </div>

              {/* Section 4: Dual Hindi Statement */}
              <div className="mt-5 rounded-md bg-amber-50/70 p-3.5 border border-amber-300 font-sans text-xs text-slate-900">
                <div className="font-bold text-slate-950 text-xs">
                  5. शिकायत सारांश (आधिकारिक हिन्दी प्रारूप — भौतिक जमा हेतु):
                </div>
                <p className="mt-1 leading-relaxed">
                  उपरोक्त मामले में प्रार्थी के साथ {formData.platform} पर अवैध मुनाफे और फर्जी प्रतिभूतियों का झांसा देकर धोखाधड़ी की गई है। कुल विवादित राशि ₹{Number(formData.amountLost || 0).toLocaleString('en-IN')} (UTR: {formData.utrOrTransactionId || 'संलग्न'}) है। सेबी अधिनियम 1992, SCORES 2.0 एवं राष्ट्रीय साइबर अपराध पोर्टल (1930) के अंतर्गत संबंधित लाभार्थी बैंक खाते को तुरंत फ्रीज करने एवं राशि वापसी का आदेश पारित करने की कृपा करें।
                </p>
              </div>

              {/* Section 5: Physical Submission Checklist & Signature Block for Authorities */}
              <div className="mt-6 border-t border-slate-300 pt-4 font-sans text-xs">
                <div className="font-bold text-slate-950 uppercase tracking-wider text-[11px] mb-2">
                  6. Attached Physical Evidence &amp; Verification Block (For Police Station / SEBI Regional Office)
                </div>
                <p className="text-[11px] text-slate-700 mb-4">
                  <strong>Enclosed Annexures:</strong> {formData.evidenceType || 'Screenshots of fraudulent communication, bank/UPI debit statement, and suspect profile details.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
                  <div className="border border-slate-300 rounded-md p-3 bg-slate-50/60">
                    <div className="text-[10px] font-bold uppercase text-slate-500">
                      Complainant Declaration &amp; Signature
                    </div>
                    <p className="mt-1 text-[10px] text-slate-600 leading-snug">
                      I hereby declare that the facts stated above are true and accurate to the best of my knowledge.
                    </p>
                    <div className="mt-7 border-b border-dashed border-slate-400" />
                    <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                      <span>Signature of Complainant</span>
                      <span>Place: {formData.victimCity || '________'}</span>
                    </div>
                  </div>

                  <div className="border border-slate-300 rounded-md p-3 bg-slate-50/60">
                    <div className="text-[10px] font-bold uppercase text-slate-500">
                      For Official Use Only (Receiving Authority Stamp)
                    </div>
                    <div className="mt-2 space-y-1 text-[10px] text-slate-600">
                      <div>1930 / Police Diary Ack No: _______________________</div>
                      <div>Receiving Officer Name &amp; Designation: ______________</div>
                      <div>Date &amp; Official Seal:</div>
                    </div>
                    <div className="mt-4 h-6" />
                  </div>
                </div>
              </div>

              {/* Evidence & Verification Stamp Footer */}
              <div className="mt-6 border-t-2 border-slate-900 pt-3 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-950 flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-emerald-700" />
                    <span>Certified via NYAYA Sathi Investor Redressal Framework</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Dossier ID: {dossierId} • Sangyan Guardrail Compliant Physical Copy
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-[10px] text-slate-600">
                    <div>FILE ONLINE OR VERIFY AT</div>
                    <div className="font-mono font-bold text-slate-900">scores.sebi.gov.in | 1930</div>
                  </div>
                  <div className="h-11 w-11 rounded border border-slate-400 bg-slate-100 flex items-center justify-center p-1 text-slate-900">
                    <QrCode className="h-9 w-9 text-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
