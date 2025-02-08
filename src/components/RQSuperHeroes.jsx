import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useFetchHeroesData,
} from "../hooks/useFetchHeroData";
import { useState } from "react";

const RQSuperHeroes = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } =
    useFetchHeroesData();

  const { mutate, isPending } = useAddSuperHeroData();

  const handleAddHero = () => {
    const hero = { name, alterEgo };

    mutate(hero);

    setAlterEgo("");
    setName("");
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-5">
      <div className="flex my-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          placeholder="Name"
        />
        <input
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
          className="input"
          type="text"
          placeholder="ALter Ego"
        />
        <button className="btn" onClick={handleAddHero} disabled={isPending}>
          {isPending ? "Adding Hero" : "Add Hero"}
        </button>
      </div>

      <button className="btn my-3" onClick={refetch}>
        Fetch
      </button>

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
