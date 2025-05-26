import { useState } from 'react'
import {
  Container, VStack, Heading, Box, useColorModeValue,
  Input, Button, useToast, FormControl, FormLabel
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom' // <-- Step 1: Import

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { createProduct } = useProductStore();
  const navigate = useNavigate(); // <-- Step 2: Initialize

  const handleAddProduct = async () => {
    setLoading(true);
    const { success, message } = await createProduct(newProduct);
    setLoading(false);
    toast({
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
      duration: 3000,
      position: "top"
    });
    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
      navigate("/"); // <-- Step 3: Redirect to home
    }
  }

  const bgBox = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" color="blue.500">
          Create New Product
        </Heading>
        <Box
          w="full"
          bg={bgBox}
          p={8}
          rounded="2xl"
          shadow="lg"
          borderWidth={1}
        >
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="e.g., Apple iPhone 14"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price ($)</FormLabel>
              <Input
                placeholder="e.g., 999"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="https://example.com/product.jpg"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              w="full"
              size="lg"
              isLoading={loading}
              loadingText="Adding..."
              onClick={handleAddProduct}
              rounded="xl"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
