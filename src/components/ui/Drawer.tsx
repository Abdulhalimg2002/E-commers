import { Drawer, Portal, CloseButton, ButtonGroup, Button,Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


import CartiteamD from "../CartiteamD";
import { Removeall } from "../../app/features/product/CartS";
import type { RootState } from "../../app/store";


interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const Drawers = ({ isOpen, onClose }: DrawerProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
/*const{isOpenD}=useSelector(({global}:RootState)=>global)
 
 const onClose=()=>dispatch(closeCart())*/
  const dispatch = useDispatch();
 const cartItems = useSelector((state: RootState) => state.cart.iteam);
 const totalPrice = cartItems.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);

  return (
    <>
      

      <Drawer.Root
        size="md"
       
         open={isOpen}
          onOpenChange={(e) => {
        if (!e.open) onClose();   
      }}
      finalFocusEl={() => btnRef.current}
      
       
       
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="#1c1f2c">
              <Drawer.Header borderBottom="1px solid rgba(255,255,255,0.08)">
                <Drawer.CloseTrigger color={"white"} asChild pos="initial">
                  <CloseButton />
                </Drawer.CloseTrigger>

                <Drawer.Title flex="1" color={"white"}>Your Shopping Cart</Drawer.Title>

                
              </Drawer.Header>

             <Drawer.Body color={"white"}>
  {cartItems.length?cartItems.map((item) => (
    <CartiteamD key={item.id} item={item} />
  )):<Text textAlign={"center"} fontWeight={"bold"}>Your Shopping Cart is empty</Text>}
</Drawer.Body>
              <Drawer.Footer color={"white"}   borderTop="1px solid rgba(255,255,255,0.08)"
  justifyContent="space-between">
                <Text fontWeight="bold" fontSize="lg" color="teal.300">Total: ${totalPrice}</Text>
                <ButtonGroup >
                  <Button  background={"red"} onClick={() => dispatch(Removeall())} color={"white"} _hover={{ bg: "red.500", color: "white",
  }}>Clear All</Button>
                  
                </ButtonGroup>
              </Drawer.Footer>
              
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default Drawers;
