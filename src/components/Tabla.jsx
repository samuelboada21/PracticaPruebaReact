/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Tabla = ({ headers, data, onDelete, onNavigateEdit }) => {
  const navigate = useNavigate();
  const itemsPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular índices de los ítems a mostrar en la página actual
  const indexUltimoItem = currentPage * itemsPage;
  const indexPrimerItem = indexUltimoItem - itemsPage;
  const currentItems = data.slice(indexPrimerItem, indexUltimoItem);

  const totalPages = Math.ceil(data.length / itemsPage);

  const nextPage = () => {
    if (currentPage != totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage != 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  data.sort((a, b) => {
    return Number(a[0]) - Number(b[0]);
  });

  return (
    <TableContainer mb={10}>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index} textAlign={"center"}>
                {header}
              </Th>
            ))}
            <Th key="actions" textAlign={"center"}>
              Acciones
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
              <Td key="actions">
                <IconButton
                  bgColor={"blue.400"}
                  _hover={{ bgColor: "blue.500" }}
                  icon={<EditIcon />}
                  onClick={() => navigate(`${onNavigateEdit}${row[0]}`)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  bgColor={"red.400"}
                  _hover={{ bgColor: "red.500" }}
                  ml={2}
                  onClick={() => onDelete(row[0])}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Controles de paginación */}
      <IconButton
        bg="purple.800"
        _hover={"none"}
        icon={<ChevronLeftIcon />}
        onClick={prevPage}
        disabled={currentPage === 1}
        mt={4}
        mr={2}
      />
      <IconButton
        bg="purple.800"
        _hover={"none"}
        icon={<ChevronRightIcon />}
        onClick={nextPage}
        disabled={currentPage === totalPages}
        mt={4}
      />
    </TableContainer>
  );
};

export default Tabla;
