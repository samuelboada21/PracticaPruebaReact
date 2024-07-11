import { useState, useEffect } from "react";
import { obtenerFacturaPorId } from "../services/FacturaService";
import { listarDetallesFactura } from "../services/DetalleService";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const VerFactura = () => {
  const [factura, setFactura] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la factura de los parámetros de la URL

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const facturaData = await obtenerFacturaPorId(id);
        setFactura(facturaData);
      } catch (error) {
        console.error("Error al obtener factura:", error);
      }
    };

    const fetchDetalles = async () => {
      try {
        const detallesData = await listarDetallesFactura(id);
        setDetalles(detallesData);
      } catch (error) {
        console.error("Error al obtener detalles de la factura:", error);
      }
    };

    fetchFactura();
    fetchDetalles();
  }, [id]);

  return (
    <Box
      maxW="800px"
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
      {factura ? (
        <>
          <Text fontSize="2xl" fontWeight="bold">
            Factura ID: {factura.id}
          </Text>
          <Text fontSize="lg" mt={2}>
            Cliente: {factura.nombreCliente}
          </Text>
          <Text fontSize="lg" mt={2}>
            Fecha: {new Date(factura.fecha).toLocaleDateString()}
          </Text>
          <Text fontSize="lg" mt={2}>
            IVA: {factura.iva}
          </Text>
          <Text fontSize="lg" mt={2}>
            Total: {factura.total}
          </Text>

          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Detalles:
          </Text>
          <VStack spacing={4} mt={4} w="full">
            {detalles.map((detalle) => (
              <Box
                key={detalle.id}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                w="full"
              >
                <Text fontSize="lg">Producto: {detalle.producto.nombre}</Text>
                <Text fontSize="lg">Cantidad: {detalle.cantidad}</Text>
                <Text fontSize="lg">Valor: {detalle.valor}</Text>
              </Box>
            ))}
          </VStack>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => navigate("/facturas")}
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

export default VerFactura;
