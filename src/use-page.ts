import { create } from "zustand";

const getParams = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params;
};

type PageStore = {
  page: number;
  setPage: (page: number) => void;
};

const usePage = create<PageStore>((set) => ({
  page: getParams().get("page") ? Number(getParams().get("page")) : 1,
  setPage: (page: number) => {
    const search = new URLSearchParams(window.location.search);
    search.set("page", String(page));
    window.history.pushState({}, "", `${window.location.pathname}?${search.toString()}`);
    set({ page });
    window.scrollTo({ top: 0, behavior: "instant" });
  },
}));

export default usePage;
