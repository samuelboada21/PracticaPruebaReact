import { useState, useEffect } from "react";
import {
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
} from "../services/ProductoService";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del producto de los parámetros de la URL

  useEffect(() => {
    if (id) {
      // Si existe un ID, estamos en modo de actualización
      const fetchProducto = async () => {
        try {
          const producto = await obtenerProductoPorId(id);
          setNombre(producto.nombre);
          setPrecio(producto.precio);
        } catch (error) {
          console.error("Error al obtener producto:", error);
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = { nombre, precio: parseFloat(precio) };
    try {
      if (id) {
        // Si hay un ID, actualizamos el producto
        await actualizarProducto(id, producto);
        alert("Producto actualizado con éxito");
      } else {
        // Si no hay ID, creamos un nuevo producto
        await crearProducto(producto);
        alert("Producto creado con éxito");
      }
      navigate("/productos");
    } catch (error) {
      alert("Error al crear/actualizar producto");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
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
      <FormControl>
        <FormLabel htmlFor="nombre">Nombre:</FormLabel>
        <Input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="valor">Precio:</FormLabel>
        <Input
          type="number"
          id="valor"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </FormControl>
      <Button mt={4} type="submit" colorScheme="teal" w="full">
        {id ? "Actualizar Producto" : "Agregar Producto"}
      </Button>
    </Box>
  );
};

export default AgregarProducto;
