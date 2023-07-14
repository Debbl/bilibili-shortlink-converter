"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { getShortLinkAction } from "~/actions/getShortLinkAction";
import { checkMarkIcon, closeIcon, copyLinkIcon } from "~/assets/icons";

export default function Home() {
  const [url, setUrl] = useState(
    "https://space.bilibili.com/174865648?spm_id_from=333.1007.0.0"
  );
  const [shortUrl, setShortUrl] = useState("");
  const [isCopy, setIsCopy] = useState(false);

  const handleClick = async () => {
    const res = await getShortLinkAction(url);

    const shortUrlRes = res?.data.content;

    if (!shortUrlRes) {
      // eslint-disable-next-line no-alert
      alert("url为空或解析错误");
      return;
    }

    setShortUrl(shortUrlRes);
  };

  const handleCopyClick = () => {
    shortUrl && setIsCopy(true);

    navigator.clipboard.writeText(shortUrl).then(() => {
      const id = setTimeout(() => {
        setIsCopy(false);
        clearTimeout(id);
      }, 1000);
    });
  };

  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-y-3">
        <h1 className="p-6 text-center text-2xl">获取B站短链接</h1>

        <div className="flex gap-x-2">
          <div className="relative">
            <input
              className="h-12 w-[48rem] resize-none rounded-md border-2 border-black p-2 align-middle outline-none"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            {url && (
              <Icon
                onClick={() => setUrl("")}
                className="absolute bottom-1/2 right-4 translate-y-1/2 cursor-pointer"
                icon={closeIcon}
              />
            )}
          </div>
          <button onClick={() => handleClick()} disabled={!url} className="btn">
            获取短链接
          </button>
        </div>

        <div className="mr-32 mt-8 self-end">
          {shortUrl && (
            <div className="flex items-center">
              <a
                href={shortUrl}
                target="_blank"
                className="px-3 text-blue-800"
                rel="noreferrer"
              >
                {shortUrl}
              </a>
              <button onClick={() => handleCopyClick()}>
                <Icon
                  className="h-6 w-6"
                  icon={isCopy ? checkMarkIcon : copyLinkIcon}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
