import {
  Box,
  Flex,
  VStack,
  Text,
  Drawer,
} from "@chakra-ui/react";
import { Home, Package, Users, ChartBarStacked, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../app/features/Auth/Auth";
import toast from "react-hot-toast";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, to, onClick }: SidebarItemProps) => {
  return (
    <NavLink to={to} onClick={onClick} style={{ textDecoration: "none" }}>
      {() => (
        <Flex
          align="center"
          gap={3}
          p={3}
          borderRadius="md"
          cursor="pointer"
        
          _hover={{ bg: "whiteAlpha.200" }}
          color="white"
        >
          {icon}
          <Text>{label}</Text>
        </Flex>
      )}
    </NavLink>
  );
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());

    toast.success("You have been logged out", {
      position: "bottom-center",
      duration: 1200,
      style: { backgroundColor: "black", color: "white" },
    });
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Admin
      </Text>

      <VStack gap={4} align="stretch">
        <SidebarItem onClick={onClose} icon={<Home size={18} />} label="Dashboard" to="/Adashboard" />
        <SidebarItem onClick={onClose} icon={<Package size={18} />} label="Products" to="prduactA" />
        <SidebarItem onClick={onClose} icon={<Users size={18} />} label="Users" to="Users" />
        <SidebarItem onClick={onClose} icon={<ChartBarStacked size={18} />} label="Category" to="Category" />

        {/* Logout */}
       <Flex
  align="center"
  gap={3}
  p={3}
  borderRadius="md"
  cursor="pointer"
 _hover={{ bg: "whiteAlpha.200" }}
  color="white"
  onClick={onLogout}
>
  <LogOut size={18} />
  <Text fontSize="sm">Logout</Text>
</Flex>

      </VStack>
    </>
  );
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Desktop */}
      <Box
        width="260px"
        bg="#020617"
        color="white"
        p={6}
        display={{ base: "none", md: "block" }}
      >
        <SidebarContent />
      </Box>

      {/* Mobile */}
      <Drawer.Root
        open={isOpen}
        placement="start"
        onOpenChange={(e) => {
          if (!e.open) onClose();
        }}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="#020617" color="white">
            <Drawer.Body p={6}>
              <SidebarContent onClose={onClose} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
};

export default Sidebar;
