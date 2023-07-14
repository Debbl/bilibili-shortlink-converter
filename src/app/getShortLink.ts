"use server";

const BILIBILI_API = "https://api.bilibili.com/x/share/click";

export async function getShortLink(url: string) {
  if (!url)
    return new Response("No url", {
      status: 400,
    });

  const params = new URLSearchParams({
    build: "6180000",
    buvid: "0",
    platform: "android",
    share_channel: "COPY",
    share_id: "public.webview.0.0.pv",
    share_mode: "3",
  });

  params.append("oid", url);
  const res = await fetch(`${BILIBILI_API}?${params.toString()}`, {
    method: "POST",
    cache: "force-cache",
  }).then((res) => res.json());
  return res;
}
