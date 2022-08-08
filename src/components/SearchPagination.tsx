import { Pagination } from "@mui/material";
import React from "react";

interface PaginationProps {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  data?: {
    data: {
      total_pages: number;
    };
  };
  count?: number;
}

export const SearchPagination = ({
  setOffset,
  data,
  count,
}: PaginationProps) => {
  return (
    <Pagination
      className="pagination"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1em",
      }}
      hidePrevButton
      hideNextButton
      count={data ? data!.data.total_pages : count}
      onChange={(e: any) => {
        setOffset(parseInt(e.target.textContent));
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
      }}
      shape="rounded"
    />
  );
};
