import {  Badge, Box, Button, Card,HStack,Image, Stack, Text } from "@chakra-ui/react";

import {   Link as RouterLink } from "react-router-dom";
import type { IProduct } from "../interface";

interface IPropes{
proudact:IProduct

}
const ProudactCard=({proudact}:IPropes)=>{
 
 
    return(
     <Card.Root
  bg="linear-gradient(180deg, #111827, #1f2937)"
  borderRadius="2xl"
  overflow="hidden"
  border="1px solid rgba(255,255,255,0.08)"
  position="relative"
  _hover={{
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    borderColor: "teal.400",
  }}
  transition="0.35s ease"
>
  {/* IMAGE */}
  <Box
    bg="radial-gradient(circle at top, #374151, #111827)"
    p={4}
    display="flex"
    justifyContent="center"
    alignItems="center"
    h="230px"
  >
    <Image
      src={
        proudact.thumbnail?.url
          ? proudact.thumbnail.url
          : "/no-image.png"
      }
      alt={proudact.title}
      maxH="180px"
      maxW="100%"
      objectFit="contain"
      transition="0.3s"
      _groupHover={{ transform: "scale(1.1)" }}
    />
  </Box>

  {/* CONTENT */}
  <Stack p={5} gap={3}>
    <Text
      color="white"
      fontWeight="700"
      fontSize="lg"
      lineClamp={1}
    >
      {proudact.title}
    </Text>

    <Text
      color="gray.400"
      fontSize="sm"
      lineClamp={2}
      minH="38px"
    >
      {proudact.description}
    </Text>

    {/* Badges */}
    <HStack mt={2} gap={2} flexWrap="wrap">
      <Badge
        bg="rgba(20,184,166,0.15)"
        color="teal.300"
        border="1px solid rgba(20,184,166,0.4)"
        px={3}
        py={1}
        borderRadius="full"
      >
        {proudact.category?.title || "No Category"}
      </Badge>

      <Badge
        bg="rgba(16,185,129,0.15)"
        color="green.300"
        border="1px solid rgba(16,185,129,0.4)"
        px={3}
        py={1}
        borderRadius="full"
      >
        ${proudact.price}
      </Badge>
    </HStack>

    {/* Button */}
    <RouterLink to={`/products/${proudact.documentId}`}>
      <Button
        mt={4}
        w="100%"
        bg="linear-gradient(90deg, #14b8a6, #22c55e)"
        color="white"
        fontWeight="600"
        _hover={{
          bg: "linear-gradient(90deg, #0d9488, #16a34a)",
          transform: "translateY(-2px)",
        }}
      >
        View Details
      </Button>
    </RouterLink>
  </Stack>
</Card.Root>



  )
    
}
export default ProudactCard;