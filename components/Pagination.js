"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalItems }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Get the current page from search params, default to 1
  const page = parseInt(searchParams.get("page")) || 1;

  const ITEM_PER_PAGE = 10;
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleChangePage = (type) => {
    const params = new URLSearchParams(searchParams);
    if (type === "prev") {
      params.set("page", page - 1);
    } else if (type === "next") {
      params.set("page", page + 1);
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="p-2 flex justify-between">
      <button
        className="px-3 py-1 cursor-pointer disabled:cursor-not-allowed"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <span>{`Page ${page} of ${totalPages}`}</span>
      <button
        className="px-3 py-1 cursor-pointer disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
