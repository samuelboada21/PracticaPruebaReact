import { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { crearFactura, obtenerFacturaPorId, actualizarFactura } from "../services/FacturaService";

const AgregarFactura = () => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [iva, setIva] = useState("");
  const [total, setTotal] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Si existe un ID, estamos en modo de actualización
      const fetchFactura = async () => {
        try {
          const factura = await obtenerFacturaPorId(id);
          setNombreCliente(factura.nombreCliente);
          setSubtotal(factura.subtotal);
          setIva(factura.iva);
          setTotal(factura.total);
        } catch (error) {
          console.error("Error al obtener factura:", error);
        }
      };
      fetchFactura();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const factura = {
      nombreCliente,
      fecha: today,
      subtotal: parseFloat(subtotal),
      iva: parseFloat(iva),
      total: parseFloat(total),
    };
    try {
      if (id) {
        // Si hay un ID, actualizamos la factura
        await actualizarFactura(id, factura);
        alert("Factura actualizada con éxito");
      } else {
        // Si no hay ID, creamos una nueva factura
        await crearFactura(factura);
        alert("Factura creada con éxito");
      }
      navigate("/facturas");
    } catch (error) {
      alert("Error al crear/actualizar factura");
      console.error("Error:", error);
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
        <FormLabel htmlFor="nombreCliente">Nombre Cliente:</FormLabel>
        <Input
          type="text"
          id="nombreCliente"
          name="nombreCliente"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="subtotal">Subtotal:</FormLabel>
        <Input
          type="number"
          id="subtotal"
          name="subtotal"
          value={subtotal}
          onChange={(e) => setSubtotal(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="iva">IVA:</FormLabel>
        <Input
          type="number"
          id="iva"
          name="iva"
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="total">Total:</FormLabel>
        <Input
          type="number"
          id="total"
          name="total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />
      </FormControl>
      <Button mt={4} type="submit" colorScheme="teal" w="full">
        {id ? "Actualizar Factura" : "Crear Factura"}
      </Button>
    </Box>
  );
};

export default AgregarFactura;
