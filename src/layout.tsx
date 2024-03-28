import { useRegionFilter } from "@/region-filters";
import usePage from "@/use-page";
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
  const setPage = usePage((state) => state.setPage);
  const setFilter = useRegionFilter((state) => state.setRegion);
  const setSearch = useSearch((state) => state.setSearch);

  const navigateToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPage(1);
    setFilter("null");
    setSearch("");
  };

  return (
    <div className="flex w-full flex-col items-center bg-oxford-oxford-blue text-white shadow-sm">
      <div className="flex h-20 w-full max-w-[100rem] items-center px-14">
        <h1 className="text-2xl font-semibold tracking-wide">
          <a href="/" onClick={navigateToHome}>
            Countries Explorer
          </a>
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
