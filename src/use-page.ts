import { useState } from "react";

const getPage = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return Number(params.get("page")) || 1;
};

const usePage = () => {
  const [page, set] = useState(getPage());

  const setPage = (page: React.SetStateAction<number>) => {
    const search = new URLSearchParams(window.location.search);
    search.set("page", String(page));
    window.location.search = search.toString();

    set(page);
  };

  return [page, setPage] as const;
};

export default usePage;