import { Box, SimpleGrid, Text, Flex, Spinner } from "@chakra-ui/react";
import { Users, Package, Layers } from "lucide-react";


import { useGetPrQuery } from "../../app/features/product/PrduactS";
import { useGetCQuery } from "../../app/features/product/CategoryS";
import { useGetUsersQuery } from "../../app/features/Auth/LoginS";

const HomeA = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: products = [], isLoading: prLoading } = useGetPrQuery();
  const { data: categories = [], isLoading: catLoading } = useGetCQuery();

  // فلترة المستخدمين (بدون admin)
  const normalUsers = users.filter(
    (user: any) => user.role?.type !== "admin"
  );

  const loading = usersLoading || prLoading || catLoading;

  const cards = [
    {
      title: "Users",
      value: normalUsers.length,
      icon: <Users size={28} />,
      color: "blue.600",
    },
    {
      title: "Products",
      value: products.length,
      icon: <Package size={28} />,
      color: "green.600",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <Layers size={28} />,
      color: "purple.600",
    },
  ];

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={6} fontWeight="bold" color="white">
        Dashboard
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {cards.map((card) => (
          <Flex
            key={card.title}
            bg="gray.800"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            justify="space-between"
            align="center"
          >
            <Box>
              <Text color="gray.400" fontSize="sm">
                {card.title}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                {card.value}
              </Text>
            </Box>

            <Flex
              bg={card.color}
              p={3}
              borderRadius="lg"
              color="white"
              align="center"
              justify="center"
            >
              {card.icon}
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomeA;
