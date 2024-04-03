import { useFetchCountries } from "@/countries-store";
import CountryCard from "@/country-card";
import Error from "@/error";
import Pagination from "@/pagination";
import RegionFilters, { useFilter } from "@/region-filters";
import Search, { useSearch } from "@/search";
import { PER_PAGE } from "@/utils";
import { useEffect, useRef } from "react";
import { useSearch as useWouterSearch } from "wouter";

const usePage = () => {
  const page = parseInt(
    useWouterSearch()
      .split("&")
      .find((param) => param.startsWith("page="))
      ?.split("=")[1] || "1",
  );

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());

    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  return { page, setPage };
};

export default function CountriesPage() {
  const { countries, loading, error } = useFetchCountries();
  const { page } = usePage();
  const { search } = useSearch();
  const { region } = useFilter();
  const prevPage = useRef(page);

  const totalFilteredCountries = countries
    .filter(
      (country) =>
        country.name.common.toLowerCase().startsWith(search.toLowerCase()) ||
        country.name.official.toLowerCase().startsWith(search.toLowerCase()) ||
        country.name.common.toLowerCase().includes(search.toLowerCase()) ||
        country.name.official.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((country) => region === "" || country.region.toLowerCase() === region.toLowerCase());

  const renderedCountries = totalFilteredCountries.slice(PER_PAGE * (page - 1), PER_PAGE * page);

  const prevPageNum = page === 1 ? null : page - 1;
  const nextPageNum = renderedCountries.length < PER_PAGE ? null : page + 1;
  const totalPages = Math.ceil(totalFilteredCountries.length / PER_PAGE);

  const shouldShowPagination = totalPages > 1;

  useEffect(() => {
    // Scroll to top should happen only when paginating
    if (prevPage.current === page) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    prevPage.current = page;
  }, [page]);

  if (!error.ok) {
    return <Error message={error.message} />;
  }

  return (
    <div className="flex flex-col gap-6 px-0 sm:px-3 lg:px-14">
      <div className="flex flex-wrap justify-between gap-4">
        <Search />
        <RegionFilters />
      </div>
      <div className="cards-grid">
        {loading ? (
          Array.from({ length: PER_PAGE }, (_, i) => i).map((i) => <CountryCard.Skeleton key={i} />)
        ) : (
          <>
            {renderedCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </>
        )}
        {renderedCountries.length === 0 && (
          <p className="mt-14 text-base sm:text-lg md:text-xl xl:text-2xl">No countries found</p>
        )}
      </div>
      {shouldShowPagination && (
        <Pagination currentPage={page} totalPages={totalPages} prevPageNum={prevPageNum} nextPageNum={nextPageNum} />
      )}
    </div>
  );
}
