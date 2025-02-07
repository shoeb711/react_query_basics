import { useParams } from "react-router-dom";
import { useFetchSuperHero } from "../hooks/fetchSuperHeroe";

const RQSuperHero = () => {
  const { heroId } = useParams();

  const { data } = useFetchSuperHero(heroId);
  console.log("RQSuperHero data =>", data);

  return (
    <div>
      <h1>{data?.data?.alterEgo}</h1>
    </div>
  );
};
export default RQSuperHero;
