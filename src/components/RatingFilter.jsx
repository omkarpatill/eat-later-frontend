// src/components/RatingFilter.jsx
import { Select } from '@chakra-ui/react';

const RatingFilter = ({ selectedRating, setSelectedRating }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedRating(value === "" ? null : parseInt(value));
  };

  return (
    <Select
      placeholder="Filter by My Rating"
      value={selectedRating || ""}
      onChange={handleChange}
      maxW="200px"
      size="sm"
      colorScheme="red"
      focusBorderColor="red.400"
    >
      {[1, 2, 3, 4, 5].map((rating) => (
        <option key={rating} value={rating}>
          {rating} ★
        </option>
      ))}
    </Select>
  );
};

export default RatingFilter;
