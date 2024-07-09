import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgregarProducto from "../pages/AgregarProducto";
import ListarProductos from "../pages/ListarProductos";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/productos" element={<ListarProductos/>}/>
            <Route path="/agregar" element={<AgregarProducto/>}/>
            <Route path="/actualizar/:id" element={<AgregarProducto/>}/>
        </Routes>
      </Router>
    </>
  );
}
