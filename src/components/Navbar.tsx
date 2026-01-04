import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Stack,
  useDisclosure,
  chakra,
  Button,

} from "@chakra-ui/react";
import {
  CircleX,
  Menu,
  LogOut,
  User,
  ShoppingCart,

  Handbag,
  UserPlus,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { logout } from "../app/features/Auth/Auth";
import { openCart } from "../app/features/globalS";
import { Removeall } from "../app/features/product/CartS";



 // ملف Cookie Service

const ChakraRouterLink = chakra(RouterLink);

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, onClick }: NavItemProps) => (
  <ChakraRouterLink
    to={to}
    onClick={onClick}
    px={3}
    py={2}
    borderRadius="md"
    color="white"
    fontWeight="medium"
    _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
  >
    <HStack gap={2}>
      {icon}
      <Text>{label}</Text>
    </HStack>
  </ChakraRouterLink>
);

const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure();
 const navigate = useNavigate();
  // 🔥 افحص إذا المستخدم مسجّل دخول عن طريق Token في Cookie
  const dispatch = useDispatch();
const isLoggedIn = useSelector(
  (state: RootState) => !!state.auth.user?.jwt
);
const{iteam}=useSelector(({cart}:RootState)=>cart)

  // 🔥 Logout


const onLogout = () => {
  dispatch(logout());
   dispatch(Removeall()); 

  toast.success("You have been logged out", {
    position: "bottom-center",
    duration: 1200,
    style: { backgroundColor: "black", color: "white" },
  });

  navigate("/login", { replace: true });
};


  return (
    <Box bg="teal.500"
  px={6}
  boxShadow="0 4px 20px rgba(0,0,0,0.35)"
  position="sticky"
  top={0}
  zIndex={10}   >
      <Flex h={16} align="center" position="relative"   >
        {/* Logo */}
        <Box position="absolute" left={6}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            MyStore
          </Text>
        </Box>

        {/* Desktop Menu */}
        <Flex   mx="auto" display={{ base: "none", md: "flex" }}  gap={4}>
          {isLoggedIn && (
            <>
              <NavItem to="/" icon={<Handbag size={18} />} label="Product" />
             <Button _hover={{bg: "whiteAlpha.200", color: "white",}}   onClick={() => dispatch(openCart())}  bg="none" color="white"   display="flex"  alignItems="center" gap={2}>
  <ShoppingCart size={18} />
  Cart ({iteam.length})
</Button>
              <NavItem to="/Profile" icon={<User size={18} />} label="MyProfile" />
            </>
          )}
        </Flex>

        {/* Right Side */}
        <Box position="absolute" right={6} display={{ base: "none", md: "flex" }} gap={2}>
         
          {isLoggedIn ? (<>
           
            <NavItem to="#" icon={<LogOut size={18} />} label="Logout" onClick={onLogout} />
         </> ) : (
            <>
              <NavItem to="/login" icon={<UserPlus size={18} />} label="Login" />
              <NavItem to="/register" icon={<KeyRound size={18} />} label="Register" />
            </>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Menu"
          display={{ base: "flex", md: "none" }}
          onClick={open ? onClose : onOpen}
          variant="ghost"
          color="white"
          ml="auto"
        >
          {open ? <CircleX /> : <Menu />}
        </IconButton>
      </Flex>

      {/* Mobile Menu */}
      {open && (
        <Box mt={4} p={4} display={{ md: "none" }}>
          <Stack gap={2}>
            {isLoggedIn ? (
              <>
               
                <NavItem to="/" icon={<Handbag size={18} />} label="Product" onClick={onClose} />
                 <Button
  onClick={() => dispatch(openCart())}
  w="100%"
  justifyContent="flex-start"
  bg="none"
  display="flex"
  alignItems="center"
  gap={3}
  fontSize="md"
>
  <ShoppingCart size={18} />
  Cart ({iteam.length})
</Button>
                <NavItem to="/profile" icon={<User size={18} />} label="MyProfile" onClick={onClose} />
                <NavItem to="#" icon={<LogOut size={18} />} label="Logout" onClick={() => { onClose(); onLogout(); }} />
                 
              </>
            ) : (
              <>
                <NavItem to="/login" icon={<UserPlus size={18} />} label="Login" onClick={onClose} />
                <NavItem to="/register" icon={<KeyRound size={18} />} label="Register" onClick={onClose} />
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
