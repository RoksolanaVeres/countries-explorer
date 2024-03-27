import CountryCard from "@/components/country-card";
import useFetchCountries from "@/countries-store";
import Error from "@/error";
import Pagination from "@/pagination";
import usePage from "@/use-page";

const PER_PAGE = 24;

export default function App() {
  const { countries, loading, error } = useFetchCountries();
  const [page] = usePage();

  const renderedCountries = countries.slice(PER_PAGE * page, PER_PAGE * page + PER_PAGE);

  const prevPageNum = page === 1 ? null : page - 1;
  const nextPageNum = renderedCountries.length < PER_PAGE ? null : page + 1;
  const totalPages = Math.trunc(countries.length / PER_PAGE);
  

  if (!error.ok) {
    return <Error message={error.message} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="cards-grid px-14">
        {loading ? (
          Array.from({ length: PER_PAGE }, (_, i) => i).map((i) => <CountryCard.Skeleton key={i} />)
        ) : (
          <>
            {renderedCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </>
        )}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} prevPageNum={prevPageNum} nextPageNum={nextPageNum} />
    </div>
  );
}
