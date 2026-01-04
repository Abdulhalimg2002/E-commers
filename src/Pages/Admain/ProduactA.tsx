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
  Textarea,
 Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  useCreatePrMutation,
  useGetPrQuery,
  useUpdatePrMutation,
  useDeletePrMutation,
} from "../../app/features/product/PrduactS";
import { useUploadImageMutation } from "../../app/features/uploadApi";
import { useGetCQuery } from "../../app/features/product/CategoryS";
import Modal from "../../components/ui/Modal";
import { ProduactL } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { prodactSchema, prodactEditSchema } from "../../validation";
import InputErrorMessage from "../../components/ui/InputErrorMessage";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { IProduct } from "../../interface";

interface prodacts {
  title: string;
  description: string;
  price: number;
  thumbnail: any;
  category: { id: number };
  stock: number;
}

interface prodactsEdit {
  title: string;
  description: string;
  price: number;
  thumbnail?: FileList;
  category: { id: number };
  stock: number;
}

const ProduactA = () => {
  const { data: products = [] } = useGetPrQuery();
  const { data: categories = [] } = useGetCQuery();

  const [createPr] = useCreatePrMutation();
  const [updatePr] = useUpdatePrMutation();
  const [deletePr] = useDeletePrMutation();
  const [uploadImage] = useUploadImageMutation();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<prodacts>({
    resolver: yupResolver(prodactSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    control: controlEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
  } = useForm<prodactsEdit>({
    resolver: yupResolver(prodactEditSchema),
  });
 const onCloseAddModal = () => {
  reset();
  setSelectedProduct(null);
  setIsAddOpen(false);
};

 const onOpenAddModal = () => {
  reset({
    title: "",
    description: "",
    price: undefined,
    stock: undefined,
    category: { id: undefined as any },
    thumbnail: undefined,
  });
  setSelectedProduct(null);
  setIsAddOpen(true);
};

  const thumbnailFile = watch("thumbnail");
const editThumbnail = watchEdit("thumbnail");


  /* ================= ADD ================= */
  const onSubmitAdd: SubmitHandler<prodacts> = async (data) => {
    try {
      setLoading(true);
      let imageId;
      if (data.thumbnail?.length) {
        const fd = new FormData();
        fd.append("files", data.thumbnail[0]);
        const img = await uploadImage(fd).unwrap();
        imageId = img[0].id;
      }

      await createPr({
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        thumbnail: imageId ? { id: imageId } : undefined,
        category: { id: data.category.id },
      }).unwrap();

     
      setIsAddOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const openEdit = (p: IProduct) => {
    setSelectedProduct(p);
    resetEdit({
      title: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: { id: p.category?.id },
      thumbnail: undefined
    });
    setIsEditOpen(true);
  };
   const onCloseEditModal = () => {
  resetEdit();
  setSelectedProduct(null);
  setIsEditOpen(false);
};


  const onSubmitEdit: SubmitHandler<prodactsEdit> = async (data) => {
    try {
      setLoading(true);
      let imageId = selectedProduct?.thumbnail?.id;

      if (data.thumbnail?.length) {
        const fd = new FormData();
        fd.append("files", data.thumbnail[0]);
        const img = await uploadImage(fd).unwrap();
        imageId = img[0].id;
      }

      await updatePr({
  id: selectedProduct!.documentId,   // ✅ هنا التغيير المهم
  data: {
    title: data.title,
    description: data.description,
    price: data.price,
    stock: data.stock,
    category: { id: data.category.id },
    thumbnail: imageId
      ? { id: imageId }
      : selectedProduct?.thumbnail
      ? { id: selectedProduct.thumbnail.id }
      : undefined,
  },
});


      reset();
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      setLoading(true);
      await deletePr(selectedProduct.documentId).unwrap();
      setIsDeleteOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Products
          </Text>
          <Button onClick={onOpenAddModal} bg="blue.600" _hover={{ bg: "blue.500" }} color="white">
            <Plus size={16} /><Text ml={2}>Add Product</Text>
          </Button>
        </Flex>

        {/* Content */}
        {isMobile ? (
          <Stack gap={4}>
    {products.map((product) => (
      <Box
        key={product.id}
        bg="gray.800"
        p={4}
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="md"
      >
        {/* Top Section */}
        <Flex gap={4} align="center">
          <Image
            src={
              product.thumbnail?.url
                ? product.thumbnail.url
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
              {product.title}
            </Text>

            <Text fontSize="sm" color="gray.400">
              {product.category?.title || "No category"}
            </Text>

            <Flex mt={1} justify="space-between">
              <Text fontSize="sm" color="green.300">
                ${product.price}
              </Text>

              <Text
                fontSize="xs"
                color={product.stock > 0 ? "blue.300" : "red.300"}
              >
                Stock: {product.stock}
              </Text>
            </Flex>
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
  onClick={() => openEdit(product)}
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
    setSelectedProduct(product);
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
          <Box borderRadius="lg" overflowX="auto" bg="gray.800" border="1px solid" borderColor="whiteAlpha.200">
            <Table.Root size="md">
              <Table.Header>
                <Table.Row bg="gray.700">
                  <Table.ColumnHeader color="gray.200">ID</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.200">Name</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.200">Price</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.200">Category</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.200">Stock</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.200" textAlign="center">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.map((product) => (
                  <Table.Row key={product.id} bg="gray.700">
                    <Table.Cell color="gray.100">{product.id}</Table.Cell>
                    <Table.Cell color="gray.100">{product.title}</Table.Cell>
                    <Table.Cell color="gray.100">${product.price}</Table.Cell>
                    <Table.Cell color="gray.100">{product.category?.title}</Table.Cell>
                    <Table.Cell color="gray.100">{product.stock}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={2} justify="center">
                        <Button size="sm" bg="green.700" _hover={{ bg: "green.600" }} color="white" onClick={() => openEdit(product)}>
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" bg="red.700" _hover={{ bg: "red.600" }} color="white" onClick={() => { setSelectedProduct(product); setIsDeleteOpen(true); }}>
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
     <Modal isOpen={isAddOpen} closeModal={onCloseAddModal} title="Add a new product">
  <form onSubmit={handleSubmit(onSubmitAdd)}>
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={4}
    >
      {ProduactL.map(({ name, label, placeholder, type, validation }) => (
        <Field.Root key={name} w="100%">
          <Field.Label>{label}</Field.Label>

          {name === "description" ? (
            <Textarea placeholder={placeholder} {...register(name, validation)} />
          ) : name === "category" ? (
            <Controller
              name="category.id"
              control={control}
              render={({ field }) => (
                <Box
                  as="select"
                  {...field}
                  bg="gray.800"
                  color="white"
                  px="3"
                  py="2"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </Box>
              )}
            />
          ) : (
            <Input type={type} placeholder={placeholder} {...register(name, validation)} />
          )}

         {name === "category" ? (
  errors.category?.id?.message && (
    <InputErrorMessage msg={errors.category.id.message} />
  )
) : (
  errors[name]?.message && (
    <InputErrorMessage msg={errors[name]?.message as string} />
  )
)}
        </Field.Root>
      ))}
    </Box>

    {thumbnailFile?.length && (
      <Image
        src={URL.createObjectURL(thumbnailFile[0])}
        w={{ base: "70px", md: "90px" }}
        h={{ base: "70px", md: "90px" }}
        mt={4}
        objectFit="cover"
        borderRadius="10px"
      />
    )}

   <Box
  display="flex"
  gap={3}
  mt={6}
  flexDirection={{ base: "column", sm: "row" }}
>
      <Button   flex="1" w="100%" type="submit" bg="blue" color="white" loading={loading}>
        Done
      </Button>
      <Button   flex="1" w="100%" type="button" bg="red" color="white" onClick={onCloseAddModal}>
        Cancel
      </Button>
    </Box>
  </form>
</Modal>



      {/* EDIT MODAL */}
     <Modal isOpen={isEditOpen} closeModal={onCloseEditModal} title="Update Product">
  <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={4}
    >
      {ProduactL.map(({ name, label, placeholder, type, validation }) => (
        <Field.Root key={name} w="100%">
          <Field.Label>{label}</Field.Label>

          {name === "description" ? (
            <Textarea placeholder={placeholder} {...registerEdit(name, validation)} />
          ) : name === "category" ? (
            <Controller
              name="category.id"
              control={controlEdit}
              render={({ field }) => (
                <Box
                  as="select"
                  {...field}
                  bg="gray.800"
                  color="white"
                  px="3"
                  py="2"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </Box>
              )}
            />
          ) : (
            <Input type={type} placeholder={placeholder} {...registerEdit(name, validation)} />
          )}

         {name === "category" ? (
  errorsEdit.category?.id?.message && (
    <InputErrorMessage msg={errorsEdit.category.id.message } />
  )
) : (
  errorsEdit[name]?.message && (
    <InputErrorMessage msg={errorsEdit[name]?.message as string} />
  )
)}

        </Field.Root>
      ))}
    </Box>

    {!editThumbnail?.length && selectedProduct?.thumbnail?.url && (
      <Box mt={4}>
        <Text mb={1} color="whiteAlpha.700">Current Image:</Text>
        <Image
          src={selectedProduct.thumbnail.url}
          w={{ base: "70px", md: "90px" }}
          h={{ base: "70px", md: "90px" }}
          objectFit="cover"
          borderRadius="10px"
        />
      </Box>
    )}

    {editThumbnail?.length && (
      <Image
        src={URL.createObjectURL(editThumbnail[0])}
        w={{ base: "70px", md: "90px" }}
        h={{ base: "70px", md: "90px" }}
        mt={4}
        objectFit="cover"
        borderRadius="10px"
      />
    )}

   <Box
  display="flex"
  gap={3}
  mt={6}
  flexDirection={{ base: "column", sm: "row" }}
>
      <Button  flex="1" w="100%" type="submit" bg="blue" color="white" loading={loading}>
        Update
      </Button>
      <Button  flex="1" w="100%" type="button" bg="red" color="white" onClick={onCloseEditModal}>
        Cancel
      </Button>
    </Box>
  </form>
</Modal>



      {/* DELETE MODAL */}
     <Modal isOpen={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)} title="Delete Product">
  <VStack gap={4} textAlign="center" px={{ base: 2, md: 4 }}>
    <Text color="white">
      Are you sure <b>{selectedProduct?.title}</b>?
    </Text>

    <HStack gap={3} w="100%" justify="center" flexWrap="wrap">
      <Button
        bg="red.700"
        _hover={{ bg: "red.600" }}
        color="white"
        onClick={confirmDelete}
        loading={loading}
        w={{ base: "100%", sm: "auto" }}
      >
        Delete
      </Button>

      <Button
        bg="gray.700"
        _hover={{ bg: "gray.600" }}
        color="white"
        onClick={() => setIsDeleteOpen(false)}
        w={{ base: "100%", sm: "auto" }}
      >
        Cancel
      </Button>
    </HStack>
  </VStack>
</Modal>

    </>
  );
};

export default ProduactA;