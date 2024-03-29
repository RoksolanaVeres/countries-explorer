import { Input } from "@/ui/input";
import { create } from "zustand";
import { CircleAlertIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";

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
    <div className="flex w-full max-w-md gap-2">
      <Input
        className="w-full"
        onBeforeInput={onBeforeInputChange}
        autoCorrect="false"
        placeholder="Search for a country..."
        value={search}
        onChange={onInputChange}
      />
      <TooltipProvider delayDuration={60} disableHoverableContent>
        <Tooltip>
          <TooltipTrigger className="group">
            <CircleAlertIcon className="text-oxford-blue/70 group-hover:text-oxford-blue h-5 w-5 transition-colors duration-300" />
          </TooltipTrigger>
          <TooltipContent sideOffset={5} className="select-none text-xs">
            <p>Only english letters and spaces are allowed.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
