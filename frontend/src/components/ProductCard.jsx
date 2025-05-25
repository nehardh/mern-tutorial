import { ModalCloseButton, useDisclosure, useToast } from '@chakra-ui/react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'
import { Modal, ModalContent, ModalHeader, ModalOverlay, ModalBody } from '@chakra-ui/react'
import { Input, VStack, Heading } from '@chakra-ui/react';
import { Button, ModalFooter } from '@chakra-ui/react'
import { useState } from 'react'


const ProductCard = ({product}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("gray.100", "gray.700"); 

    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success) {
            toast({
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }

    const {updateProduct} = useProductStore();
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                title: "Updated",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }

  return (
    <Box 
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    > 
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit="cover" />

        <Box p={4}>
            <Heading as='h3' size="md" mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontsize='xl' color={textColor} mb={4}>
                Rs. {product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/> } onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon/> } onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}/>
                            <Input placeholder='Product Price' name='price' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}/>
                            <Input placeholder='Product Image' name='image' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}/>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update Product
                        </Button>
                        <Button variant='ghost' onClick={onClose}> 
                            Cancel
                        </Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard