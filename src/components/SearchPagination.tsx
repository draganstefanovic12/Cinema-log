import { Pagination } from "@mui/material";
import { PaginationProps } from "../types/types";

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
