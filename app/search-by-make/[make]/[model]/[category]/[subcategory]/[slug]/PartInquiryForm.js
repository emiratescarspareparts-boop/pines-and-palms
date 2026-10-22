"use client";

import { useEffect, useRef, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-roboto",
});

const safeDecode = (s = "") => {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
};

const pad = (n) => String(n).padStart(2, "0");
const timestamp = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 " +
    "focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/30";

const Field = ({ id, label, children }) => (
    <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-700">
            {label}
        </label>
        {children}
    </div>
);

const PartInquiryModal = ({ isOpen, onClose, product, subcategory, vehicle }) => {
    const isBattery = subcategory === "Battery";
    const initialPartList = `${product.partname} (${product.partnumber})${vehicle ? ` - ${vehicle}` : ""}`;

    const emptyForm = { name: "", email: "", phone: "", address: "", partList: initialPartList };
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const nameRef = useRef(null);

    // Escape to close, lock body scroll, focus first field
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        nameRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    // Reset to a fresh form each time the modal is reopened
    useEffect(() => {
        if (isOpen) {
            setStatus("idle");
            setFormData({ name: "", email: "", phone: "", address: "", partList: initialPartList });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");

        try {
            const res = await fetch("/api/vw-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Timestamp: timestamp(),
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    address: formData.address.trim(),
                    partList: formData.partList,
                }),
            });
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="inquiry-title"
                className={`max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl ${roboto.className}`}
            >
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h4 id="inquiry-title" className="text-xl font-bold text-gray-900">
                            {isBattery ? "Order Now" : "Get Best Price"}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                            Share your details and we will reply on WhatsApp within a few hours.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                {status === "success" ? (
                    <div className="py-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                            ✓
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Inquiry submitted</p>
                        <p className="mt-1 text-sm text-gray-500">We will contact you shortly with price and availability.</p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 rounded-xl bg-green-600 px-6 py-2.5 font-semibold text-white hover:bg-green-700"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field id="inq-part" label="Part">
                            <input
                                id="inq-part"
                                type="text"
                                name="partList"
                                value={formData.partList}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                            />
                        </Field>

                        <Field id="inq-name" label="Name">
                            <input
                                ref={nameRef}
                                id="inq-name"
                                type="text"
                                name="name"
                                placeholder="Your name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field id="inq-phone" label="WhatsApp No">
                                <input
                                    id="inq-phone"
                                    type="tel"
                                    name="phone"
                                    inputMode="tel"
                                    placeholder="+971 50 123 4567"
                                    autoComplete="tel"
                                    minLength={7}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </Field>
                            <Field id="inq-email" label="Email">
                                <input
                                    id="inq-email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </Field>
                        </div>

                        <Field id="inq-address" label="Location">
                            <input
                                id="inq-address"
                                type="text"
                                name="address"
                                placeholder="e.g. Dubai, UAE"
                                autoComplete="address-level2"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </Field>

                        {status === "error" && (
                            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                                Something went wrong sending your inquiry. Please try again.
                            </p>
                        )}

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl bg-gray-100 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="rounded-xl bg-green-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === "loading" ? "Submitting..." : "Submit Inquiry"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default function PartInquiryForm({ product, subcategory, make, model }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const decodedSubcategory = safeDecode(subcategory);
    const isBattery = decodedSubcategory === "Battery";
    const vehicle = [make, model].filter(Boolean).map(safeDecode).join(" ");

    return (
        <div>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/40"
            >
                {isBattery ? "Order Now" : "Get Best Price"}
            </button>

            {product?.pricing?.price_info && (
                <p className={`mt-2 text-center text-xs text-gray-500 ${roboto.className}`}>{product.pricing.price_info}</p>
            )}

            <PartInquiryModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                product={product}
                subcategory={decodedSubcategory}
                vehicle={vehicle}
            />
        </div>
    );
}