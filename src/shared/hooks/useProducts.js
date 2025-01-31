import { useQuery } from "@tanstack/react-query";

export const useProducts = (search, category) => {
  return useQuery({
    queryKey: ["productData", search, category],
    queryFn: () =>
      fetch(
        `https://dummyjson.com/products${search ? `/search?q=${search}` : ""}${
          category ? `/category/${category}` : ""
        }`
      ).then((res) => res.json()),
  });
};
