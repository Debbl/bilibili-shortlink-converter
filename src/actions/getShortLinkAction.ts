"use server";

interface ShortUrlResponse {
  code: number;
  message: string;
  ttl: number;
  data: { content?: string; count: number };
}

const BILIBILI_API = "https://api.bilibili.com/x/share/click";

async function getShortLinkAction(url: string) {
  if (!url) return;

  const params = new URLSearchParams({
    build: "6180000",
    buvid: "0",
    platform: "android",
    share_channel: "COPY",
    share_id: "public.webview.0.0.pv",
    share_mode: "3",
  });

  params.append("oid", url);

  const res = (await fetch(`${BILIBILI_API}?${params.toString()}`, {
    method: "POST",
    cache: "force-cache",
  }).then((res) => res.json())) as ShortUrlResponse;

  return res;
}

export { getShortLinkAction };
