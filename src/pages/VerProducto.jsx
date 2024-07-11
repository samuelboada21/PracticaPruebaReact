import { useState, useEffect } from "react";
import { obtenerProductoPorId } from "../services/ProductoService";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const VerProducto = () => {
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del producto de los parámetros de la URL

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const producto = await obtenerProductoPorId(id);
        setProducto(producto);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };
    fetchProducto();
  }, [id]);

  return (
    <Box
      maxW="400px"
      mx="auto"
      my="auto"
      mt="50px"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {producto ? (
        <>
          <Text fontSize="2xl" fontWeight="bold">
            {producto.nombre}
          </Text>
          <Text fontSize="lg" mt={2}>
            Precio: ${producto.precio}
          </Text>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => navigate("/productos")}
          >
            Regresar
          </Button>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </Box>
  );
};

export default VerProducto;
