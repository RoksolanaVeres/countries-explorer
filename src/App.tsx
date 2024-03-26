import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import useIntersection from "./use-intersection";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "./components/ui/skeleton";

type Country = {
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

const url = `https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital`;

type UseFetchCountriesState = {
  countries: Country[];
  loading: boolean;
  error: { message: string; ok: boolean };
};

type UseFetchCountriesActions = {
  setCountries: (countries: Country[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: { message: string; ok: boolean }) => void;
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
  fetch(url)
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

const PER_SLICE = 30;

export default function App() {
  const { countries } = useFetchCountries();
  const { ref, isIntersecting } = useIntersection();
  const [slices, setSlices] = useState(1);

  useEffect(() => {
    if (isIntersecting) {
      setSlices((slices) => slices + 1);
    }
  }, [isIntersecting]);

  const renderedCountries = countries.slice(0, PER_SLICE * slices);

  return (
    <Layout>
      <div className="cards-grid px-14">
        {renderedCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
      <div ref={ref} className="flex h-10 w-full items-center justify-center"></div>
    </Layout>
  );
}

// TODO: separate skeleton and use it for when loading the flag images & the data
function CountryCard({ country }: { country: Country }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <Card key={country.name.common} className="w-full max-w-[21rem]">
      <CardHeader className="p-0">
        <div className="h-40 overflow-hidden rounded-t-lg border-b border-oxford-oxford-blue/15 drop-shadow-sm">
          {!imgLoaded && (
            <Skeleton className="h-full w-full transform rounded-b-none rounded-t-lg bg-oxford-hookers-green/25 object-cover transition-transform duration-1000" />
          )}
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="h-full w-full transform rounded-t-lg object-cover transition-transform duration-300 ease-out hover:scale-110"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 py-6">
        {!imgLoaded ? (
          <div className="flex flex-col gap-5">
            <Skeleton className="h-4 w-3/4 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-1/2 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000" />
              <Skeleton className="h-3 w-1/2 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000" />
              <Skeleton className="h-3 w-1/2 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000" />
            </div>
          </div>
        ) : (
          <>
            <h3 className="w-fit cursor-default text-xl font-bold hover:underline">{country.name.common}</h3>
            <ul className="flex flex-col gap-0.5">
              <li>
                <span className="font-semibold">Capital: </span>
                {country.capital[0]}
              </li>
              <li>
                <span className="font-semibold">Region: </span>
                {country.region}
              </li>
              <li>
                <span className="font-semibold">Population: </span>
                {country.population.toLocaleString()}
              </li>
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center bg-oxford-oxford-blue text-olive-cornsilk">
        <div className="flex h-20 w-full max-w-[100rem] items-center px-14">
          <h1 className="text-2xl font-semibold tracking-wide">World Countries</h1>
        </div>
      </div>
      <div className="my-4 w-full max-w-[100rem] px-4">{children}</div>
    </div>
  );
}
