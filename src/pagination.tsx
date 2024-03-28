import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePage from "@/use-page";

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
  prevPageNum: number | null;
  nextPageNum: number | null;
};

export default function PaginationWrapper({ currentPage, totalPages, prevPageNum, nextPageNum }: PaginationWrapperProps) {
  const { setPage } = usePage();

  const onPreviousClick = () => setPage(currentPage - 1);
  const onNextClick = () => setPage(currentPage + 1);
  const onFirstPageClick = () => setPage(1);
  const onLastPageClick = () => setPage(totalPages);

  const shouldShowAllPages = totalPages <= 5;

  if (shouldShowAllPages) {
    return (
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationButton isActive={currentPage === pageNumber} onClick={() => setPage(pageNumber)}>
                {pageNumber}
              </PaginationButton>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        {prevPageNum && (
          <PaginationItem>
            <PaginationPrevious onClick={onPreviousClick} />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationButton onClick={onFirstPageClick}>1</PaginationButton>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationButton onClick={onPreviousClick}>{currentPage - 1}</PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationButton isActive>{currentPage}</PaginationButton>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationButton onClick={onNextClick}>{currentPage + 1}</PaginationButton>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationButton onClick={onLastPageClick}>{totalPages}</PaginationButton>
            </PaginationItem>
          </>
        )}

        {nextPageNum && (
          <PaginationItem>
            <PaginationNext onClick={onNextClick} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
