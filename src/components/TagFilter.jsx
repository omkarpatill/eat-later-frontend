// src/components/TagFilter.jsx
import { Wrap, WrapItem, Checkbox, Text } from '@chakra-ui/react';

const TagFilter = ({ allTags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Wrap spacing={2}>
      {allTags.map((tag) => (
        <WrapItem key={tag}>
          <Checkbox
            colorScheme="red"
            isChecked={selectedTags.includes(tag)}
            onChange={() => toggleTag(tag)}
          >
            <Text fontSize="sm" fontWeight="medium">
              {tag}
            </Text>
          </Checkbox>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default TagFilter;
