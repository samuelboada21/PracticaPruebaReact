import { useState, useEffect } from 'react';
import { crearProducto, obtenerProductoPorId, actualizarProducto } from '../services/ProductoService';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del producto de los parámetros de la URL

  useEffect(() => {
    if (id) {
      // Si existe un ID, estamos en modo de actualización
      const fetchProducto = async () => {
        try {
          const producto = await obtenerProductoPorId(id);
          setNombre(producto.nombre);
          setValor(producto.valor);
        } catch (error) {
          console.error('Error al obtener producto:', error);
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = { nombre, valor: parseFloat(valor) };
    try {
      if (id) {
        // Si hay un ID, actualizamos el producto
        await actualizarProducto(id, producto);
        alert('Producto actualizado con éxito');
      } else {
        // Si no hay ID, creamos un nuevo producto
        await crearProducto(producto);
        alert('Producto creado con éxito');
      }
      navigate('/productos');
    } catch (error) {
      alert('Error al crear/actualizar producto');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="nombre">Nombre:</FormLabel>
        <Input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="valor">Precio:</FormLabel>
        <Input type="number" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} />
      </FormControl>
      <Button mt={4} type="submit" colorScheme="teal">
        {id ? 'Actualizar Producto' : 'Agregar Producto'}
      </Button>
    </Box>
  );
};

export default AgregarProducto;
