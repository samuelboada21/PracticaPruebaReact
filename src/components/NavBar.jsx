import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="purple.800" px={4}>
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            AppFacturas
          </Text>
        </Box>
        <HStack as="nav" spacing={4}>
          <Link as={RouterLink} to="/productos" color="white" fontSize="lg">
            Productos
          </Link>
          <Link as={RouterLink} to="/facturas" color="white" fontSize="lg">
            Facturas
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
