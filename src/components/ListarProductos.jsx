import  { useEffect, useState } from 'react';
import { listarProductos } from '../services/ProductoService';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await listarProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al listar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre} - ${producto.valor}</li>
        ))}
      </ul>
      <Button onClick={() => navigate('/agregar')}>Agregar Producto</Button>
    </div>
  );
};

export default ProductosList;
