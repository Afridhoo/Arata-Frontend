import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EmptySimpleUse } from "./EmptySimpleUse";
import { LucideInfo } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaginationSimpel({
  pagination,
  setPagination,
  route,
  lengthData,
}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(pagination);

  function handleResetFilter() {
    navigate(`/${route}`);
  }

  function handlePagination(value) {
    if (value === "plus" && lengthData) {
      setPagination(pagination + 1);

      if (pagination === count) setCount(count + 1);
    } else if (value === "min") setPagination(pagination - 1);
    else setPagination(value);
  }

  return (
    <div>
      {!lengthData && count === 1 && (
        <EmptySimpleUse
          icon={<LucideInfo />}
          mt={5}
          title={"Data Lokasi Tidak Ditemukan"}
          btnText={"Kembali"}
          onClick={handleResetFilter}
        />
      )}

      <Pagination className={"mt-10"}>
        <PaginationContent>
          {pagination > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className={"cursor-pointer"}
                onClick={() => handlePagination("min")}
              />
            </PaginationItem>
          )}
          {Array.from({ length: count })?.map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePagination(i + 1)}
                isActive={pagination === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {lengthData >= 10 ? (
            <PaginationItem>
              <PaginationNext
                className={"cursor-pointer"}
                onClick={() => handlePagination("plus")}
              />
            </PaginationItem>
          ) : (
            ""
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
