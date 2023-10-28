"use server";

import * as base64 from "node-base64-image";

const BILI_API_VIDEO_INFO = "https://api.bilibili.com/x/web-interface/view";

async function getCoverAction(vid: string) {
  if (!vid) return;

  let apiUrl;
  if (vid.startsWith("BV")) {
    apiUrl = `${BILI_API_VIDEO_INFO}?bvid=${vid}`;
  } else {
    apiUrl = `${BILI_API_VIDEO_INFO}?aid=${vid}`;
  }

  const res = await fetch(apiUrl, {
    cache: "force-cache",
  });

  const data = (await res.json()) as {
    code: number;
    data: { title: string; pic: string };
  };
  if (data.code !== 0) return;

  // get base64 from pic
  const pic = data.data.pic;

  const base64Data = (await base64.encode(pic, { string: true })).toString();
  const ext = pic.split(".").pop();
  const base64DataImg = `data:image/${ext};base64,${base64Data}`;

  return {
    data: {
      pic,
      title: data.data.title,
      img: base64DataImg,
    },
  };
}

export { getCoverAction };
