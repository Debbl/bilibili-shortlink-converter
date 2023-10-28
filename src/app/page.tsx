"use client";
import { Icon } from "@iconify/react";
import { checkMarkIcon, closeIcon, copyLinkIcon } from "~/assets/icons";
import { useGetShortUrlStore } from "~/store";

export default function Home() {
  const [{ url, shortUrl, isCopy }, { setUrl, setIsCopy, getShortUrl }] =
    useGetShortUrlStore((s) => [
      { url: s.url, shortUrl: s.shortUrl, isCopy: s.isCopy },
      {
        setUrl: s.setUrl,
        setIsCopy: s.setIsCopy,
        getShortUrl: s.getShortUrl,
      },
    ]);

  const handleCopyClick = () => {
    shortUrl && setIsCopy(true);

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        const id = setTimeout(() => {
          setIsCopy(false);
          clearTimeout(id);
        }, 1000);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
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
          <button
            onClick={() => {
              void getShortUrl();
            }}
            disabled={!url}
            className="btn"
          >
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
