// src/components/AddRestaurantForm.jsx
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
  Tag,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FiPlus, FiTag } from "react-icons/fi";

const AddRestaurantForm = () => {
  const [placeId, setPlaceId] = useState("");
  const [location, setLocation] = useState("");
  const [foodTypeInput, setFoodTypeInput] = useState("");
  const [foodTypes, setFoodTypes] = useState([]);

  const toast = useToast();

  const handleAddFoodType = () => {
    if (foodTypeInput.trim() && !foodTypes.includes(foodTypeInput.trim())) {
      setFoodTypes([...foodTypes, foodTypeInput.trim()]);
      setFoodTypeInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add`, {
        google_link: placeId,
        tags: {
          location,
          food_type: foodTypes,
        },
      });
      toast({
        title: "Restaurant added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPlaceId("");
      setLocation("");
      setFoodTypes([]);
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to add restaurant",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={8}
      borderRadius="2xl"
      boxShadow="xl"
      bg="white"
      _dark={{ bg: "gray.800" }}
      fontFamily="'Poppins', sans-serif"
    >
      <Heading
        size="lg"
        mb={6}
        color="#e23744"
        textAlign="center"
        fontWeight="bold"
      >
        Add a Restaurant
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Google Place ID / URL</FormLabel>
            <Input
              placeholder="https://goo.gl/maps/..."
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="e.g. Pune"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Food Type</FormLabel>
            <HStack>
              <Input
                placeholder="e.g. Pizza"
                value={foodTypeInput}
                onChange={(e) => setFoodTypeInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddFoodType())
                }
              />
              <Button
                onClick={handleAddFoodType}
                leftIcon={<Icon as={FiPlus} />}
                colorScheme="red"
              >
                Add
              </Button>
            </HStack>
            <HStack mt={2} wrap="wrap">
              {foodTypes.map((type) => (
                <Tag
                  key={type}
                  colorScheme="red"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  <Icon as={FiTag} mr={1} />
                  {type}
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="red"
            size="lg"
            fontWeight="semibold"
            mt={4}
          >
            Save Restaurant
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddRestaurantForm;
