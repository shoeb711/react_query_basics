import { Route, Routes, useNavigate } from "react-router-dom";
import ProductPage from "./page/ProductPage";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <button onClick={() => navigate("/")}>home</button>
        <button onClick={() => navigate("/dummy")}>dummy</button>
      </nav>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/dummy" element={<div>Dummy compoennt</div>} />
      </Routes>
    </div>
  );
}

export default App;
