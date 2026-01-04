import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import NavbarA from "../../components/ui/NavbarA";
import Sidebar from "../../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

const Alayout = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="#0f172a" overflow="hidden">
      {/* Sidebar */}
      <Sidebar isOpen={open} onClose={onClose} />

      {/* Main Content */}
      <Flex flex="1" direction="column">
        {/* Navbar */}
        <Box
          w="100%"
          bg="#020617"
          borderBottom="1px solid rgba(255,255,255,0.05)"
        >
          <NavbarA onOpen={onOpen} />
        </Box>

        {/* Page Content */}
        <Box
          flex="1"
          p={{ base: 4, md: 6 }}
          bg="#0f172a"
          color="white"
          overflowY="auto"
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Alayout;
