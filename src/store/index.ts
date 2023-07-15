import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getCoverAction } from "~/actions/getCoverAction";
import { getShortLinkAction } from "~/actions/getShortLinkAction";

interface GetShortUrlStore {
  url: string;
  shortUrl: string;
  isCopy: boolean;
  getShortUrl: () => Promise<void>;
  setIsCopy: (isCopy: boolean) => void;
  setUrl: (url: string) => void;
  setShortUrl: (shortUrl: string) => void;
}

interface GetCoverStore {
  videoUrl: string;
  videoInfo: {
    pic: string;
    title: string;
    img: string;
  };
  setVideoUrl: (videoUrl: string) => void;
  setVideoInfo: (videoInfo: {
    pic: string;
    title: string;
    img: string;
  }) => void;
  getCover: () => void;
  computed: {
    vid: string | undefined;
  };
}

const useGetShortUrlStore = create<GetShortUrlStore>()(
  devtools(
    persist(
      (set, get) => ({
        url: "https://space.bilibili.com/174865648?spm_id_from=333.1007.0.0",
        shortUrl: "",
        isCopy: false,
        setIsCopy: (isCopy: boolean) => set({ isCopy }),
        setUrl: (url: string) => set({ url }),
        setShortUrl: (shortUrl: string) => set({ shortUrl }),
        getShortUrl: async () => {
          if (!get().url) return;

          const res = await getShortLinkAction(get().url);
          const shortUrlRes = res?.data.content;

          if (!shortUrlRes) {
            // eslint-disable-next-line no-alert
            alert("url为空或解析错误");
            return;
          }

          set({ shortUrl: shortUrlRes });
        },
      }),
      {
        name: "bili-get-short-url-store",
      }
    )
  )
);

const useGetCoverStore = create<GetCoverStore>()(
  devtools(
    persist(
      (set, get) => ({
        videoUrl:
          "https://www.bilibili.com/video/BV16X4y1H7LR/?vd_source=846e45e6e150f0469fe98e948cf11679",
        videoInfo: {
          pic: "",
          title: "",
          img: "",
        },
        computed: {
          get vid() {
            return /\/(BV\w+)\\?/.exec(get()?.videoUrl)?.[1];
          },
        },
        setVideoUrl: (videoUrl: string) => set({ videoUrl }),
        setVideoInfo: (videoInfo: {
          pic: string;
          title: string;
          img: string;
        }) => set({ videoInfo }),
        getCover: () => {
          const vid = get().computed.vid;
          vid &&
            getCoverAction(vid).then((d) => {
              if (!d) {
                // eslint-disable-next-line no-alert
                alert("解析错误！");
                set({ videoInfo: { pic: "", title: "", img: "" } });
              } else set({ videoInfo: { ...d.data } });
            });
        },
      }),
      {
        name: "bili-get-cover-store",
      }
    )
  )
);

export { useGetShortUrlStore, useGetCoverStore };
