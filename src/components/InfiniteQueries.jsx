import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/colors?_per_page=2&_page=${pageParam}`
  );
};

const InfiniteQueries = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["colors"],
      queryFn: fetchColors,
      getNextPageParam: (lastPage) => lastPage?.data?.next,
      initialPageParam: 1,
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
        {data?.pages?.map((group, index) => {
          return (
            <Fragment key={index}>
              {group?.data?.data?.map((data) => {
                return (
                  <div key={data.id}>
                    {data.id}. {data.label}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </ul>

      <div>
        <button className="btn" onClick={fetchNextPage} disabled={!hasNextPage}>
          Load More
        </button>
      </div>
    </div>
  );
};
export default InfiniteQueries;
