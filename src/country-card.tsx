import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { type Country } from "@/countries-store";

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
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
              {Array.from({ length: 3 }, (_, i) => i).map((i) => (
                <Skeleton
                  key={i}
                  className="h-3 w-1/2 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <h3 className="w-fit cursor-default text-xl font-bold hover:underline">{country.name.common}</h3>
            <ul className="flex flex-col gap-0.5">
              <li>
                <span className="font-semibold">Capital: </span>
                {country.capital[0] || "N/A"}
              </li>
              <li>
                <span className="font-semibold">Region: </span>
                {country.region || "N/A"}
              </li>
              <li>
                <span className="font-semibold">Population: </span>
                {country.population.toLocaleString() || "N/A"}
              </li>
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function CardSkeleton() {
  return (
    <div className="w-full max-w-[21rem] rounded-lg border border-oxford-oxford-blue/20 bg-white text-black shadow-sm">
      <div className="h-40 rounded-t-lg border-b  border-oxford-oxford-blue/15 drop-shadow-sm">
        <Skeleton className="h-full w-full transform rounded-b-none rounded-t-lg bg-oxford-hookers-green/25 object-cover transition-transform duration-1000" />
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-4 w-3/4 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, i) => i).map((i) => (
              <Skeleton
                key={i}
                className="h-3 w-1/2 transform rounded-full bg-oxford-hookers-green/25 transition-transform duration-1000"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

CountryCard.Skeleton = CardSkeleton;
