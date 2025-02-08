import { useParams } from "react-router-dom";
import { useFetchSuperHero } from "../hooks/fetchSuperHeroe";

const RQSuperHero = () => {
  const { heroId } = useParams();

  const { data } = useFetchSuperHero(heroId);

  return (
    <div>
      <h1>
        {data?.data?.name} - {data?.data?.alterEgo}
      </h1>
    </div>
  );
};
export default RQSuperHero;
