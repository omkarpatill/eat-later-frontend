// src/components/Layout.jsx
import { Box, Container } from '@chakra-ui/react';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
      fontFamily="'Poppins', sans-serif"
    >
      <Navbar />
      <Container maxW="6xl" py={6}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
