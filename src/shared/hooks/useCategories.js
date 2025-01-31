import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch("https://dummyjson.com/products/category-list").then((res) =>
        res.json()
      ),
  });
};
