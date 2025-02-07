import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallel = ({ heroIds }) => {
  const results = useQueries({
    queries: heroIds?.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    }),
  });
  // const results = useQueries(
  //   heroIds?.map((id) => {
  //     return {
  //       queryKey: ["super-hero", id],
  //       queryFn: () => fetchSuperHero(id),
  //     };
  //   })
  // );

  console.log("results =>", {results});

  return <div>DynamicParallel</div>;
};
export default DynamicParallel;
