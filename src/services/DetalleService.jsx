
const API_URL = '/api/details';

export const listarDetalles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al listar los detalles');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listarDetallesFactura = async (id) => {
  try {
    const response = await fetch(`${API_URL}/facturas/${id}`);
    if (!response.ok) throw new Error('Error al listar los detalles de la factura');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearDetalle = async (detalle) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalle),
    });
    if (!response.ok) throw new Error('Error al crear el detalle');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const actualizarDetalle = async (id, detalle) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalle),
    });
    if (!response.ok) throw new Error('Error al actualizar los detalles');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarDetalle = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar los detalles');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const obtenerDetallePorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(response.error);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
