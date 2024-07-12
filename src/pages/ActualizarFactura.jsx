import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerFacturaPorId,
  actualizarFactura,
} from "../services/FacturaService";
import { listarProductos } from "../services/ProductoService";
import {
  listarDetallesFactura,
  actualizarDetalle,
  eliminarDetalle,
  crearDetalle,
} from "../services/DetalleService";

const ActualizarFactura = () => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [iva, setIva] = useState("");
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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

    if (id) {
      const fetchFactura = async () => {
        try {
          const factura = await obtenerFacturaPorId(id);
          setNombreCliente(factura.nombreCliente);
          setIva(factura.iva);
        } catch (error) {
          console.error("Error al obtener factura:", error);
        }
      };
      fetchFactura();

      const fetchDetalles = async () => {
        try {
          const detallesData = await listarDetallesFactura(id);
          const detallesFactura = detallesData.map((detalle) => ({
            id: detalle.id,
            producto: detalle.producto.id.toString(),
            cantidad: detalle.cantidad.toString(),
            valor: detalle.valor.toFixed(2),
          }));
          setDetalles(detallesFactura);
        } catch (error) {
          console.error("Error al obtener detalles de la factura:", error);
        }
      };
      fetchDetalles();
    }
  }, [id]);

  const handleAgregarDetalle = () => {
    setDetalles([...detalles, { cantidad: "", valor: "", producto: "" }]);
  };

  const handleEliminarDetalle = (index) => {
    const updatedDetalles = [...detalles];
    const detalle = updatedDetalles[index];
    if (detalle.id) {
      eliminarDetalle(detalle.id)
        .then(() => {
          updatedDetalles.splice(index, 1);
          setDetalles(updatedDetalles);
        })
        .catch((error) => {
          console.error("Error al eliminar detalle:", error);
        });
    } else {
      updatedDetalles.splice(index, 1);
      setDetalles(updatedDetalles);
    }
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
      nombreCliente,
      fecha: today,
      subtotal,
      iva: parseFloat(iva),
      total,
    };

    try {
      await actualizarFactura(id, facturaData);

      for (const detalle of detalles) {
        const detalleData = {
          cantidad: parseInt(detalle.cantidad),
          valor: parseFloat(detalle.valor),
          producto: {
            id: parseInt(detalle.producto),
          },
        };

        if (detalle.id) {
          await actualizarDetalle(detalle.id, detalleData, id);
        } else {
          await crearDetalle(id, detalleData);
        }
      }

      alert("Factura actualizada con éxito");
      navigate("/facturas");
    } catch (error) {
      alert("Error al actualizar factura");
      console.error("Error:", error);
    }
  };

  const selectedProductos = detalles.map((detalle) => detalle.producto);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="600px"
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
      <FormControl mt={4}>
        <FormLabel>Subtotal:</FormLabel>
        <Text>
          {detalles
            .reduce((acc, detalle) => acc + parseFloat(detalle.valor), 0)
            .toFixed(2)}
        </Text>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Total:</FormLabel>
        <Text>
          {(
            detalles.reduce(
              (acc, detalle) => acc + parseFloat(detalle.valor),
              0
            ) +
            (detalles.reduce(
              (acc, detalle) => acc + parseFloat(detalle.valor),
              0
            ) *
              parseFloat(iva)) /
              100
          ).toFixed(2)}
        </Text>
      </FormControl>

      {detalles.map((detalle, index) => (
        <Box
          key={index}
          w="full"
          mt={4}
          p={4}
          borderWidth={1}
          borderRadius="lg"
        >
          <HStack spacing={4}>
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
                  <option
                    key={producto.id}
                    value={producto.id}
                    disabled={selectedProductos.includes(
                      producto.id.toString()
                    )}
                  >
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
            <Button
              mt={6}
              colorScheme="red"
              onClick={() => handleEliminarDetalle(index)}
            >
              <strong>X</strong>
            </Button>
          </HStack>
        </Box>
      ))}

      <Button mt={4} onClick={handleAgregarDetalle} colorScheme="blue">
        Agregar Producto
      </Button>

      <Button mt={4} type="submit" colorScheme="teal" w="full">
        Actualizar Factura
      </Button>
    </Box>
  );
};

export default ActualizarFactura;
