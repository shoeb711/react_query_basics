import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useCallback, useRef } from "react";

const fetchColors = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/colors?_per_page=20&_page=${pageParam}`
  );
};

const InfiniteScrollQueries = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (lastPage) => lastPage?.data?.next,
    initialPageParam: 1,
  });

  const observerElem = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();
      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerElem.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

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
              {group?.data?.data?.map((data, i) => {
                if (group.data.data.length === i + 1) {
                  return (
                    <div ref={lastElementRef} key={data.id}>
                      {data.id}. {data.label}
                    </div>
                  );
                } else {
                  return (
                    <div key={data.id}>
                      {data.id}. {data.label}
                    </div>
                  );
                }
              })}
            </Fragment>
          );
        })}
      </ul>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default InfiniteScrollQueries;
