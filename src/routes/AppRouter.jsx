import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgregarProducto from "../components/AgregarProducto";
import ListarProductos from "../components/ListarProductos";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<ListarProductos/>}/>
            <Route path="/agregar" element={<AgregarProducto/>}/>
        </Routes>
      </Router>
    </>
  );
}
