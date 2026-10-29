"use client";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useState } from "react";

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="w-7 h-7 rounded-full bg-slate-200 animate-pulse shrink-0" aria-label="Loading auth" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/activity"
          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          title="Your activity"
        >
          📋 Your Activity
        </Link>

        {/* Avatar + name */}
        <div className="flex items-center gap-1.5">
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt={user.displayName ?? "User avatar"}
              className="w-7 h-7 rounded-full border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {(user.displayName ?? user.email ?? "U")[0].toUpperCase()}
            </div>
          )}
          <span className="hidden md:inline text-xs text-slate-600 font-medium max-w-[120px] truncate">
            {user.displayName ?? user.email}
          </span>
        </div>

        <button
          type="button"
          onClick={async () => {
            setBusy(true);
            await signOut().finally(() => setBusy(false));
          }}
          disabled={busy}
          className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50 shrink-0"
        >
          {busy ? "…" : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        setBusy(true);
        await signIn().catch(() => {}).finally(() => setBusy(false));
      }}
      disabled={busy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors disabled:opacity-50 shrink-0"
      title="Sign in with Google"
    >
      {/* Google G icon */}
      <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
        <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3 0 5.8 1.1 7.9 3l6-6C34.5 6.5 29.5 4 24 4 15.6 4 8.4 8.8 6.3 14.7z"/>
        <path fill="#FBBC05" d="M24 44c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.6 35.4 26.9 36 24 36c-5.6 0-10.1-2.9-11.7-7.5l-7 5.4C8.4 39.3 15.6 44 24 44z"/>
        <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.8 2.3-2.3 4.2-4.3 5.5l6.5 5.3C42 35.9 44.5 30.4 44.5 24c0-1.3-.1-2.7-.2-4z"/>
      </svg>
      {busy ? "Signing in…" : "Sign in with Google"}
    </button>
  );
}
