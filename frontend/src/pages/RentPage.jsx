import {
  VStack,
  Text,
  Image,
  Box,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RentPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userEmail = "user1@example.com"; // TODO: Replace with actual user email from auth

  useEffect(() => {
    const fetchRentedItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/renters/email/${userEmail}`
        );
        setItems(response.data);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching rented items:", error);
        }
        setItems([]);
      }
    };

    fetchRentedItems();
  }, [userEmail]);

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
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold">
        My Rentals
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">No items rented yet</Text>
      ) : (
        items.map((item) => (
          <Flex
            key={item.id}
            w="full"
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            p={4}
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
              <Text fontSize="xl" fontWeight="semibold">
                {item.name}
              </Text>
              <Badge
                colorScheme={
                  item.is_picked_up
                    ? item.is_returned
                      ? "green"
                      : "yellow"
                    : "blue"
                }
              >
                {item.is_picked_up
                  ? item.is_returned
                    ? "Returned"
                    : "Renting"
                  : "Awaiting pickup"}
              </Badge>
              <Text fontSize="sm" color="gray.500" mt={2}>
                ${item.rental_fee}/day
              </Text>

              {getStatusButton(
                item.is_picked_up
                  ? item.is_returned
                    ? "Returned"
                    : "Renting"
                  : "Awaiting pickup",
                item.id,
                item.name
              )}
            </Box>
          </Flex>
        ))
      )}
    </VStack>
  );
}

export default RentPage;
