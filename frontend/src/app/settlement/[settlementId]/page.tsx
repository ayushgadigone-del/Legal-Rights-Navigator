// Dynamic route: /settlement/[settlementId]
// Reads ?token= from the URL and renders the settlement page.
// The demo route /settlement/demo is handled by settlement/demo/page.tsx first.
"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SettlementDemoPage from "../demo/page";

function SettlementContent() {
  const params = useSearchParams();
  const token = params.get("token");
  // For now, render the same demo UI regardless of token.
  // In production: verify token with backend before showing notice.
  return <SettlementDemoPage />;
}

export default function SettlementDynamicPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading settlement…</div>}>
      <SettlementContent />
    </Suspense>
  );
}
