// Contact フォーム送信エンドポイント。
// フォーム → ここ（自前ルート）→ Web3Forms 経由でメール到達。
// 必要な環境変数: WEB3FORMS_ACCESS_KEY（Vercel の Environment Variables に設定）

import { brand } from "../../lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  botcheck?: string; // ハニーポット（人間は空）
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json(
      { success: false, message: "リクエスト形式が不正です。" },
      { status: 400 },
    );
  }

  // ハニーポット: 値が入っていればボットとみなし、成功を装って捨てる
  if (body.botcheck) {
    return Response.json({ success: true, message: "送信しました。" });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return Response.json(
      { success: false, message: "お名前・メール・本文は必須です。" },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { success: false, message: "メールアドレスの形式が正しくありません。" },
      { status: 422 },
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // env 未設定。デプロイ後に Vercel で WEB3FORMS_ACCESS_KEY を設定すること。
    return Response.json(
      {
        success: false,
        message:
          "送信先が未設定です。時間をおいて再度お試しいただくか、メールで直接ご連絡ください。",
      },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `【ポートフォリオ問い合わせ】${name} 様${company ? `（${company}）` : ""}`,
        from_name: `${brand.name} ポートフォリオ`,
        replyto: email,
        name,
        email,
        company: company || "(未記入)",
        message,
      }),
    });

    const raw = await res.text();
    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(raw);
    } catch {
      // Web3Forms が JSON 以外（HTMLエラー等）を返したケース
    }

    if (!res.ok || !data.success) {
      // Vercel の Runtime Logs に上流の実エラーを残す（診断用）
      console.error(
        "[contact] web3forms rejected:",
        "status=",
        res.status,
        "message=",
        data.message ?? raw.slice(0, 300),
      );
      return Response.json(
        {
          success: false,
          message: "送信に失敗しました。お手数ですがメールでご連絡ください。",
          detail: data.message ?? `upstream ${res.status}`,
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true, message: "送信しました。" });
  } catch (err) {
    console.error("[contact] fetch threw:", err);
    return Response.json(
      {
        success: false,
        message: "送信に失敗しました。お手数ですがメールでご連絡ください。",
        detail: err instanceof Error ? err.message : "unknown error",
      },
      { status: 502 },
    );
  }
}
