import { Routes, Route } from 'react-router-dom';
import { Box, Container, useColorModeValue } from "@chakra-ui/react";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';

function App() {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      minH="100vh"
      bg={bg}
      borderRadius="lg"
      transition="background-color 0.3s ease"
      // Make the entire app background smooth transition on color mode toggle
    >
      <Navbar
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="sm"
        bg={useColorModeValue("white", "gray.800")}
      />
      
      <Container as="main" maxW="container.lg" pt={8} pb={12}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
