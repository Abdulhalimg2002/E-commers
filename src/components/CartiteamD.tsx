import { Button, Flex, Image, Text, Box } from "@chakra-ui/react";
import type { IProduct } from "../interface";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty } from "../app/features/product/CartS";

interface IProps {
  item: IProduct;
}

const CartiteamD = ({ item }: IProps) => {
    const dispatch = useDispatch();
  return (
    <Flex
      align="center"
      justify="space-between"
      mb={3}
      p={3}
      gap={3}
      borderBottom="1px solid rgba(255,255,255,0.1)"
      flexDirection={{ base: "column", sm: "row" }}
    >
      {/* Left: Image + Title */}
      <Flex align="center" gap={3} w="100%">
        <Image
          src={item.thumbnail.url}
          w={{ base: "50px", sm: "60px" }}
          h={{ base: "50px", sm: "60px" }}
          rounded="full"
          objectFit="cover"
        />

        <Box>
          <Text fontSize={{ base: "sm", md: "md" }} lineClamp={1}>
            {item.title}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
  Total: ${item.price * item.qty}
</Text>
        </Box>
      </Flex>

      {/* Right: Qty + Remove */}
      <Flex align="center" gap={2}>
  <Button size="xs" onClick={() => dispatch(decreaseQty(item.id))}>−</Button>

  <Text fontWeight="bold">{item.qty}</Text>

  <Button size="xs" onClick={() => dispatch(increaseQty(item.id))}>+</Button>
</Flex>
    </Flex>
  );
};

export default CartiteamD;
