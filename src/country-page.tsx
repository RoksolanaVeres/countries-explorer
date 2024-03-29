import { useFetchCountries } from "@/countries-store";
import Error from "@/error";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

type CountryPageProps = {
  params: {
    country: string;
  };
};

export default function CountryPage({ params }: CountryPageProps) {
  const { countries, loading, error } = useFetchCountries();
  const country = countries.find((c) => c.name.common.toLowerCase() === params.country.toLowerCase());

  if (!error.ok) {
    return <Error message={error.message} />;
  }

  if (loading) {
    return (
      <div>
        <GoBackButton />
        <div className="my-8 flex flex-col items-center gap-11 lg:flex-row lg:items-start lg:justify-start lg:gap-16">
          <Skeleton className="h-[45vh] w-full max-w-[650px]" />
          <div className="flex w-full max-w-[650px] flex-col gap-8 lg:self-start">
            <Skeleton className="h-6 w-48" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full max-w-96" />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full max-w-96" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div>
        <GoBackButton />
        <div className="my-8">
          <p className="flex justify-center text-2xl">Country not found.</p>
        </div>
      </div>
    );
  }

  const imgSrc = country.flags.svg || country.flags.png;
  const imgAlt = country.flags.alt;
  const countryName = country.name?.common || "N/A";
  const nativeName = country.name.nativeName[Object.keys(country.name.nativeName)[0]]?.common || "N/A";
  const population = country.population.toLocaleString() || "N/A";

  const tlds = country.tld?.join(", ") || "N/A";
  const currencies =
    (country.currencies &&
      Object.entries(country.currencies)
        .map(([, { name, symbol }]) => `${name} (${symbol})`)
        .join(", ")) ||
    "N/A";

  const languages = (country.languages && Object.values(country.languages).join(", ")) || "N/A";

  const primaryInfo = [
    { key: "Native Name", value: nativeName },
    { key: "Population", value: population },
    { key: "Region", value: country.region || "N/A" },
    { key: "Subregion", value: country.subregion || "N/A" },
    { key: "Capital", value: country.capital || "N/A" },
  ];

  const secondaryinfo = [
    { key: "Top Level Domain", value: tlds },
    { key: "Currencies", value: currencies },
    { key: "Languages", value: languages },
  ];

  const hasBorders = country.borders && country.borders.length > 0;

  return (
    <div className="flex flex-col gap-14 sm:px-3 lg:px-14">
      <GoBackButton />
      <div className="flex flex-col items-center gap-11 lg:flex-row lg:items-start lg:justify-start lg:gap-16">
        <img src={imgSrc} alt={imgAlt} className="h-full max-h-[45vh] w-full max-w-[650px] object-cover" />
        <div className="flex w-full max-w-[650px] flex-col gap-4 lg:self-start">
          <h2 className="text-2xl font-bold">{countryName}</h2>
          <ul className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:flex-wrap lg:pt-8">
            {/* ================== */}
            <li>
              <ul className="flex flex-col gap-1">
                {primaryInfo.map(({ key, value }) => (
                  <li key={key} className="flex gap-2">
                    <span className="font-semibold">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </li>
            {/* ================== */}
            <li>
              <ul className="flex flex-col gap-1">
                {secondaryinfo.map(({ key, value }) => (
                  <li key={key} className="flex gap-2">
                    <span className="font-semibold">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </li>
            {/* =================== */}
            {hasBorders && (
              <li className="flex flex-col gap-4">
                <span className="font-semibold">Border Countries:</span>
                <ul className="flex flex-wrap gap-2">
                  {country.borders.map((border) => {
                    const borderCountry = countries.find((c) => c.cca3 === border)!;

                    return (
                      <li key={border}>
                        <Button variant="secondary" asChild>
                          <Link href={`/${borderCountry.name.common.toLowerCase()}`}>{borderCountry.name.common}</Link>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}
            {/* ================== */}
          </ul>
        </div>
      </div>
    </div>
  );
}

function GoBackButton() {
  return (
    <Button className="flex w-fit gap-2" onClick={() => window.history.back()}>
      <ArrowLeft size={16} />
      Back
    </Button>
  );
}
