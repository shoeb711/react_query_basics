import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export function useFetchHeroesData() {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    refetchOnMount: false,
  });
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["super-heroes"],
    mutationFn: addSuperHero,
    // onSuccess: (data) => {
    //   // return queryClient.invalidateQueries(["super-heroes"]);// this will update data with api call

    //   // updating data without api call
    //   queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries({
        queryKey: ["super-heroes"],
      });

      const previousSuperHeroData = queryClient.getQueryData(["super-heroes"]);

      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        console.log("oldQueryData ", oldQueryData);

        return {
          ...oldQueryData,
          data: [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...oldQueryData?.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });

      return {
        previousSuperHeroData,
      };
    },

    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["super-heroes"], context.previousSuperHeroData);
    },
    onSettled: () => {
      return queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
