import { Flex, Text, Button, Box } from "@chakra-ui/react";
import ImageCarousel from "../components/ImageCarousel";
import fakeData from "../utils/fakeData";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = id - 1;
  const item = fakeData[itemId];

  return (
    <Flex direction="column" align="center" py={16} w="full">
      {/* Left side - Images */}
      <Flex>
        <ImageCarousel images={item.images} />
      </Flex>

      {/* Right side - Item details */}
      <Flex direction="column" w="full" px={3}>
        <Text fontSize="3xl" fontWeight="bold">
          {item.name}
        </Text>

        <Flex direction="column">
          <Text fontSize="3xl" color="green.600" fontWeight="semibold">
            ${item.rental_fee} per day
          </Text>
          <Text fontSize="md" color="gray.600">
            + ${item.collateral} collateral
          </Text>
        </Flex>

        <Flex justifyContent={"center"} gap={2} mt={4}>
          <Button
            size="xl"
            borderRadius={"lg"}
            w="50%"
            bg="green.500"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            Rent Now
          </Button>
          <Button size="xl" borderRadius={"lg"} w="50%" bg="black">
            Message Lender
          </Button>
        </Flex>

        <Box h="2px" bg="gray.200" my={4} />

        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Description
        </Text>
        <Text fontSize="md" color="gray.700" mb={9}>
          {item.description}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ItemDetailPage;
