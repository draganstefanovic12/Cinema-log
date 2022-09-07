import { Pagination } from "@mui/material";

type PaginationProps = {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  data?: {
    data: {
      total_pages: number;
    };
  };
  count?: number;
};

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
      onChange={(e: React.ChangeEvent<unknown>) => {
        setOffset(parseInt((e.target as HTMLElement).innerText));
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
      }}
      shape="rounded"
    />
  );
};
