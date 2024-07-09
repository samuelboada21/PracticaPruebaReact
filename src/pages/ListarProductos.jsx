import { useEffect, useState } from "react";
import { listarProductos, eliminarProducto } from "../services/ProductoService";
import { Button, Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Tabla from "../components/Tabla";

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await listarProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al listar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar el producto?")) {
      try {
        await eliminarProducto(id);
        const updatedProductos = productos.filter(
          (producto) => producto.id !== id
        );
        setProductos(updatedProductos);
        alert("Producto eliminado exitosamente");
      } catch (error) {
        alert("Error al eliminar producto");
      }
    }
  };

  const headers = ["ID", "Nombre", "Valor"];

  const data = productos.map((producto) => [
    producto.id,
    producto.nombre,
    producto.valor,
  ]);

  return (
    <Center>
      <Box mt="60px">
        <Button onClick={() => navigate("/agregar")} colorScheme="teal" mb={4}>
          Agregar Producto
        </Button>
        <Tabla
          headers={headers}
          data={data}
          onDelete={handleDelete}
          onNavigateEdit={"/actualizar/"}
        />
      </Box>
    </Center>
  );
};

export default ProductosList;
