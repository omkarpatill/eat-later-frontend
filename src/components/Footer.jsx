// src/components/Footer.jsx
import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box as="footer" py={4} textAlign="center" bg="gray.100" _dark={{ bg: "gray.900" }}>
    <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
      © 2025 Omkar. All rights reserved.
    </Text>
  </Box>
);

export default Footer;
