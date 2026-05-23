"use client";

import { useState } from "react";
import { contact, brand, WEB3FORMS_ACCESS_KEY } from "../lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const botcheck = String(fd.get("botcheck") ?? "");

    // ハニーポット: 値が入っていれば送信せず成功扱いで捨てる
    if (botcheck) {
      setStatus("success");
      setFeedback("送信しました。2営業日以内にご返信します。");
      form.reset();
      return;
    }

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("お名前・メール・ご相談内容は必須です。");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setFeedback("メールアドレスの形式が正しくありません。");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      // Web3Forms へブラウザから直接送信（サーバー経由だと Cloudflare に 403 で弾かれるため）
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `【ポートフォリオ問い合わせ】${name} 様${
            company ? `（${company}）` : ""
          }`,
          from_name: `${brand.name} ポートフォリオ`,
          replyto: email,
          name,
          email,
          company: company || "(未記入)",
          message,
        }),
      });
      const data = (await res.json()) as { success: boolean; message: string };

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("送信しました。2営業日以内にご返信します。");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(
          `送信に失敗しました（${data.message || res.status}）。お手数ですがメールでご連絡ください。`,
        );
      }
    } catch {
      setStatus("error");
      setFeedback("通信に失敗しました。お手数ですがメールでご連絡ください。");
    }
  }

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
              {contact.eyebrow}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {contact.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-600">
              {contact.lead}
            </p>
            <p className="mt-6 text-sm text-stone-500">
              メールで直接:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-teal-700 underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* ハニーポット（視覚・支援技術から隠す） */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="お名前" name="name" required autoComplete="name" />
              <Field
                label="会社名 / 屋号"
                name="company"
                autoComplete="organization"
              />
            </div>
            <Field
              label="メールアドレス"
              name="email"
              type="email"
              required
              autoComplete="email"
            />

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-stone-700">
                ご相談内容 <span className="text-teal-700">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="物件・言語・実装スコープ・希望時期など"
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-7 text-base font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "送信中…" : "送信する"}
            </button>

            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className={
                  status === "success"
                    ? "text-sm font-medium text-teal-700"
                    : "text-sm font-medium text-red-600"
                }
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-stone-700">
        {label} {required && <span className="text-teal-700">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
      />
    </label>
  );
}
