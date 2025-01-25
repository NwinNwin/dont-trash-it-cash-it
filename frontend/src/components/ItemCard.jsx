import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ id, images, rental_fee, name }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/items/${id}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      overflow="hidden"
      w={172}
      cursor="pointer"
      key={id}
    >
      <Image h="150px" objectFit="cover" src={images[0]} alt={name} />
      <Box p={4}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          mb={2}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          h={6}
        >
          {name}
        </Text>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontSize="xl" fontWeight="bold" color="green.600">
            ${rental_fee} per day
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ItemCard;
