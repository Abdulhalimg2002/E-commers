import {
  Box,
  Flex,
  Text,
  Stack,
  Spinner,
  Button,
  Input,
 
  Avatar,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  useGetMeQuery,
  useUpdateMeMutation,
} from "../app/features/Auth/LoginS";


import { Field } from "@chakra-ui/react";
import Modal from "../components/ui/Modal";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaU } from "../validation";
import { IupdateInput } from "../data";
import { useState } from "react";


type FormData = {
  username: string;
  email: string;
};

const Profile = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const [updateMe, ] = useUpdateMeMutation();
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [isUpdating, setIsUpdating] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
      resolver: yupResolver(loginSchemaU),
    });
    const onCloseEditModal = () => {
    reset();
    setIsEditModalOpen(false);
  };

  const onOpenEditModal = () => {
  reset({
    username: user?.username || "",
    email: user?.email || "",
  });
  setIsEditModalOpen(true);
};


  if (isLoading)
    return (
      <Flex h="70vh" align="center" justify="center">
        <Spinner size="xl" color="teal.400" />
      </Flex>
    );
    

const onSubmit = async (data: FormData) => {
  try {
    setIsUpdating(true);

    await updateMe({
      id: user!.id,
      data,
    }).unwrap(); // 🔥 مهم جدًا

    onCloseEditModal(); // اغلق المودال
  } catch (error: any) {
    console.error("Update failed", error);

  } finally {
    setIsUpdating(false); // 🔥 دائما ينفذ
  }
};


  return (
    <>
      <Flex justify="center" mt={12} px={4}>
        <Box
          bg="#020617"
          border="1px solid rgba(255,255,255,0.08)"
          borderRadius="2xl"
          w="100%"
          maxW="420px"
          p={8}
          boxShadow="0 20px 40px rgba(0,0,0,0.6)"
          textAlign="center"
        >
          {/* Avatar */}
          <Avatar.Root size="2xl" mb={4}>
            <Avatar.Fallback
              
              
              fontSize="3xl"
              fontWeight="bold"
            >
              {user?.username?.charAt(0)}
            </Avatar.Fallback>
          </Avatar.Root>

          <Text fontSize="2xl" fontWeight="bold" color="white">
            {user?.username}
          </Text>

          <Text color="gray.400" fontSize="sm" mt={1}>
            {user?.email}
          </Text>

          <Box h="1px" bg="whiteAlpha.200" my={6} />

          <Stack gap={4} textAlign="left">
            <Box>
              <Text fontSize="xs" color="gray.500">
                Username
              </Text>
              <Text color="white">{user?.username}</Text>
            </Box>

            <Box>
              <Text fontSize="xs" color="gray.500">
                Email
              </Text>
              <Text color="white">{user?.email}</Text>
            </Box>
          </Stack>

          <Button
            mt={6}
            w="100%"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            onClick={onOpenEditModal}
          >
            Edit Profile
          </Button>
        </Box>
      </Flex>

      {/* MODAL */}
      <Modal   isOpen={isEditModalOpen}
        closeModal={onCloseEditModal} title="Update Profile">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack  gap={4}>
            {IupdateInput.map( ({ name, placeholder, type, validation }, idx)=>(
 <Field.Root key={idx} color={"white"}>
              <Field.Label>{name}</Field.Label>
              <Input
               type={type}
            placeholder={placeholder}
            {...register(name, validation)}
              />
               {errors[name] && (
            <InputErrorMessage msg={errors[name]?.message} />
          )}
              
            </Field.Root>

            ))}
           
            
          </Stack>

          <Box
            display="flex"
            gap={3}
            mt={6}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Button
              flex="1"
              type="submit"
              bg="blue"
              color="white"
              loading={isUpdating}
            >
              Update
            </Button>

            <Button
              flex="1"
              type="button"
              bg="red"
              color="white"
             onClick={onCloseEditModal}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default Profile;
