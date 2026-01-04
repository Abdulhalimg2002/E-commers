import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Menu } from "lucide-react";

interface NavbarAProps {
  onOpen: () => void;
}

const NavbarA = ({ onOpen }: NavbarAProps) => {
  return (
    <Flex
      h="60px"
      bg="#020617"
      color="white"
      px={6}
      align="center"
      justify="center"
      position="relative"
      borderBottom="1px solid rgba(255,255,255,0.05)"
    >
      {/* ☰ Mobile Menu */}
      <Box
        position="absolute"
        left="16px"
        display={{ base: "block", md: "none" }}
        cursor="pointer"
        onClick={onOpen}
      >
        <Menu size={24} />
      </Box>

      {/* Title */}
      <Text fontWeight="bold" fontSize="lg">
        Dashboard
      </Text>

      {/* Right User */}
      <HStack position="absolute" right="16px">
        <Text fontSize="sm">Abdulhalim</Text>
      </HStack>
    </Flex>
  );
};

export default NavbarA;
