import { Link } from "wouter";
import { useFilter } from "@/region-filters";
import { useSearch } from "@/search";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <Body>{children}</Body>
    </div>
  );
}

function Header() {
  const setRegion = useFilter((state) => state.setRegion);
  const setSearch = useSearch((state) => state.setSearch);

  const resetFilters = () => {
    setRegion("");
    setSearch("");
  };

  return (
    <div className="bg-oxford-blue flex w-full flex-col items-center text-white shadow-sm">
      <div className="flex h-20 w-full max-w-[100rem] items-center px-14">
        <h1 className="text-2xl font-semibold tracking-wide">
          <Link href="/" onClick={resetFilters}>
            Countries Explorer
          </Link>
        </h1>
      </div>
    </div>
  );
}

type BodyProps = {
  children: React.ReactNode;
};

function Body({ children }: BodyProps) {
  return <div className="my-8 w-full max-w-[100rem] px-4">{children}</div>;
}
