import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ShieldAlert,
  FileCheck2,
  Check,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { InAppNotification, PageId } from '../types';

interface NotificationCenterProps {
  notifications: InAppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onNavigate: (page: PageId, sampleId?: string) => void;
  onSimulateNewRadarAlert: () => void;
  onSimulateComplaintUpdate: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNavigate,
  onSimulateNewRadarAlert,
  onSimulateComplaintUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'radar_scam' | 'complaint_status'>('all');
  const panelRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (n: InAppNotification) => {
    onMarkAsRead(n.id);
    setIsOpen(false);
    if (n.targetPage) {
      onNavigate(n.targetPage, n.metadata?.scamSampleId);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:border-emerald-500 hover:text-white"
        title="In-App Alerts & Notifications"
        aria-label="Alerts & Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-md animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] sm:w-[420px] rounded-2xl border border-slate-700/90 bg-[#0d1622] p-4 shadow-2xl z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Bell className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">In-App Threat &amp; SCORES Alerts</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {unreadCount} unread update{unreadCount !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="rounded-md px-2 py-1 text-[10px] font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-2.5 flex gap-1 border-b border-slate-800/80 pb-2.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter('radar_scam')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeFilter === 'radar_scam'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="h-3 w-3 text-rose-400" />
              <span>Threat Radar</span>
            </button>
            <button
              onClick={() => setActiveFilter('complaint_status')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeFilter === 'complaint_status'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="h-3 w-3 text-emerald-400" />
              <span>SCORES Status</span>
            </button>
          </div>

          {/* Notifications Scrollable List */}
          <div className="mt-2 max-h-[340px] space-y-2 overflow-y-auto pr-1">
            {filteredNotifications.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <Bell className="mx-auto h-8 w-8 text-slate-600" />
                <div className="mt-2 text-xs font-semibold">No notifications in this category</div>
                <div className="text-[10px]">You are caught up with all live updates!</div>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`group relative flex cursor-pointer gap-3 rounded-xl border p-3 transition-all ${
                    !n.read
                      ? 'border-slate-700 bg-[#101c2b] hover:bg-[#142337]'
                      : 'border-slate-800/70 bg-[#080f17] hover:bg-[#0c1622] opacity-80'
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!n.read && (
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#101c2b]" />
                  )}

                  {/* Icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      n.type === 'radar_scam'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {n.type === 'radar_scam' ? (
                      <ShieldAlert className="h-4 w-4" />
                    ) : (
                      <FileCheck2 className="h-4 w-4" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-300">
                      <span>{n.title}</span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-300 leading-snug">
                      {n.message}
                    </p>

                    {/* Metadata Badge */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                      {n.metadata?.city && (
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">
                          📍 {n.metadata.city}, {n.metadata.state}
                        </span>
                      )}
                      {n.metadata?.complaintId && (
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400 font-mono font-semibold">
                          #{n.metadata.complaintId}
                        </span>
                      )}
                      {n.metadata?.newStatus && (
                        <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-emerald-300 font-medium border border-emerald-800/40">
                          {n.metadata.newStatus}
                        </span>
                      )}
                      <span className="ml-auto text-slate-500">{n.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Interactive Simulation Sandbox Bar */}
          <div className="mt-3 border-t border-slate-800 pt-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
              <span>Simulate Real-Time In-App Triggers</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSimulateNewRadarAlert();
                }}
                className="flex items-center justify-center gap-1 rounded-lg border border-rose-900/60 bg-rose-950/30 px-2 py-1.5 text-[11px] font-semibold text-rose-300 hover:bg-rose-900/40 transition-colors"
                title="Trigger simulated high-risk scam alert"
              >
                <PlusCircle className="h-3 w-3 text-rose-400" />
                <span>+ High-Risk Scam</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSimulateComplaintUpdate();
                }}
                className="flex items-center justify-center gap-1 rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-2 py-1.5 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900/40 transition-colors"
                title="Trigger simulated complaint status change"
              >
                <RefreshCw className="h-3 w-3 text-emerald-400" />
                <span>+ Complaint Update</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Toast notification banner component
interface NotificationToastProps {
  notification: InAppNotification | null;
  onClose: () => void;
  onClick: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onClick,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-slate-700/90 bg-[#0e1724]/95 p-4 shadow-2xl backdrop-blur-md animate-slideUp">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            notification.type === 'radar_scam'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}
        >
          {notification.type === 'radar_scam' ? (
            <ShieldAlert className="h-5 w-5" />
          ) : (
            <FileCheck2 className="h-5 w-5" />
          )}
        </div>

        <div className="flex-1 cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            <span>In-App Alert</span>
            <span aria-hidden="true">·</span>
            <span>{notification.timestamp}</span>
          </div>
          <div className="text-xs font-bold text-white">{notification.title}</div>
          <p className="mt-1 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white"
          title="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2 text-[10px]">
        <span className="text-slate-400">Tap to inspect details</span>
        <button
          onClick={onClick}
          className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
        >
          <span>View Alert</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
