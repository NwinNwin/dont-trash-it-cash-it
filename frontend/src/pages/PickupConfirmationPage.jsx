import { VStack, Text, Icon, Button, Circle } from "@chakra-ui/react";
import { MdHandshake } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

function PickupConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const itemName = location.state?.itemName || "Unknown Item";

  return (
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto" align="center">
      {/* Close Button */}
      <Text fontSize="xl" fontWeight="bold" alignSelf="start">
        Confirm Picked up
      </Text>

      {/* Handshake Icon */}
      <Circle size="200px" bg="gray.100">
        <Icon as={MdHandshake} boxSize="100px" color="yellow.400" />
      </Circle>

      {/* Confirmation Message */}
      <Text fontSize="2xl" fontWeight="bold">
        The Item is picked up!
      </Text>

      {/* Confirm Button */}
      <Button
        size="lg"
        w="full"
        bg="gray.200"
        onClick={() => navigate("/")}
        borderRadius="md"
      >
        Confirm
      </Button>
    </VStack>
  );
}

export default PickupConfirmationPage;
