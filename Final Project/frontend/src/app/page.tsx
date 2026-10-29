import Link from "next/link";

// ── Data ─────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Describe your grievance",
    body: "Type or speak your problem in plain Hindi or English — no legal jargon needed. The app understands wage theft, consumer fraud, security-deposit disputes, and more.",
    icon: "🎙",
    color: "blue",
  },
  {
    step: "02",
    title: "AI extracts the legal facts",
    body: "Our AI asks short follow-up questions to collect the exact facts required by law — employer name, amount owed, dates, evidence. Nothing extra, nothing missing.",
    icon: "🤖",
    color: "violet",
  },
  {
    step: "03",
    title: "Statute-cited notice is drafted",
    body: "A formal legal notice is generated, citing verified sections from the Payment of Wages Act, Consumer Protection Act, Model Tenancy Act, and 31 other statutes.",
    icon: "📄",
    color: "green",
  },
  {
    step: "04",
    title: "Law clinic reviews & approves",
    body: "A law-clinic student or paralegal verifies every citation (green badge = MCP-verified). They approve the notice or send it back with notes.",
    icon: "⚖️",
    color: "amber",
  },
  {
    step: "05",
    title: "Notice dispatched — 7-day clock starts",
    body: "The opposing party receives a SHA-256 verified PDF. They have 7 days to settle. If they ignore it, you get a direct link to e-Daakhil or Samadhan to escalate.",
    icon: "📬",
    color: "red",
  },
] as const;

const ROLES = [
  {
    href: "/citizen",
    emoji: "🙋",
    title: "Citizen View",
    subtitle: "I have a grievance",
    desc: "Submit your problem by voice or text. Watch it become a verified legal notice in minutes — for free.",
    color: "blue",
    cta: "Start my intake →",
    badge: "Most common",
  },
  {
    href: "/clinic",
    emoji: "⚖️",
    title: "Law Clinic Reviewer",
    subtitle: "I review notices",
    desc: "Open the review queue. See MCP-verified statute badges. Approve notices with one click or send back with notes.",
    color: "green",
    cta: "Open review queue →",
    badge: null,
  },
  {
    href: "/settlement/demo",
    emoji: "🤝",
    title: "Opposing Party",
    subtitle: "I received a notice",
    desc: "View the formal notice, see the live 7-day countdown timer, and propose a settlement or pay dues directly.",
    color: "amber",
    cta: "View settlement portal →",
    badge: null,
  },
  {
    href: "/dashboard",
    emoji: "📊",
    title: "Impact Dashboard",
    subtitle: "Show me the data",
    desc: "₹0 per notice, 97% cost reduction vs traditional legal fees. SDG 16 metrics and full pipeline view.",
    color: "violet",
    cta: "See impact →",
    badge: null,
  },
] as const;

const FEATURES = [
  { icon: "🎙", text: "Voice input — Hindi & English" },
  { icon: "🔒", text: "Zero hallucination — MCP-verified statutes" },
  { icon: "📄", text: "SHA-256 tamper-proof PDF" },
  { icon: "⏱", text: "7-day settlement countdown" },
  { icon: "📚", text: "34 statute provisions covered" },
  { icon: "💰", text: "₹0 running cost (Ollama / open-source LLM)" },
  { icon: "⚖️", text: "e-Daakhil & Samadhan escalation links" },
  { icon: "🛡", text: "JWT-authenticated clinic reviewer login" },
  { icon: "🌐", text: "Bilingual notices — Hindi & English" },
  { icon: "🔁", text: "Full pre-litigation pipeline in one app" },
];

const FAQS = [
  {
    q: "Is this real legal advice?",
    a: "No. This tool helps you draft a pre-litigation legal notice — the first formal step before a court case. Always consult a qualified lawyer before escalating to court.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is needed to submit a grievance. Sign in with Google only if you want your session history saved under \u201cYour Activity\u201d.",
  },
  {
    q: "Which disputes can I raise?",
    a: "Currently: unpaid wages, consumer fraud / defective goods, and security-deposit disputes. More categories are being added.",
  },
  {
    q: "Is my data safe?",
    a: "Personal details are masked (PII-stripped) before being sent to the AI. No identifiable information is stored on any external server.",
  },
  {
    q: "What happens if the opposing party ignores the notice?",
    a: "After 7 days with no response you receive a direct escalation link — to e-Daakhil (for consumer cases) or Samadhan (for labour disputes) — to file a formal complaint.",
  },
];

// ── Colour helpers ────────────────────────────────────────────────────────────

const STEP_COLOR: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-700 border-blue-200",
  violet: "bg-violet-100 text-violet-700 border-violet-200",
  green:  "bg-green-100 text-green-700 border-green-200",
  amber:  "bg-amber-100 text-amber-700 border-amber-200",
  red:    "bg-red-100 text-red-700 border-red-200",
};

const CARD_BORDER: Record<string, string> = {
  blue:   "border-blue-200 hover:border-blue-400 hover:bg-blue-50",
  green:  "border-green-200 hover:border-green-400 hover:bg-green-50",
  amber:  "border-amber-200 hover:border-amber-400 hover:bg-amber-50",
  violet: "border-violet-200 hover:border-violet-400 hover:bg-violet-50",
};

const CTA_COLOR: Record<string, string> = {
  blue:   "text-blue-600",
  green:  "text-green-600",
  amber:  "text-amber-600",
  violet: "text-violet-600",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center py-14 sm:py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-700 mb-5">
          ⚖️ SDG 16 · Pre-Litigation Legal Aid · Powered by Open-Source AI
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          Know your legal rights.<br />
          <span className="text-blue-600">Draft your notice. Free.</span>
        </h1>

        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Describe your grievance in plain Hindi or English — by voice or text.
          Get a statute-cited, law-clinic-verified legal notice in minutes.
          No lawyer fee. No jargon. No court visit needed upfront.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/citizen"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            🙋 Start my intake — it&apos;s free
          </Link>
          <a
            href="#how-it-works"
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Learn how it works ↓
          </a>
        </div>
      </section>

      {/* ── What is this app ─────────────────────────────────────────────── */}
      <section className="mb-16 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">About this app</h2>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
          <strong>Legal Rights Navigator</strong> is a free, AI-powered pre-litigation engine built for everyday citizens in India.
          Most people cannot afford a lawyer for a ₹20,000 wage dispute or a ₹5,000 consumer complaint.
          This app closes that gap — turning your spoken or typed grievance into a
          formally worded legal notice, cited to the exact statute section, and reviewed by a law-clinic volunteer,
          all at <strong>zero cost</strong>.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          The app covers <strong>unpaid wages</strong>, <strong>consumer fraud</strong>, and <strong>security-deposit disputes</strong>.
          Notices are verified against 34 statute provisions using an MCP (Model Context Protocol) statute server,
          so every legal citation is real — not hallucinated.
        </p>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="mb-16 scroll-mt-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">How it works</h2>
        <p className="text-slate-400 text-sm text-center mb-8">Five steps from grievance to dispatched notice</p>

        <div className="space-y-4">
          {HOW_IT_WORKS.map((s) => (
            <div
              key={s.step}
              className="flex gap-4 items-start bg-white border border-slate-200 rounded-2xl p-5"
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${STEP_COLOR[s.color]}`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-300 font-mono">STEP {s.step}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Explore by role ──────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Explore the app</h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Four views — try each one to see the complete pipeline
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`group relative p-6 rounded-2xl bg-white border-2 transition-all ${CARD_BORDER[r.color]}`}
            >
              {r.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                  {r.badge}
                </span>
              )}
              <div className="text-3xl mb-3">{r.emoji}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{r.subtitle}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{r.title}</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{r.desc}</p>
              <span className={`text-sm font-semibold ${CTA_COLOR[r.color]} group-hover:underline`}>{r.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Feature pills ────────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">What&apos;s inside</h2>
        <p className="text-slate-400 text-sm text-center mb-6">Every feature, at a glance</p>
        <div className="flex flex-wrap justify-center gap-2">
          {FEATURES.map((f, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 shadow-sm"
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Frequently asked questions</h2>
        <p className="text-slate-400 text-sm text-center mb-8">Quick answers before you start</p>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-800 mb-1.5">Q: {f.q}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="text-center py-10 bg-blue-50 border border-blue-200 rounded-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to assert your rights?</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
          It takes under 5 minutes. No account required. Free forever.
        </p>
        <Link
          href="/citizen"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          🙋 Start my free legal notice →
        </Link>
      </section>

    </div>
  );
}
