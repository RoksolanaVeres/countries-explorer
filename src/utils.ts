import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PER_PAGE = 24;

export const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
