"use client";
import { useAuth } from "@/lib/auth-context";
import type { ActivityEntry, ActivityType } from "@/lib/types";
import Link from "next/link";

// ── Badge config ─────────────────────────────────────────────────────────────

const TYPE_META: Record<
  ActivityType,
  { label: string; emoji: string; color: string; bg: string; border: string }
> = {
  notice_generated: {
    label: "Notice Generated",
    emoji: "📄",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  intake_started: {
    label: "Intake Started",
    emoji: "📝",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  clinic_reviewed: {
    label: "Clinic Reviewed",
    emoji: "⚖️",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  settlement_viewed: {
    label: "Settlement Viewed",
    emoji: "🤝",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  unpaid_wages: "Unpaid Wages",
  consumer_fraud: "Consumer Fraud",
  security_deposit: "Security Deposit",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ── Activity card ─────────────────────────────────────────────────────────────

function ActivityCard({ entry }: { entry: ActivityEntry }) {
  const meta = TYPE_META[entry.type];
  return (
    <div
      className={`p-4 rounded-xl border ${meta.border} ${meta.bg} flex gap-3 items-start`}
    >
      <span className="text-xl mt-0.5 shrink-0">{meta.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs font-semibold uppercase tracking-wide ${meta.color}`}>
            {meta.label}
          </span>
          {entry.category && (
            <span className="text-xs text-slate-400">
              · {CATEGORY_LABELS[entry.category] ?? entry.category}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-700 leading-snug">{entry.summary}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
          {entry.caseId && (
            <span>
              Case: <code className="bg-white px-1 rounded border border-slate-200">{entry.caseId.slice(0, 12)}</code>
            </span>
          )}
          {entry.noticeId && (
            <span>
              Notice: <code className="bg-white px-1 rounded border border-slate-200">{entry.noticeId.slice(0, 12)}</code>
            </span>
          )}
          <span>{formatDate(entry.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Stats strip ───────────────────────────────────────────────────────────────

function StatsStrip({ activity }: { activity: ActivityEntry[] }) {
  const notices = activity.filter((a) => a.type === "notice_generated").length;
  const intakes = activity.filter((a) => a.type === "intake_started").length;
  const sessions = activity.length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: "Total Sessions", value: sessions, color: "text-slate-800" },
        { label: "Intakes Started", value: intakes, color: "text-blue-700" },
        { label: "Notices Generated", value: notices, color: "text-green-700" },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white border border-slate-200 rounded-xl p-4 text-center"
        >
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const { user, loading, signIn, activity } = useAuth();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400 text-sm">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your Activity</h1>
        <p className="text-slate-500 text-sm mb-6">
          Sign in with your Google account to view your saved session history.
        </p>
        <button
          type="button"
          onClick={() => signIn().catch(() => {})}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#fff" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt={user.displayName ?? "Avatar"}
            className="w-10 h-10 rounded-full border border-slate-200 shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
            {(user.displayName ?? user.email ?? "U")[0].toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 truncate">
            {user.displayName ?? user.email}&apos;s Activity
          </h1>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <StatsStrip activity={activity} />

      {/* Timeline */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          Session History
        </h2>
        <span className="text-xs text-slate-400">{activity.length} event{activity.length !== 1 ? "s" : ""}</span>
      </div>

      {activity.length === 0 ? (
        <div className="py-12 text-center rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">No activity yet.</p>
          <p className="text-slate-400 text-xs mt-1">
            Start a grievance intake and your sessions will appear here.
          </p>
          <Link
            href="/citizen"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Intake →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {activity.map((entry) => (
            <ActivityCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
