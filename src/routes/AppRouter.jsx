import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgregarProducto from "../pages/AgregarProducto";
import ListarProductos from "../pages/ListarProductos";
import ListarFacturas from "../pages/ListarFacturas";
import VerProducto from "../pages/VerProducto";
import VerFactura from "../pages/VerFactura";
import AgregarFactura from "../pages/AgregarFactura";
import ActualizarFactura from "../pages/ActualizarFactura";
import Navbar from "../components/NavBar";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/productos">
            <Route index element={<ListarProductos />} />
            <Route path="agregar" element={<AgregarProducto />} />
            <Route path="actualizar/:id" element={<AgregarProducto />} />
            <Route path="detailsProducto/:id" element={<VerProducto />} />
          </Route>
          <Route path="/facturas">
            <Route index element={<ListarFacturas />} />
            <Route path="agregar" element={<AgregarFactura />} />
            <Route path="actualizar/:id" element={<ActualizarFactura />} />
            <Route path="detailsFactura/:id" element={<VerFactura />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
