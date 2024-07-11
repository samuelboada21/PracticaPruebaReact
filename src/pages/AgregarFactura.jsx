import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { crearFactura } from "../services/FacturaService";
import { listarProductos } from "../services/ProductoService";

const AgregarFactura = () => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [iva, setIva] = useState("");
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([
    { producto: "", cantidad: "", valor: "" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await listarProductos();
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleAgregarDetalle = () => {
    setDetalles([...detalles, { producto: "", cantidad: "", valor: "" }]);
  };

  const handleChangeDetalle = (index, field, value) => {
    const updatedDetalles = [...detalles];
    updatedDetalles[index][field] = value;

    if (field === "cantidad" || field === "producto") {
      const cantidad = parseInt(updatedDetalles[index].cantidad);
      const productoId = updatedDetalles[index].producto;
      const producto = productos.find(
        (prod) => prod.id === parseInt(productoId)
      );
      if (producto) {
        updatedDetalles[index].valor = (cantidad * producto.precio).toFixed(2);
      }
    }

    setDetalles(updatedDetalles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const subtotal = detalles.reduce(
      (acc, detalle) => acc + parseFloat(detalle.valor),
      0
    );
    const total = subtotal + (subtotal * parseFloat(iva)) / 100;

    const facturaData = {
      factura: {
        nombreCliente,
        fecha: today,
        subtotal,
        iva: parseFloat(iva),
        total,
      },
      detalles: detalles.map((detalle) => ({
        cantidad: parseInt(detalle.cantidad),
        valor: parseFloat(detalle.valor),
        producto: {
          id: parseInt(detalle.producto),
        },
      })),
    };

    try {
      await crearFactura(facturaData);
      alert("Factura creada con éxito");
      navigate("/facturas");
    } catch (error) {
      alert("Error al crear factura");
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
        <FormLabel htmlFor="iva">IVA (%):</FormLabel>
        <Input
          type="number"
          id="iva"
          name="iva"
          value={iva}
          onChange={(e) => setIva(e.target.value)}
          required
        />
      </FormControl>

      {detalles.map((detalle, index) => (
        <VStack key={index} spacing={4} mt={4} w="full">
          <FormControl>
            <FormLabel htmlFor={`producto${index}`}>Producto:</FormLabel>
            <Select
              id={`producto${index}`}
              value={detalle.producto}
              onChange={(e) =>
                handleChangeDetalle(index, "producto", e.target.value)
              }
              required
            >
              <option value="" disabled>
                Seleccione un producto
              </option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={`cantidad${index}`}>Cantidad:</FormLabel>
            <Input
              type="number"
              id={`cantidad${index}`}
              value={detalle.cantidad}
              onChange={(e) =>
                handleChangeDetalle(index, "cantidad", e.target.value)
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={`valor${index}`}>Valor:</FormLabel>
            <Input
              type="number"
              id={`valor${index}`}
              value={detalle.valor}
              onChange={(e) =>
                handleChangeDetalle(index, "valor", e.target.value)
              }
              required
              readOnly
            />
          </FormControl>
        </VStack>
      ))}

      <Button mt={4} onClick={handleAgregarDetalle} colorScheme="blue">
        Agregar Producto
      </Button>

      <Button mt={4} type="submit" colorScheme="teal" w="full">
        Crear Factura
      </Button>
    </Box>
  );
};

export default AgregarFactura;
