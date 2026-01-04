import { useNavigate, useParams } from "react-router-dom";

import type { IProduct } from "../interface";
import { useEffect } from "react";

import {
  Flex,
  
  Skeleton,
  Text,
  Box,
  Button,
  Card,
  Image,
  HStack,
  Badge,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/product/CartS";
import toast from "react-hot-toast";
import { useGetPrByIdQuery } from "../app/features/product/PrduactS";


const ProudactD = () => {
  const iteam = useSelector((state: any) => state.cart.iteam);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Text color="white">Product not found</Text>;
  }

  

const { data, isLoading } = useGetPrByIdQuery(id!, {
  skip: !id,
});
 console.log(data)
  const addToCartH=()=>{
   
   if (data) {
  dispatch(addToCart(data));
    const item = iteam.find((i: IProduct) => i.id === data.id);

  const newQty = item ? item.qty! + 1 : 1;

  toast.success(
    item
      ? `${data.title} quantity → ${newQty}`
      : `${data.title} added to cart 🛒`,
    {
      position: "top-center",
      duration: 1500,
      style: {
        backgroundColor: "black",
        color: "white",
      },
    }
  );
}
  }

  useEffect(() => {
    if (data?.title) {
      document.title = `Product ${data.title}`;
    }
  }, [data]);
if (isLoading) {
  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      {/* Go Back Skeleton */}
      <Flex
        align="center"
        maxW="container.sm"
        mx="auto"
        mb={5}
      >
        <SkeletonCircle size="6" />
        <SkeletonText ml={3} noOfLines={1} width="80px" />
      </Flex>

      {/* Card Skeleton */}
      <Card.Root
        flexDirection={{ base: "column", md: "row" }}
        overflow="hidden"
        maxW="xl"
        mx="auto"
      >
        {/* Image Skeleton */}
        <Skeleton
          w={{ base: "100%", md: "200px" }}
          h={{ base: "220px", sm: "260px", md: "100%" }}
        />

        <Box flex="1">
          <Card.Body>
            <Skeleton height="24px" mb={3} />
            <SkeletonText noOfLines={4} gap={3} />

            <HStack mt={4}>
              <Skeleton height="20px" width="80px" />
              <Skeleton height="20px" width="60px" />
            </HStack>
          </Card.Body>

          <Card.Footer>
            <Skeleton height="48px" width="100%" />
          </Card.Footer>
        </Box>
      </Card.Root>
    </Box>
  );
}


  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
  {/* Go Back */}
  <Flex
    align="center"
    maxW="container.sm"
    mx="auto"
    mb={5}
    cursor="pointer"
    onClick={() => navigate(-1)}
  >
    <ArrowLeft color="white" />
    <Text ml={2} color="white">
      Go Back
    </Text>
  </Flex>

  {/* Card */}
 <Card.Root
  flexDirection={{ base: "column", md: "row" }}
  bg="linear-gradient(135deg, #111827, #1f2937)"
  borderRadius="2xl"
  overflow="hidden"
  maxW="5xl"
  mx="auto"
  border="1px solid rgba(255,255,255,0.08)"
  boxShadow="0 20px 40px rgba(0,0,0,0.4)"
  _hover={{
    transform: "translateY(-6px)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
    borderColor: "teal.400",
  }}
  transition="0.35s ease"
>
  {/* IMAGE */}
  <Box
    flex={{ base: "none", md: "0 0 45%" }}
    bg="radial-gradient(circle at top, #374151, #020617)"
    p={8}
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    {data?.thumbnail && (
      <Image
        src={data.thumbnail.url}
        alt={data.title}
        maxH="320px"
        maxW="100%"
        objectFit="contain"
        borderRadius="xl"
        
      />
    )}
  </Box>

  {/* CONTENT */}
  <Box flex="1" display="flex" flexDirection="column">
    <Card.Body p={8}>
      <Text
        color="white"
        fontSize="3xl"
        fontWeight="800"
        mb={3}
      >
        {data?.title}
      </Text>

      <Text
        color="gray.400"
        fontSize="md"
        lineHeight="1.8"
        mb={6}
      >
        {data?.description}
      </Text>

      <HStack gap={3} flexWrap="wrap">
        <Badge
          bg="rgba(20,184,166,0.15)"
          color="teal.300"
          border="1px solid rgba(20,184,166,0.4)"
          px={4}
          py={2}
          borderRadius="full"
        >
          {data?.category?.title || "No Category"}
        </Badge>

        <Badge
          bg="rgba(34,197,94,0.15)"
          color="green.300"
          border="1px solid rgba(34,197,94,0.4)"
          px={4}
          py={2}
          borderRadius="full"
          fontSize="lg"
          fontWeight="700"
        >
          ${data?.price}
        </Badge>
      </HStack>
    </Card.Body>

    {/* FOOTER */}
    <Card.Footer p={6} pt={0}>
      <Button
        onClick={addToCartH}
        w="100%"
        h="60px"
        fontSize="lg"
        fontWeight="700"
        bg="linear-gradient(90deg, #14b8a6, #22c55e)"
        color="white"
        _hover={{
          bg: "linear-gradient(90deg, #0d9488, #16a34a)",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(34,197,94,0.4)",
        }}
      >
        🛒 Add to Cart
      </Button>
    </Card.Footer>
  </Box>
</Card.Root>


</Box>

  );
};

export default ProudactD;



 