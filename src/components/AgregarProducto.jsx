// src/components/AgregarProducto.jsx
import  { useState } from 'react';
import { crearProducto } from '../services/ProductoService';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = { nombre, valor: parseFloat(valor) };
    try {
      await crearProducto(producto);
      alert('Producto creado con éxito');
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AgregarProducto;
