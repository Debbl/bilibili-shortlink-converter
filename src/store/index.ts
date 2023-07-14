import { create } from "zustand";
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

const useGetShortUrlStore = create<GetShortUrlStore>()((set, get) => ({
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
}));

export { useGetShortUrlStore };
