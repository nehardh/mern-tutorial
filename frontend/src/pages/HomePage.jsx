import React, { useEffect, useState } from 'react';
import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Spinner,
  Box,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fetchProducts]);

  const noProductsColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Available Products
        </Text>

        {loading && (
          <Box textAlign="center" py={20}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Box>
        )}

        {error && (
          <Text color="red.500" fontWeight="bold" textAlign="center">
            {error}
          </Text>
        )}

        {!loading && !error && products.length > 0 && (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}

        {!loading && !error && products.length === 0 && (
          <Box textAlign="center" py={10} color={noProductsColor}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              No products found.
            </Text>
            <ChakraLink
              as={Link}
              to="/create"
              fontSize="lg"
              color="blue.500"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              Create a product
            </ChakraLink>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
