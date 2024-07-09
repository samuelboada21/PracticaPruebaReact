
const API_URL = '/api/productos';

export const listarProductos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al listar productos');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error('Error al crear producto');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(response.error);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
