import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SuperHeroes from "./components/SuperHeroes";
import RQSuperHeroes from "./components/RQSuperHeroes";
import HomePage from "./components/HomePage";
import RQSuperHero from "./components/RQSuperHero";
import RQFriends from "./components/RQFriends";
import ParallelQueries from "./components/ParallelQueries";
import DynamicParallel from "./components/DynamicParallel";
import DependantQueries from "./components/DependantQueries";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">RQ Super Heroes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/rq-parallel" element={<ParallelQueries />} />
        <Route path="/rq-infinite" element={<InfiniteQueries />} />
        <Route path="/rq-paginated" element={<PaginatedQueries />} />
        <Route
          path="/rq-dependant"
          element={<DependantQueries email="shoeb@gmail.com" />}
        />
        <Route
          path="/rq-dynamic-parallel"
          element={<DynamicParallel heroIds={[1, 2]} />}
        />
        <Route path="/super-heroes" element={<SuperHeroes />} />
        <Route path="/friends" element={<RQFriends />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
        <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
