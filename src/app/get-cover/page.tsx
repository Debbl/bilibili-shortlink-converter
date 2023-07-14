/* eslint-disable @next/next/no-img-element */
"use client";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { getCoverAction } from "~/actions/getCoverAction";
import { closeIcon } from "~/assets/icons";

const GetCover = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.bilibili.com/video/BV16X4y1H7LR/?vd_source=846e45e6e150f0469fe98e948cf11679"
  );
  const [videoInfo, setVideoInfo] = useState({
    pic: "",
    title: "",
    img: "",
  });

  // get BV* from vid by re
  const vid = useMemo(() => /\/(BV\w+)\\?/.exec(videoUrl)?.[1], [videoUrl]);

  const handleClick = () => {
    vid &&
      getCoverAction(vid).then((d) => {
        if (!d) {
          // eslint-disable-next-line no-alert
          alert("解析错误！");
          setVideoInfo({ pic: "", title: "", img: "" });
        } else setVideoInfo({ ...d.data });
      });
  };

  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-y-3">
        <h1 className="p-6 text-center text-2xl">获取B站视频封面</h1>

        <div className="flex gap-x-2">
          <div className="relative">
            <input
              className="h-12 w-[48rem] resize-none rounded-md border-2 border-black p-2 align-middle outline-none"
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            {videoUrl && (
              <Icon
                onClick={() => setVideoUrl("")}
                className="absolute bottom-1/2 right-4 translate-y-1/2 cursor-pointer"
                icon={closeIcon}
              />
            )}
          </div>
          <button
            onClick={() => handleClick()}
            disabled={!videoUrl}
            className="btn"
          >
            获取封面
          </button>
        </div>

        <div className="ml-[.7rem]">
          <a href={`https://b23.tv/${vid}`} className="text-blue-400">
            {vid}
          </a>
        </div>

        <div className="relative mt-8 w-[32rem] self-center overflow-hidden">
          {videoInfo.img && (
            <div className="flex flex-col gap-y-3">
              <div>{videoInfo.title}</div>
              <img src={videoInfo.img} alt="" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GetCover;
