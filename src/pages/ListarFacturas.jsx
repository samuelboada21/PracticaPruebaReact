import { useEffect, useState } from "react";
import { listarFacturas, eliminarFactura } from "../services/FacturaService";
import { Button, Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Tabla from "../components/Tabla";

const FacturasList = () => {
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await listarFacturas();
        const facturasFormateadas = data.map((factura) => ({
          ...factura,
          fecha: new Date(factura.fecha).toLocaleDateString(),
        }));
        setFacturas(facturasFormateadas);
      } catch (error) {
        console.error("Error al listar las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar la factura?")) {
      try {
        await eliminarFactura(id);
        const updatedFacturas = facturas.filter((factura) => factura.id !== id);
        setFacturas(updatedFacturas);
        alert("Factura eliminada exitosamente");
      } catch (error) {
        alert("Error al eliminar la factura");
      }
    }
  };

  const headers = ["ID", "Cliente" ,"Fecha", "IVA", "Total"];

  const data = facturas.map((factura) => [
    factura.id,
    factura.nombreCliente,
    factura.fecha,
    factura.iva,
    factura.total
  ]);

  return (
    <Center>
      <Box mt="60px">
        <Button
          onClick={() => navigate("agregar")}
          bg="purple.800"
          _hover={"none"}
          mb={4}
        >
          Crear Factura
        </Button>
        <Tabla
          headers={headers}
          data={data}
          onDelete={handleDelete}
          onNavigateEdit={"actualizar/"}
          onNavigateDetails={"detailsFactura/"}
        />
      </Box>
    </Center>
  );
};

export default FacturasList;
