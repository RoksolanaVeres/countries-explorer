import { Input } from "@/ui/input";
import { create } from "zustand";

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

type SearchStore = {
  search: string;
  setSearch: (search: string) => void;
};

export const useSearch = create<SearchStore>((set) => ({
  search: getParams().get("search") || "",
  setSearch: (search: string) => {
    set({ search });
    const params = getParams();
    params.set("search", search);
    if (search === "") {
      params.delete("search");
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
  },
}));

export default function Search() {
  const { search, setSearch } = useSearch();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onBeforeInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (e.data.match(/[^a-zA-Z\s]/)) {
      e.preventDefault();
    }
  };

  return (
    <Input
      className="max-w-md"
      onBeforeInput={onBeforeInputChange}
      autoCorrect="false"
      placeholder="Search for a country..."
      value={search}
      onChange={onInputChange}
    />
  );
}
