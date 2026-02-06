import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Background from "./pages/Background.jsx";
import EditarProd from "./pages/EditarProd.jsx";
import CriarProd from "./pages/CriarProd.jsx";
import ProductList from "./pages/ProductList.jsx";

export default function App() {
  return (
    <Background>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/criar" element={<CriarProd />} />
      <Route path="/editar/:id" element={<EditarProd />} />
    </Routes>
  </BrowserRouter>
  </Background>

  );
}
