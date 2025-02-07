import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export function useFetchHeroData() {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });
}
