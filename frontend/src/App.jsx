import {Routes, Route} from 'react-router-dom'
import {Box} from "@chakra-ui/react"

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import { useColorModeValue } from '@chakra-ui/react'

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")} borderRadius="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
      </Routes>
    </Box>
  )
}

export default App
