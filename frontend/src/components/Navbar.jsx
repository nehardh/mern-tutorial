import React from 'react';
import {
  Container,
  Flex,
  Text,
  HStack,
  IconButton,
  useColorMode,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toggleIcon = useColorModeValue(<IoMoon />, <LuSun />);
  const toggleLabel = useColorModeValue("Dark Mode", "Light Mode");

  return (
    <Container maxW="1140px" px={4} py={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: 'column', sm: 'row' }}
        gap={{ base: 2, sm: 0 }}
      >
        <Text
          fontSize={{ base: 'xl', sm: '2xl' }}
          fontWeight="bold"
          textTransform="uppercase"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          letterSpacing="wide"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={3}>
          <Tooltip label="Create Product" hasArrow>
            <Link to="/create">
              <IconButton
                icon={<PlusSquareIcon fontSize="20px" />}
                aria-label="Create Product"
                variant="outline"
                colorScheme="blue"
              />
            </Link>
          </Tooltip>

          <Tooltip label={toggleLabel} hasArrow>
            <IconButton
              icon={toggleIcon}
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              variant="outline"
              colorScheme="blue"
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
