import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";

const ItemCard = ({ key, images, price, name, category }) => {
  return (
    <Box
      key={key}
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      overflow="hidden"
      w={172}
    >
      <Image h="150px" objectFit="cover" src={images[0]} alt={name} />
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={3}>
          {category}
        </Text>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="green.600">
            ${price}
          </Text>
          <Button
            size="sm"
            colorScheme="purple"
            borderRadius="full"
            fontWeight="bold"
          >
            +
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ItemCard;
