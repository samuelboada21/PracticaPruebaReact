
const API_URL = '/api/facturas';

export const listarFacturas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al listar las facturas');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearFactura = async (facturaData) => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(facturaData),
  });

  if (!response.ok) {
    throw new Error('Error al crear la factura');
  }

  const data = await response.json();
  return data.id;
};

export const actualizarFactura = async (id, factura) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(factura),
    });
    if (!response.ok) throw new Error('Error al actualizar la factura');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarFactura = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la factura');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const obtenerFacturaPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(response.error);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
