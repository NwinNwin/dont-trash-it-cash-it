import { VStack, Text, Box, Circle, Button, Icon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CheckoutConfirmationPage() {
  const navigate = useNavigate();
  const lenderEmail = "anteater@uci.edu"; // Hardcoded email for demo

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
          <Text>{lenderEmail}</Text>
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
