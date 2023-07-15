/* eslint-disable @next/next/no-img-element */
"use client";
import { Icon } from "@iconify/react";
import { closeIcon } from "~/assets/icons";
import { useGetCoverStore } from "~/store";

const GetCover = () => {
  const [{ vid, videoUrl, videoInfo }, { setVideoUrl, getCover }] =
    useGetCoverStore((s) => [
      {
        vid: s.computed.vid,
        videoUrl: s.videoUrl,
        videoInfo: s.videoInfo,
      },
      {
        setVideoUrl: s.setVideoUrl,
        setVideoInfo: s.setVideoInfo,
        getCover: s.getCover,
      },
    ]);

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
            onClick={() => getCover()}
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
