import React, { useState, useRef } from 'react';
import {
  Box,
  Image,
  Text,
  HStack,
  IconButton,
  Heading,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  VStack,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('gray.100', 'gray.700');

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  // Modal control for edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  // Confirmation dialog for delete
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update handlers
  const handleUpdateProduct = async (pid, updatedProduct) => {
    // Simple validation
    if (!updatedProduct.name.trim() || !updatedProduct.price) {
      toast({
        title: 'Validation Error',
        description: 'Name and Price are required fields.',
        status: 'warning',
        isClosable: true,
      });
      return;
    }

    setIsUpdating(true);
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsUpdating(false);

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Updated',
        description: message,
        status: 'success',
        isClosable: true,
      });
      onClose();
    }
  };

  // Delete handlers
  const handleDeleteProduct = async (pid) => {
    setIsDeleting(true);
    const { success, message } = await deleteProduct(pid);
    setIsDeleting(false);

    if (!success) {
      toast({
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        description: message,
        status: 'success',
        isClosable: true,
      });
    }
    onDeleteClose();
  };

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        bg={bg}
      >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>

          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            Rs. {product.price}
          </Text>

          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={() => {
                setUpdatedProduct(product);
                onOpen();
              }}
              colorScheme="black"
              aria-label="Edit product"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={onDeleteOpen}
              colorScheme="black"
              aria-label="Delete product"
            />
          </HStack>
        </Box>
      </Box>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                ref={initialRef}
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Product Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              isLoading={isUpdating}
              loadingText="Updating"
            >
              Update Product
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to delete this product? This action cannot be undone.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteProduct(product._id)}
                ml={3}
                isLoading={isDeleting}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
