import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Stack,
  VStack,
  HStack,
  Field,
  Input,
  Image,
 
  useBreakpointValue,
} from "@chakra-ui/react";

import { Plus, Pencil, Trash2 } from "lucide-react";

import { useUploadImageMutation } from "../../app/features/uploadApi";
import { useCreateCMutation, useDeleteCMutation, useGetCQuery, useUpdateCMutation } from "../../app/features/product/CategoryS";
import Modal from "../../components/ui/Modal";

import { yupResolver } from "@hookform/resolvers/yup";
import {  CategoryS, CategoryUS, type categoryEdit } from "../../validation";
import InputErrorMessage from "../../components/ui/InputErrorMessage";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { ICategory } from "../../interface"
import { CategoryL } from "../../data";
interface category {
  title: string;
 iconC:any
}


const Category=()=>{
    
      const { data: categories = [] } = useGetCQuery();
    
      const [ createC] =  useCreateCMutation();
      const [updateC] =  useUpdateCMutation();
      const [deleteC] = useDeleteCMutation();
      const [uploadImage] = useUploadImageMutation();
    
      const isMobile = useBreakpointValue({ base: true, md: false });
    
      const [isAddOpen, setIsAddOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [selectedicon, setSelectedicon] = useState<ICategory | null>(null);
      const [loading, setLoading] = useState(false);
    
      const {
        register,
        handleSubmit,
        reset,
       
        watch,
        formState: { errors },
      } = useForm<category>({
        resolver: yupResolver(CategoryS),
      });
    
const {
  register: registerEdit,
  handleSubmit: handleSubmitEdit,
  reset: resetEdit,
  watch: watchEdit,
  formState: { errors: errorsEdit },
} = useForm({
  resolver: yupResolver(CategoryUS),
});



     const onCloseAddModal = () => {
      reset();
     setSelectedicon(null);
      setIsAddOpen(false);
    };
    
     const onOpenAddModal = () => {
      reset({
        title: "",
        iconC:undefined
      });
     setSelectedicon(null);
      setIsAddOpen(true);
    };
    
     const thumbnailFile = watch("iconC");
const editThumbnail = watchEdit("iconC");
    
    
      /* ================= ADD ================= */
      const onSubmitAdd: SubmitHandler<category> = async (data) => {
        try {
          setLoading(true);
          let imageId;
          if (data.iconC?.length) {
            const fd = new FormData();
            fd.append("files", data.iconC[0]);
            const img = await uploadImage(fd).unwrap();
            imageId = img[0].id;
          }
    
          await createC({
            title: data.title,
           
           iconC: imageId ? { id: imageId } : undefined,
    
          }).unwrap();
    
         
          setIsAddOpen(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      /* ================= EDIT ================= */
      const openEdit = (c:ICategory) => {
        setSelectedicon(c);
        resetEdit({
          title: c.title,
          iconC: undefined
        });
        setIsEditOpen(true);
      };
       const onCloseEditModal = () => {
      resetEdit();
      setSelectedicon(null);
      setIsEditOpen(false);
    };
    
    
     const onSubmitEdit: SubmitHandler<categoryEdit> = async (data) => {
  try {
    setLoading(true);

    let imageId = selectedicon?.iconC?.id;

    if (data.iconC?.length) {
      const fd = new FormData();
      fd.append("files", data.iconC[0]);
      const img = await uploadImage(fd).unwrap();
      imageId = img[0].id;
    }

    // 🟢 اجلب كل المنتجات المرتبطة بهذا التصنيف
    const proudactsIds = selectedicon?.proudacts?.map((p) => p.id);

    await updateC({
      id: selectedicon!.documentId,
      data: {
        title: data.title,

        iconC: imageId ? { id: imageId } : undefined,

        // 🔥 هذا هو الحل
        proudacts: proudactsIds?.length
          ? proudactsIds.map((id) => ({ id }))
          : [],
      },
    });

    setIsEditOpen(false);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    
      /* ================= DELETE ================= */
      const confirmDelete = async () => {
        if (!selectedicon) return;
        try {
          setLoading(true);
          await deleteC(selectedicon.documentId).unwrap();
          setIsDeleteOpen(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    return(
         <>
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
                    Category
                  </Text>
                  <Button onClick={onOpenAddModal} bg="blue.600" _hover={{ bg: "blue.500" }} color="white">
                    <Plus size={16} /><Text ml={2}>Add Category </Text>
                  </Button>
                </Flex>
        
                {/* Content */}
                {isMobile ? (
                   <Stack gap={4}>
    {categories.map((category) => (
      <Box
        key={category.id}
        bg="gray.800"
        p={4}
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="md"
      >
        {/* Top */}
        <Flex gap={4} align="center">
          <Image
            src={
              category.iconC?.url
                ? category.iconC.url
                : "/no-image.png"
            }
            w="70px"
            h="70px"
            minW="70px"
            objectFit="cover"
            borderRadius="lg"
          />

          <Box flex="1">
            <Text fontSize="md" color="white" fontWeight="bold" lineClamp={1}>
              {category.title}
            </Text>

            <Text fontSize="sm" color="gray.400">
              Category ID: {category.id}
            </Text>
          </Box>
        </Flex>

        {/* Buttons */}
        <Flex mt={4} gap={3}>
          <Button
            size="sm"
            bg="green.600"
            _hover={{ bg: "green.500" }}
            color="white"
            flex="1"
            onClick={() => openEdit(category)}
          >
            <HStack gap={2}>
              <Pencil size={14} />
              <Text>Edit</Text>
            </HStack>
          </Button>

          <Button
            size="sm"
            bg="red.600"
            _hover={{ bg: "red.500" }}
            color="white"
            flex="1"
            onClick={() => {
              setSelectedicon(category);
              setIsDeleteOpen(true);
            }}
          >
            <HStack gap={2}>
              <Trash2 size={14} />
              <Text>Delete</Text>
            </HStack>
          </Button>
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
        <Table.ColumnHeader color="gray.200">Title</Table.ColumnHeader>
        <Table.ColumnHeader color="gray.200">Icon</Table.ColumnHeader>
        <Table.ColumnHeader color="gray.200" textAlign="center">
          Actions
        </Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {categories.map((category) => (
        <Table.Row key={category.id} bg="gray.700">
          <Table.Cell color="gray.100">{category.id}</Table.Cell>
          <Table.Cell color="gray.100">{category.title}</Table.Cell>
          <Table.Cell>
            <Image
              src={category.iconC.url}
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="8px"
            />
          </Table.Cell>

          <Table.Cell>
            <Flex gap={2} justify="center">
              <Button
                size="sm"
                bg="green.700"
                _hover={{ bg: "green.600" }}
                color="white"
                onClick={() => openEdit(category)}
              >
                <Pencil size={14} />
              </Button>

              <Button
                size="sm"
                bg="red.700"
                _hover={{ bg: "red.600" }}
                color="white"
                onClick={() => {
                  setSelectedicon(category);
                  setIsDeleteOpen(true);
                }}
              >
                <Trash2 size={14} />
              </Button>
            </Flex>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
</Box>
                )}
              </Box>
        
              {/* ADD MODAL */}
              <Modal isOpen={isAddOpen} closeModal={() => setIsAddOpen(false)} title="Add a new Category">
                <form onSubmit={handleSubmit(onSubmitAdd)}>
                    <VStack gap={3} align="stretch">
            {CategoryL.map(({ name, label, placeholder, type, validation }) => (
              <Field.Root key={name}>
                <Field.Label>{label}</Field.Label>
             <Input type={type} placeholder={placeholder} {...register(name, validation)} />
                {errors[name]?.message && <InputErrorMessage msg={errors[name]?.message as string} />}
              </Field.Root>
            ))}
            {thumbnailFile?.length && (
              <img src={URL.createObjectURL(thumbnailFile[0])} alt="Preview" style={{ width: "100px", borderRadius: "8px" }} />
            )}
            <HStack gap={3} mt={4}>
              <Button type="submit" bg="blue" color="white" loading={loading}>Done</Button>
              <Button type="button" bg="red" color="white" onClick={onCloseAddModal}>Cancel</Button>
            </HStack>
          </VStack>
                </form>
              </Modal>
        
              {/* EDIT MODAL */}
              <Modal isOpen={isEditOpen} closeModal={() => setIsEditOpen(false)} title="Update Product">
                <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <VStack gap={3} align="stretch">
            {CategoryL.map(({ name, label, placeholder, type, validation }) => (
              <Field.Root key={name}>
                <Field.Label>{label}</Field.Label>
              <Input type={type} placeholder={placeholder} {...registerEdit(name, validation)} />
                {errorsEdit[name]?.message && <InputErrorMessage msg={errorsEdit[name]?.message as string} />}
              </Field.Root>
            ))}
           {!editThumbnail?.length && selectedicon?.iconC?.url && (
  <Box>
    <Text mb={1} color="whiteAlpha.700">Current Image:</Text>
    <img src={selectedicon.iconC.url}  style={{ width: "100px", borderRadius: "8px", objectFit: "cover" }} />
  </Box>
)}

{editThumbnail?.length && (
  <img
    src={URL.createObjectURL(editThumbnail[0])}
    alt="Preview"
    style={{ width: "100px", borderRadius: "8px" }}
  />
)}

            <HStack gap={3} mt={4}>
              <Button type="submit" bg="blue" color="white" loading={loading}>Update</Button>
              <Button type="button" bg="red" color="white" onClick={onCloseEditModal}>Cancel</Button>
            </HStack>
          </VStack>
                </form>
              </Modal>
        
              {/* DELETE MODAL */}
              <Modal isOpen={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)} title="Delete Product">
                <VStack gap={4}>
                  <Text color="white">Are you sure <b>{selectedicon?.title}</b>?</Text>
                  <HStack gap={3}>
                    <Button bg="red.700" _hover={{ bg: "red.600" }} color="white" onClick={confirmDelete} loading={loading}>Delete</Button>
                    <Button bg="gray.700" _hover={{ bg: "gray.600" }} color="white" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                  </HStack>
                </VStack>
              </Modal>
            </>
    )
}
export default Category;