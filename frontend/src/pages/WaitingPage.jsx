import {
  VStack,
  Text,
  Icon,
  Button,
  Spinner,
  Box,
  HStack,
} from "@chakra-ui/react";
import { MdHourglassEmpty, MdInventory } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function WaitingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleConfirm = () => {
    navigate(`/pickup-confirmation/${id}`, {
      state: { itemName: item?.name },
    });
  };

  if (loading) {
    return (
      <VStack spacing={8} py={32} px={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto" align="center">
      <Box
        w="full"
        bg="green.50"
        p={6}
        borderRadius="xl"
        border="1px"
        borderColor="green.200"
      >
        <VStack spacing={3}>
          <Text fontSize="2xl" fontWeight="bold" color="green.700">
            Waiting for
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.700">
            Pick Up / Return
          </Text>
          <HStack spacing={2} color="green.600">
            <Icon as={MdInventory} />
            <Text fontSize="lg">{item?.name || "Loading..."}</Text>
          </HStack>
        </VStack>
      </Box>

      <Box
        w="full"
        bg="white"
        p={8}
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        shadow="sm"
      >
        <VStack spacing={6}>
          <Icon
            as={MdHourglassEmpty}
            boxSize="100px"
            color="blue.500"
            animation="spin 2s linear infinite"
          />

          <VStack spacing={2} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Waiting for Pick Up
            </Text>
            <Text fontSize="lg" color="gray.600">
              to confirm the transaction
            </Text>
          </VStack>
        </VStack>
      </Box>

      <Button
        size="lg"
        w="full"
        bg="blue.700"
        color="white"
        mt={4}
        onClick={handleConfirm}
        borderRadius="lg"
        shadow="md"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        Confirm
      </Button>
    </VStack>
  );
}

export default WaitingPage;

// Add this CSS to your global styles or component
const styles = `
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;
