import {
  VStack,
  Text,
  Image,
  Box,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import fakeData from "../utils/fakeData";
import { useNavigate } from "react-router-dom";

function RentPage() {
  const navigate = useNavigate();

  // Simulated rental data
  const rentals = [
    {
      ...fakeData[0],
      status: "Awaiting pickup",
      email: "anteater@uci.edu",
    },
    {
      ...fakeData[1],
      status: "Renting",
      email: "anteater@uci.edu",
    },
    {
      ...fakeData[2],
      status: "Rented",
      email: "anteater@uci.edu",
    },
  ];

  const getStatusButton = (status, itemId, itemName) => {
    switch (status) {
      case "Awaiting pickup":
        return (
          <Button
            size="sm"
            onClick={() =>
              navigate(`/waiting/${itemId}`, {
                state: { itemName },
              })
            }
          >
            Confirm Item is picked up
          </Button>
        );
      case "Renting":
        return (
          <Button
            size="sm"
            onClick={() =>
              navigate(`/waiting/${itemId}`, {
                state: { itemName },
              })
            }
          >
            Confirm Return
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <VStack spacing={6} w="full" maxW="container.md" px={4} py={16} mb={20}>
      <Text fontSize="2xl" fontWeight="bold" alignSelf="start">
        My Rentals
      </Text>

      {rentals.map((item, index) => (
        <Flex
          key={index}
          w="full"
          bg="white"
          p={4}
          borderRadius="lg"
          boxShadow="sm"
          gap={4}
        >
          <Image
            src={item.images[0]}
            alt={item.name}
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
          />

          <Box flex={1}>
            <Badge mb={2} px={2} py={1} borderRadius="full" bg="gray.200">
              {item.status}
            </Badge>

            <Text fontSize="lg" fontWeight="semibold">
              {item.name}
            </Text>

            <Text color="green.600" fontSize="md">
              ${item.rental_fee} / day
            </Text>

            <Text fontSize="sm" color="gray.500">
              + ${item.collateral} collateral
            </Text>

            <Text fontSize="sm" mt={1}>
              {item.status === "Awaiting pickup" ? "To: " : "From: "}
              {item.email}
            </Text>

            {getStatusButton(item.status, item.id, item.name)}
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}

export default RentPage;
