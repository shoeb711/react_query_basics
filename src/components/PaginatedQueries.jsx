import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (pageNumber) => {
  return axios.get(
    `http://localhost:4000/colors?_per_page=2&_page=${pageNumber}`
  );
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, error, isLoading ,isFetching} = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    placeholderData: (prev) => prev,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data?.data?.data?.map((data) => {
          return (
            <div key={data.id}>
              {data.id}. {data.label}
            </div>
          );
        })}
      </ul>

      <div>
        <button
          onClick={() => setPageNumber((prevPage) => prevPage - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((prevPage) => prevPage + 1)}
          disabled={pageNumber === 5}
        >
          Next Page
        </button>
      </div>
      <div>
        {isFetching && "Loading"}
      </div>
    </div>
  );
};
export default PaginatedQueries;
