import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { create } from "zustand";
import { REGIONS } from "@/utils";

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

type RegionFilterStore = {
  region: string;
  setRegion: (region: string) => void;
};

export const useFilter = create<RegionFilterStore>((set) => ({
  region: getParams().get("region") || "",
  setRegion: (region: string) => {
    set({ region });
    const params = getParams();
    params.set("region", region);
    params.set("page", "1");
    if (region === "null") {
      params.delete("region");
      set({ region: "" });
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
  },
}));

export default function RegionFilters() {
  const { region, setRegion } = useFilter();

  return (
    <Select value={region} onValueChange={setRegion}>
      <SelectTrigger className="max-w-48 select-none">
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {region && <SelectItem value="null">Clear Filter</SelectItem>}
          {REGIONS.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
