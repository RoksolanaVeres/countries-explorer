import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";

import { useFilter } from "./region-filters";

type PaginationWrapperProps = {
  currentPage: number;
  totalPages: number;
  prevPageNum: number | null;
  nextPageNum: number | null;
};

export default function PaginationWrapper({ currentPage, totalPages, prevPageNum, nextPageNum }: PaginationWrapperProps) {
  const shouldShowAllPages = totalPages <= 5;
  const { region } = useFilter();

  if (shouldShowAllPages) {
    return (
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                href={region ? `?region=${region}&page=${pageNumber}` : `?page=${pageNumber}`}
              >
                {pageNumber}
              </PaginationLink>
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
            <PaginationPrevious href={`?page=${prevPageNum}`} />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=1`}>1</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={`?page=${prevPageNum}`}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={`?page=${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={`?page=${nextPageNum}`}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {nextPageNum && (
          <PaginationItem>
            <PaginationNext href={`?page=${nextPageNum}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
