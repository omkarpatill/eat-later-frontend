// src/components/Layout.jsx
import { Box, Container } from '@chakra-ui/react';
import Navbar from './navbar';
import Footer from './Footer'; // Import the Footer component

const Layout = ({ children }) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
      fontFamily="'Poppins', sans-serif"
    >
      <Navbar />
      
      <Container maxW="6xl" py={6} flex="1">
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

export default Layout;
