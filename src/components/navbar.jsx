import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const isAddPage = location.pathname === "/add";

  const navBg = useColorModeValue("#e23744", "#2c2c2c");
  const btnBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");
  const btnHover = useColorModeValue("whiteAlpha.800", "whiteAlpha.300");
  const btnText = useColorModeValue("black", "white");

  return (
    <Flex
      as="nav"
      bg={navBg}
      color="white"
      py={4}
      px={{ base: 4, md: 10 }}
      align="center"
      justify="space-between"
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
      fontFamily="'Poppins', sans-serif"
    >
      <Heading
        as={Link}
        to="/"
        size="lg"
        fontWeight="700"
        letterSpacing="wide"
        _hover={{ textDecoration: "none" }}
      >
        Eat Later 🍽️
      </Heading>

      <Spacer />

      <Flex align="center" gap={3}>
        <Button
          as={Link}
          to={isAddPage ? "/" : "/add"}
          bg={btnBg}
          color={btnText}
          _hover={{ bg: btnHover }}
          size="sm"
        >
          {isAddPage ? "Home" : "Add Restaurant"}
        </Button>

        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Toggle Theme"
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.300" }}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
