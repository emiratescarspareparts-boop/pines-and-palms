"use client";

import { useMemo, useState } from "react";
import {
    AlertTriangle,
    Droplets,
    Gauge,
    Wrench,
    Volume2,
    ShieldCheck,
    Clock,
    CheckCircle2,
    Circle,
    Truck,
    CreditCard,
    MapPin,
    ChevronRight,
    Activity,
} from "lucide-react";

/**
 * SteeringRackDiagnostic
 * Renders ONLY the `article` object of a product record as a symptom
 * diagnostic tool. Route: /car-spare-parts-failure-symptoms/[id]
 * where [id] === product.id.
 *
 * Expected shape (see product-67-updated.json):
 * product.article = {
 *   headline, description,
 *   replacement_guidance: { heading, interval_label, paragraph },
 *   sections: [{ type: "intro"|"symptom"|"closing", heading, paragraph }]
 * }
 */

// Maps a symptom heading to a representative icon. Falls back to Activity.
function iconForSymptom(heading = "") {
    const h = heading.toLowerCase();
    if (h.includes("leak") || h.includes("fluid")) return Droplets;
    if (h.includes("stiff") || h.includes("tight") || h.includes("turn")) return Gauge;
    if (h.includes("clunk") || h.includes("knock")) return Wrench;
    if (h.includes("whin") || h.includes("noise") || h.includes("sound")) return Volume2;
    return Activity;
}

export default function DiagnosisComponent({ product }) {
    const article = product?.article;
    const comp = product?.compatibility?.[0];
    const symptomSections = useMemo(
        () => (article?.sections || []).filter((s) => s.type === "symptom"),
        [article]
    );
    const introSection = article?.sections?.find((s) => s.type === "intro");
    const closingSection = article?.sections?.find((s) => s.type === "closing");

    const [checked, setChecked] = useState(() => new Set());

    const toggle = (idx) => {
        setChecked((prev) => {
            const next = new Set(prev);
            next.has(idx) ? next.delete(idx) : next.add(idx);
            return next;
        });
    };

    const matchCount = checked.size;
    const totalSymptoms = symptomSections.length;
    const matchPct = totalSymptoms ? Math.round((matchCount / totalSymptoms) * 100) : 0;

    // Needle rotation: -90deg (none) to +90deg (all symptoms present)
    const needleRotation = -90 + (matchPct / 100) * 180;

    const diagnosisTier =
        matchCount === 0
            ? { label: "No symptoms selected", tone: "muted" }
            : matchCount === 1
                ? { label: "Early warning — monitor closely", tone: "amber" }
                : { label: "Strong match — steering rack likely failing", tone: "critical" };

    const toneClasses = {
        muted: "text-[#8A8F98] border-[#2A2F38]",
        amber: "text-[#E8A33D] border-[#E8A33D]/40",
        critical: "text-[#D9634A] border-[#D9634A]/40",
    };

    if (!article) return null;

    return (
        <div className="bg-[#14171C] text-[#EDEEF2] font-['IBM_Plex_Sans',sans-serif] min-h-screen">
            {/* ---------- HERO ---------- */}
            <section className="relative overflow-hidden border-b border-[#2A2F38]">
                <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 text-[#E8A33D] text-xs tracking-[0.2em] uppercase font-semibold mb-4">
                            <Activity size={14} strokeWidth={2.5} />
                            Steering System Diagnostic
                        </div>
                        <h1
                            className="font-['Oswald',sans-serif] uppercase tracking-tight text-4xl md:text-5xl leading-[1.05] mb-5"
                            style={{ fontWeight: 600 }}
                        >
                            {article.headline}
                        </h1>
                        <p className="text-[#B7BBC2] text-base leading-relaxed mb-6 max-w-xl">
                            {article.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {comp && (
                                <span className="inline-flex items-center gap-1.5 bg-[#1D2129] border border-[#2A2F38] rounded px-3 py-1.5 text-sm">
                                    <ShieldCheck size={15} className="text-[#4FA98C]" />
                                    {comp.make} {comp.model} · {comp.years}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 bg-[#1D2129] border border-[#2A2F38] rounded px-3 py-1.5 text-xs font-['IBM_Plex_Mono',monospace] text-[#8A8F98]">
                                PN {product.partnumber}
                            </span>
                        </div>

                        <a
                            href="#diagnose"
                            className="inline-flex items-center gap-2 bg-[#E8A33D] text-[#14171C] font-semibold px-5 py-3 rounded hover:bg-[#f0b155] transition-colors"
                        >
                            Run symptom check
                            <ChevronRight size={16} />
                        </a>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-xl border border-[#2A2F38] pointer-events-none" />
                        <div className="relative rounded-lg overflow-hidden border border-[#2A2F38] bg-[#1D2129]">
                            <img
                                src={product.image}
                                alt={`Genuine ${comp?.make} ${comp?.model} ${product.partname}`}
                                className="w-full h-72 object-cover opacity-90"
                            />
                            <div className="absolute top-3 left-3 bg-[#14171C]/90 border border-[#2A2F38] rounded px-3 py-1 text-xs font-['IBM_Plex_Mono',monospace] text-[#4FA98C]">
                                {product.availability}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- INTRO ---------- */}
            {introSection && (
                <section className="max-w-6xl mx-auto px-6 py-12 border-b border-[#2A2F38]">
                    <div className="flex gap-4 items-start max-w-3xl">
                        <AlertTriangle size={22} className="text-[#E8A33D] shrink-0 mt-1" />
                        <div>
                            <h2 className="font-['Oswald',sans-serif] uppercase text-xl mb-2 tracking-wide">
                                {introSection.heading}
                            </h2>
                            <p className="text-[#B7BBC2] leading-relaxed">{introSection.paragraph}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- DIAGNOSTIC GAUGE + CHECKLIST ---------- */}
            <section id="diagnose" className="max-w-6xl mx-auto px-6 py-14 border-b border-[#2A2F38]">
                <div className="grid md:grid-cols-[280px_1fr] gap-10">
                    {/* Gauge */}
                    <div className="md:sticky md:top-8 self-start">
                        <div className="bg-[#1D2129] border border-[#2A2F38] rounded-lg p-6">
                            <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F98] mb-4">
                                Symptom Match
                            </p>
                            <div className="relative w-full aspect-[2/1] mb-4">
                                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                                    <path
                                        d="M 10 100 A 90 90 0 0 1 190 100"
                                        fill="none"
                                        stroke="#2A2F38"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 10 100 A 90 90 0 0 1 190 100"
                                        fill="none"
                                        stroke={
                                            diagnosisTier.tone === "critical"
                                                ? "#D9634A"
                                                : diagnosisTier.tone === "amber"
                                                    ? "#E8A33D"
                                                    : "#3A3F48"
                                        }
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(matchPct / 100) * 283} 283`}
                                    />
                                    <line
                                        x1="100"
                                        y1="100"
                                        x2="100"
                                        y2="25"
                                        stroke="#EDEEF2"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{
                                            transformOrigin: "100px 100px",
                                            transform: `rotate(${needleRotation}deg)`,
                                            transition: "transform 0.4s ease",
                                        }}
                                    />
                                    <circle cx="100" cy="100" r="5" fill="#EDEEF2" />
                                </svg>
                            </div>
                            <div
                                className={`text-sm font-semibold border rounded px-3 py-2 text-center ${toneClasses[diagnosisTier.tone]}`}
                            >
                                {diagnosisTier.label}
                            </div>
                            <p className="text-xs text-[#8A8F98] mt-3 leading-relaxed">
                                {matchCount}/{totalSymptoms} symptoms selected. Check every box that matches
                                what you're experiencing.
                            </p>
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-3">
                        <h2 className="font-['Oswald',sans-serif] uppercase text-xl tracking-wide mb-2">
                            Select Your Symptoms
                        </h2>
                        {symptomSections.map((s, idx) => {
                            const Icon = iconForSymptom(s.heading);
                            const isChecked = checked.has(idx);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => toggle(idx)}
                                    className={`w-full text-left flex gap-4 items-start p-5 rounded-lg border transition-colors ${isChecked
                                        ? "bg-[#E8A33D]/[0.07] border-[#E8A33D]/50"
                                        : "bg-[#1D2129] border-[#2A2F38] hover:border-[#3A3F48]"
                                        }`}
                                >
                                    <span className="shrink-0 mt-0.5">
                                        {isChecked ? (
                                            <CheckCircle2 size={20} className="text-[#E8A33D]" />
                                        ) : (
                                            <Circle size={20} className="text-[#4A4F58]" />
                                        )}
                                    </span>
                                    <Icon size={20} className="text-[#8A8F98] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-[#EDEEF2] mb-1">{s.heading}</p>
                                        <p className="text-sm text-[#8A8F98] leading-relaxed">{s.paragraph}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------- REPLACEMENT INTERVAL ---------- */}
            {article.replacement_guidance && (
                <section className="max-w-6xl mx-auto px-6 py-14 border-b border-[#2A2F38]">
                    <div className="flex gap-5 items-start bg-[#1D2129] border border-[#2A2F38] rounded-lg p-7">
                        <Clock size={26} className="text-[#4FA98C] shrink-0 mt-1" />
                        <div>
                            <h2 className="font-['Oswald',sans-serif] uppercase text-xl tracking-wide mb-2">
                                {article.replacement_guidance.heading}
                            </h2>
                            <p className="font-['IBM_Plex_Mono',monospace] text-[#4FA98C] text-sm mb-3">
                                Typical interval: {article.replacement_guidance.interval_label}
                            </p>
                            <p className="text-[#B7BBC2] leading-relaxed">
                                {article.replacement_guidance.paragraph}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- CLOSING / CTA ---------- */}
            {closingSection && (
                <section className="max-w-6xl mx-auto px-6 py-14">
                    <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">
                        <div>
                            <h2 className="font-['Oswald',sans-serif] uppercase text-xl tracking-wide mb-2">
                                {closingSection.heading}
                            </h2>
                            <p className="text-[#B7BBC2] leading-relaxed mb-6">{closingSection.paragraph}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-[#8A8F98]">
                                <span className="inline-flex items-center gap-1.5">
                                    <Truck size={16} /> {product.policies?.shipping}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin size={16} /> {product.policies?.delivery}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <CreditCard size={16} /> {product.policies?.payment_methods?.[0]}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#1D2129] border border-[#2A2F38] rounded-lg p-6">
                            <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F98] mb-1">
                                {product.item_specifics?.["OEM or Aftermarket"]} · {product.item_specifics?.Condition}
                            </p>
                            <p className="font-['Oswald',sans-serif] text-3xl mb-1">
                                {product.pricing?.currency} {product.pricing?.price?.toLocaleString()}
                            </p>
                            <p className="text-xs text-[#8A8F98] mb-5 leading-relaxed">
                                {product.pricing?.price_info}
                            </p>
                            <button className="w-full bg-[#E8A33D] text-[#14171C] font-semibold py-3 rounded hover:bg-[#f0b155] transition-colors">
                                Check availability
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}