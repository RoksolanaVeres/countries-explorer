import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PER_PAGE = 24;
export const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
export const URL = `https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital,subregion,currencies,borders,languages,cca3,tld`;
export const STORAGE_VERSION = "1";
export const STORAGE_KEY_BASE = `countries`;

export const getCountriesStorageKey = () => {
  const STORAGE_KEY = `${STORAGE_KEY_BASE}-${STORAGE_VERSION}`;
  const PREV_STORAGE_KEY = `${STORAGE_KEY_BASE}-${parseInt(STORAGE_VERSION) - 1}`;

  if (JSON.parse(localStorage.getItem(PREV_STORAGE_KEY) || "")) {
    localStorage.removeItem(PREV_STORAGE_KEY);
  }

  return STORAGE_KEY;
};
