import { Pagination } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

type PaginationProps = {
  total_pages: string;
  count?: number;
};

const SearchPagination = ({ total_pages, count }: PaginationProps) => {
  const { query, type, offset } = useParams();
  const navigate = useNavigate();

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
      page={Number(offset)}
      count={total_pages ? Number(total_pages) : count}
      onChange={(e: React.ChangeEvent<unknown>) => {
        navigate(`/search/${query}/${type}/${parseInt((e.target as HTMLElement).innerHTML)}`);
      }}
      shape="rounded"
    />
  );
};

export default SearchPagination;
