"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const usePagination = (items, itemsPerPage = 10) => {
  const searchParams = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get("page"), 10) || 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPage,
    paginatedItems,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
  };
};

export default usePagination;
