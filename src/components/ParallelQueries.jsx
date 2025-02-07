import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueries = () => {
  useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return <div>Parallel Queres</div>;
};

export default ParallelQueries;
