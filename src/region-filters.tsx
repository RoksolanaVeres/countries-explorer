import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { create } from "zustand";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

type RegionFilterStore = {
  region: string;
  setRegion: (region: string) => void;
};

export const useRegionFilter = create<RegionFilterStore>((set) => ({
  region: getParams().get("region") || "",
  setRegion: (region: string) => {
    set({ region });
    const params = getParams();
    params.set("region", region);
    if (region === "null") {
      params.delete("region");
      set({ region: "" });
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
  },
}));

export default function RegionFilters() {
  const { region, setRegion } = useRegionFilter();

  return (
    <Select value={region} onValueChange={setRegion}>
      <SelectTrigger className="max-w-48">
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {REGIONS.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
          {region && <SelectItem value="null">Clear Filter</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
