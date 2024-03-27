import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Country = {
  capital: string[];
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
};

const URL = `https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital`;

export type Error = {
  message: string;
  ok: boolean;
};

type UseFetchCountriesState = {
  countries: Country[];
  loading: boolean;
  error: Error;
};

type UseFetchCountriesActions = {
  setCountries: (countries: Country[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error) => void;
};

const useFetchCountries = create<UseFetchCountriesState & UseFetchCountriesActions>()(
  persist(
    immer((set) => ({
      countries: [],
      loading: true,
      error: {
        message: "",
        ok: true,
      },
      setCountries: (countries) => {
        set((state) => {
          state.countries = countries;
        });
      },
      setLoading: (loading) => {
        set((state) => {
          state.loading = loading;
        });
      },
      setError: (error) => {
        set((state) => {
          state.error = error;
        });
      },
    })),
    {
      name: "countries",
      partialize: (state) => ({ countries: state.countries }),
    },
  ),
);

if (!useFetchCountries.getState().countries.length) {
  useFetchCountries.getState().setLoading(true);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      useFetchCountries.getState().setCountries(data);
    })
    .catch((error) => {
      useFetchCountries.getState().setError({ message: error.message, ok: false });
    })
    .finally(() => {
      useFetchCountries.getState().setLoading(false);
    });
} else {
  useFetchCountries.getState().setLoading(false);
}

export default useFetchCountries;
