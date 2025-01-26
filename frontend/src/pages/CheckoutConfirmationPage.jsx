import { VStack, Text, Box, Circle, Button, Icon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CheckoutConfirmationPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lenderEmail, setLenderEmail] = useState("");

  useEffect(() => {
    const fetchLenderEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/lenders/${id}`);
        setLenderEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching lender email:", error);
      }
    };

    if (id) {
      fetchLenderEmail();
    }
  }, [id]);

  return (
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto" align="center">
      {/* Checkmark Icon */}
      <Circle size="120px" bg="gray.100" mb={4}>
        <Icon as={MdCheckCircle} color="green.500" boxSize="60px" />
      </Circle>

      {/* Confirmation Message */}
      <VStack spacing={4} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          We've notified the Lender
        </Text>

        <Text fontSize="lg" color="gray.600">
          You will only be charged after you picked up the item
        </Text>
      </VStack>

      {/* Meetup Instructions */}
      <VStack spacing={4} w="full" pt={4}>
        <Text fontSize="xl" fontWeight="semibold">
          Don't forget to schedule meet up:
        </Text>

        <Box>
          <Text fontWeight="medium">Lender's Email:</Text>
          <Text>{lenderEmail || "Loading..."}</Text>
        </Box>
      </VStack>

      {/* Confirm Button */}
      <Button
        size="lg"
        w="full"
        bg="black"
        mt={8}
        onClick={() => navigate("/")}
      >
        Confirm
      </Button>
    </VStack>
  );
}

export default CheckoutConfirmationPage;
