import { Link } from "react-router-dom";
import { useFetchHeroData } from "../hooks/useFetchHeroData";

const RQSuperHeroes = () => {
  const { data, isLoading, isError, error } = useFetchHeroData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data?.data?.map((item) => {
        return (
          <div key={item.id}>
            <Link to={`/rq-super-heroes/${item.id}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
export default RQSuperHeroes;
