import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as base64 from "node-base64-image";

const BILI_API_VIDEO_INFO = "https://api.bilibili.com/x/web-interface/view";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const vid: string = body.vid;

  if (!vid) return new Response("No vid", { status: 400 });

  let res;
  if (vid.startsWith("BV")) {
    res = await fetch(`${BILI_API_VIDEO_INFO}?bvid=${vid}`, {
      cache: "force-cache",
    });
  } else {
    res = await fetch(`${BILI_API_VIDEO_INFO}?aid=${vid}`, {
      cache: "force-cache",
    });
  }

  const data = await res.json();

  // get base64 from pic
  const pic = data.data.pic;
  const base64Data = await base64.encode(pic, { string: true });
  const ext = pic.split(".").pop();
  const base64DataImg = `data:image/${ext};base64,${base64Data}`;

  return NextResponse.json({
    ...data,
    data: {
      pic,
      title: data.data.title,
      img: base64DataImg,
    },
  });
}
