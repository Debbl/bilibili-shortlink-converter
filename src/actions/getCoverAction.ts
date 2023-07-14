"use server";

import * as base64 from "node-base64-image";

const BILI_API_VIDEO_INFO = "https://api.bilibili.com/x/web-interface/view";

async function getCoverAction(vid: string) {
  if (!vid) return;

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
  const pic = data.data.pic as string;

  const base64Data = await base64.encode(pic, { string: true });
  const ext = pic.split(".").pop();
  const base64DataImg = `data:image/${ext};base64,${base64Data}` as string;

  return {
    data: {
      pic,
      title: data.data.title as string,
      img: base64DataImg,
    },
  };
}

export { getCoverAction };
