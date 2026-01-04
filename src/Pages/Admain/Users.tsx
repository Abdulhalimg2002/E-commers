import { Box,  Flex, Stack, Table, useBreakpointValue,Text } from "@chakra-ui/react";

import { useGetUsersQuery } from "../../app/features/Auth/LoginS";

const Users=()=>{
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    const { data: users = [] } = useGetUsersQuery();
    const normalUsers = users.filter(
  (user) => user.role?.type !== "admin"
);
    return(
         <Box p={{ base: 3, md: 6 }} minH="100vh">
                {/* Header */}
                <Flex
                  justify="space-between"
                  align={{ base: "start", sm: "center" }}
                  direction={{ base: "column", sm: "row" }}
                  gap={4}
                  mb={6}
                >
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    Users
                  </Text>
                 
                </Flex>
        
                {/* Content */}
                {isMobile ? (
                   <Stack gap={4}>
    {normalUsers.map((u) => (
      <Box
        key={u.id}
        bg="gray.800"
        p={4}
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="md"
      >
        <Text fontSize="md" color="white" fontWeight="bold" lineClamp={1}>
          {u.username}
        </Text>

        <Text fontSize="sm" color="gray.400">
          {u.email}
        </Text>

        <Flex mt={2} justify="space-between">
          <Text fontSize="xs" color="gray.500">
            User ID
          </Text>
          <Text fontSize="xs" color="blue.300">
            {u.id}
          </Text>
        </Flex>
      </Box>
    ))}
  </Stack>
                ) : (
                 <Box
  borderRadius="lg"
  overflowX="auto"
  bg="gray.800"
  border="1px solid"
  borderColor="whiteAlpha.200"
>
  <Table.Root size="md">
    <Table.Header>
      <Table.Row bg="gray.700">
        <Table.ColumnHeader color="gray.200">ID</Table.ColumnHeader>
        <Table.ColumnHeader color="gray.200">Username</Table.ColumnHeader>
        <Table.ColumnHeader color="gray.200">Email</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {normalUsers.map((u) => (
        <Table.Row key={u.id} bg="gray.700">
          <Table.Cell color="gray.100">{u.id}</Table.Cell>
          <Table.Cell color="gray.100">{u.username}</Table.Cell>
          <Table.Cell color="gray.100">{u.email}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
</Box>
                )}
              </Box>
    )
}
export default Users;