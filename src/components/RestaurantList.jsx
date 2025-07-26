import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Tag,
  Button,
  Input,
  useToast,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Collapse,
  IconButton,
  chakra,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash, FiMapPin, FiInfo, FiRefreshCw } from 'react-icons/fi';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import TagFilter from './TagFilter';
import RatingFilter from './RatingFilter';

import { motion, AnimatePresence } from 'framer-motion';
const MotionBox = motion(chakra.div);

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editLocation, setEditLocation] = useState('');
  const [editFoodTypes, setEditFoodTypes] = useState('');
  const [editRating, setEditRating] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [error, setError] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const toast = useToast();

  const cardBgDefault = useColorModeValue('white', 'gray.700');
  const cardBgRated = useColorModeValue('#fff0f0', 'pink.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const zomatoRed = '#e23744';

  // Load from storage first
  useEffect(() => {
    const cached = localStorage.getItem('restaurants');
    if (cached) {
      setRestaurants(JSON.parse(cached));
    } else {
      fetchRestaurants();
    }
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants`);
      setRestaurants(res.data);
      localStorage.setItem('restaurants', JSON.stringify(res.data));
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants. Please check backend or CORS.');
    }
  };

  const refreshData = () => {
    fetchRestaurants();
    toast({ title: 'Data refreshed', status: 'success', duration: 2000, isClosable: true });
  };

  const getAllTags = () => {
    const tags = new Set();
    restaurants.forEach((r) => {
      if (r.tags?.food_type) r.tags.food_type.forEach((t) => tags.add(t));
      if (r.tags?.location) tags.add(r.tags.location);
    });
    return Array.from(tags);
  };

  const handleDelete = async (placeId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/restaurant/${placeId}`);
      toast({ title: 'Deleted', status: 'info', duration: 3000, isClosable: true });
      fetchRestaurants(); // refresh list
    } catch (err) {
      toast({ title: 'Delete failed', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const filteredRestaurants = restaurants.filter((r) => {
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) =>
        r.tags?.food_type?.includes(tag) || r.tags?.location === tag
      );
    const ratingMatch =
      selectedRating === '' || (r.my_rating && r.my_rating.toString() === selectedRating);
    return tagMatch && ratingMatch;
  });

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedRating('');
  };

  const handleEdit = (r) => {
    setEditingId(r.google_link);
    setEditLocation(r.tags.location || '');
    setEditFoodTypes(r.tags.food_type.join(', '));
    setEditRating(r.my_rating?.toString() || '');
  };

  const handleSave = async (placeId) => {
    const payload = {
      location: editLocation,
      food_type: editFoodTypes.split(',').map((t) => t.trim()).filter(Boolean),
      my_rating: editRating ? parseInt(editRating) : null,
    };
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/restaurant/${placeId}`, payload);
      toast({ title: 'Updated', status: 'success', duration: 3000, isClosable: true });
      setEditingId(null);
      fetchRestaurants();
    } catch {
      toast({ title: 'Failed to update', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditLocation('');
    setEditFoodTypes('');
    setEditRating('');
  };

  const handleToggleInfo = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  if (error) {
    return <Heading size="md" color="red.500" mt={8}>{error}</Heading>;
  }

  return (
    <Box mt={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading color={zomatoRed}>Saved Restaurants</Heading>
        <Button
          leftIcon={<FiRefreshCw />}
          size="sm"
          colorScheme="gray"
          onClick={refreshData}
        >
          Refresh
        </Button>
      </Flex>

      {/* Filters */}
      <Box mb={6}>
        <TagFilter
          allTags={getAllTags()}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <HStack mt={2} spacing={4}>
          <RatingFilter
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
          <Button size="sm" onClick={clearFilters}>Clear Filters</Button>
        </HStack>
      </Box>

      {/* Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        <AnimatePresence>
          {filteredRestaurants.map((r) => {
            const isEditing = editingId === r.google_link;
            const cardBg = r.my_rating ? cardBgRated : cardBgDefault;

            return (
              <MotionBox
                key={r.google_link}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Flex
                  direction="column"
                  justify="space-between"
                  bg={cardBg}
                  p={4}
                  rounded="lg"
                  shadow="md"
                  border="1px"
                  borderColor={borderColor}
                  minH="300px"
                  transition="all 0.3s"
                  _hover={{ shadow: 'lg' }}
                >
                  <Box>
                    <Heading size="md" mb={1}>{r.name}</Heading>
                    <Text fontSize="sm" color="gray.500">⭐ {r.rating || 'N/A'}</Text>
                    {r.my_rating && (
                      <Text fontSize="sm" color={zomatoRed} fontWeight="semibold">
                        My Rating: {r.my_rating} ⭐
                      </Text>
                    )}
                  </Box>

                  <VStack align="start" spacing={2} mt={4} flex={1}>
                    {isEditing ? (
                      <>
                        <Input size="sm" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Location" />
                        <Input size="sm" value={editFoodTypes} onChange={(e) => setEditFoodTypes(e.target.value)} placeholder="Food types (comma-separated)" />
                        <Input size="sm" type="number" min={1} max={5} value={editRating} onChange={(e) => setEditRating(e.target.value)} placeholder="My Rating (1-5)" />
                      </>
                    ) : (
                      <>
                        {r.tags.location && <Tag colorScheme="pink">{r.tags.location}</Tag>}
                        {r.tags.food_type?.map((type, i) => (
                          <Tag key={i} colorScheme="orange">{type}</Tag>
                        ))}
                      </>
                    )}
                  </VStack>

                  <Collapse in={expandedCard === r.google_link}>
                    <Box mt={3}>
                      <Text fontSize="sm" color="gray.600">{r.address}</Text>
                    </Box>
                  </Collapse>

                  <Flex mt={4} justify="flex-start" wrap="wrap" gap={2}>
                    <IconButton
                      size="sm"
                      icon={expandedCard === r.google_link ? <ChevronUpIcon /> : <FiInfo />}
                      onClick={() => handleToggleInfo(r.google_link)}
                      aria-label="Toggle Info"
                      variant="outline"
                      colorScheme="gray"
                    />
                    <ChakraLink
                      href={`https://www.google.com/maps/place/?q=place_id:${r.google_link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton size="sm" icon={<FiMapPin />} aria-label="Map" variant="outline" colorScheme="teal" />
                    </ChakraLink>
                    {isEditing ? (
                      <>
                        <Button size="sm" colorScheme="green" onClick={() => handleSave(r.google_link)}>Save</Button>
                        <Button size="sm" onClick={handleCancel}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <IconButton size="sm" icon={<FiEdit />} onClick={() => handleEdit(r)} aria-label="Edit" />
                        <IconButton size="sm" icon={<FiTrash />} onClick={() => handleDelete(r.google_link)} colorScheme="red" aria-label="Delete" />
                      </>
                    )}
                  </Flex>
                </Flex>
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </SimpleGrid>
    </Box>
  );
};

export default RestaurantList;
