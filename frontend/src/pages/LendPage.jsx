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
import { auth } from "../firebase";
import axios from "axios";

function LendPage() {
  const [items, setItems] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchLentItems = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(
          `http://localhost:3001/lenders/email/${userEmail}`
        );
        setItems(response.data);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching lent items:", error);
        }
        setItems([]);
      }
    };

    fetchLentItems();
  }, [userEmail]);

  const handlePickupConfirmation = async (itemId) => {
    try {
      await axios.put(`http://localhost:3001/lenders/${itemId}`, {
        is_picked_up: true,
        is_returned: false,
      });

      // Navigate to waiting page
      navigate(`/waiting/${itemId}`);
    } catch (error) {
      console.error("Error updating pickup status:", error);
      alert("Failed to update pickup status. Please try again.");
    }
  };

  const handleReturnConfirmation = async (itemId) => {
    try {
      await axios.put(`http://localhost:3001/lenders/${itemId}`, {
        is_picked_up: true,
        is_returned: true,
      });

      // Navigate to waiting page
      navigate(`/waiting/${itemId}`);
    } catch (error) {
      console.error("Error updating return status:", error);
      alert("Failed to update return status. Please try again.");
    }
  };

  const getStatusButton = (status, itemId, itemName) => {
    switch (status) {
      case "Awaiting Pickup":
        return (
          <Button size="sm" onClick={() => handlePickupConfirmation(itemId)}>
            Confirm Item is picked up
          </Button>
        );
      case "Renting":
        return (
          <Button size="sm" onClick={() => handleReturnConfirmation(itemId)}>
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
        My Listings
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">No items listed yet</Text>
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
                {item.status}
              </Badge>
              <Text fontSize="sm" color="gray.500" mt={2}>
                ${item.rental_fee}/day
              </Text>

              {getStatusButton(item.status, item.id, item.name)}
            </Box>
          </Flex>
        ))
      )}
    </VStack>
  );
}

export default LendPage;
