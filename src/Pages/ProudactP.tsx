import { Grid, HStack,  Text, Image, Box, Flex, Spinner } from "@chakra-ui/react";
import ProudactCard from "../components/ProudactCard";
import { useGetPrQuery } from "../app/features/product/PrduactS";
import { useGetCQuery } from "../app/features/product/CategoryS";
import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";


const ProudactP = () => {
  const { isLoading, data: products = [] } = useGetPrQuery();
  const { data: categories = [] } = useGetCQuery();
  const isOnline = useSelector(
  (state: RootState) => state.Network.isOnline
);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 🧠 نضيف Category وهمية
  const allCategories = [
    { id: "all", title: "All", iconC: LayoutGrid }, // وهمية
    ...categories,
  ];

  // 🔥 فلترة المنتجات
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: any) => p.category?.documentId === selectedCategory
        );

  if (isLoading||!isOnline) {
    return (
     <Flex h="70vh" align="center" justify="center">
            <Spinner size="xl" color="teal.400" />
          </Flex>
    );
  }

  return (
    <>
      {/* Categories Bar */}
   <Box
  px={{ base: 4, md: 8 }}
  py={5}
 
  borderBottom="1px solid"
  borderColor="whiteAlpha.100"
  position="sticky"
  top="0"
  zIndex={10}
  backdropFilter="blur(8px)"
>
  <HStack
    gap={4}
    overflowX="auto"
    css={{
      "&::-webkit-scrollbar": { display: "none" },
    }}
  >
    {allCategories.map((cat: any) => {
      const isAll = cat.id === "all";
      const key = isAll ? "all" : cat.documentId;
      const active = selectedCategory === key;

      return (
        <Box
          key={key}
          onClick={() => setSelectedCategory(key)}
          cursor="pointer"
          px={5}
          py={3}
          minW="fit-content"
          borderRadius="full"
          display="flex"
          alignItems="center"
          gap={3}
          bg={
            active
              ? "linear-gradient(90deg, #2563eb, #3b82f6)"
              : "whiteAlpha.50"
          }
          border="1px solid"
          borderColor={active ? "blue.400" : "whiteAlpha.200"}
          color={active ? "white" : "gray.300"}
          boxShadow={active ? "0 10px 20px rgba(59,130,246,0.4)" : "none"}
          _hover={{
            bg: active
              ? "linear-gradient(90deg, #1d4ed8, #2563eb)"
              : "whiteAlpha.100",
            transform: "translateY(-2px)",
          }}
          transition="0.25s ease"
        >
          {isAll ? (
            <LayoutGrid size={18} />
          ) : (
            <Image
              src={cat.iconC?.url}
              boxSize="22px"
              borderRadius="full"
              bg="white"
              p="2px"
            />
          )}

          <Text fontSize="sm" fontWeight="600" whiteSpace="nowrap">
            {cat.title}
          </Text>
        </Box>
      );
    })}
  </HStack>
</Box>



      {/* Products Grid */}
     <Grid
  px={10}
  py={8}
  templateColumns="repeat(auto-fill, minmax(260px,1fr))"
  gap={8}
>
  {filteredProducts.map((product: any) => (
    <Box
      key={product.id}
      bg="linear-gradient(180deg, #0f172a, #020617)"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.100"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 20px 40px rgba(0,0,0,.4)",
      }}
      transition="0.3s"
    >
      <ProudactCard proudact={product} />
    </Box>
  ))}
</Grid>

    </>
  );
};

export default ProudactP;
