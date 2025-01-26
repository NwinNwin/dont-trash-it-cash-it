import { VStack, Text, Icon, Button, Spinner } from "@chakra-ui/react";
import { MdHourglassEmpty } from "react-icons/md";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function WaitingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const itemName = location.state?.itemName || "Unknown Item";

  const handleConfirm = () => {
    navigate(`/pickup-confirmation/${id}`, {
      state: { itemName },
    });
  };

  return (
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto" align="center">
      {/* Title */}
      <Text fontSize="2xl" fontWeight="bold">
        Waiting for Pick up / Return
      </Text>

      {/* Item Details */}
      <Text fontSize="lg" color="gray.600">
        Item: {itemName}
      </Text>

      {/* Loading Icon */}
      <VStack spacing={4}>
        <Icon as={MdHourglassEmpty} boxSize="100px" color="gray.400" />
        <Spinner size="xl" color="gray.400" />
      </VStack>

      {/* Status Message */}
      <VStack spacing={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Waiting for Lender
        </Text>
        <Text fontSize="xl">to confirm</Text>
      </VStack>

      {/* Confirm Button */}
      <Button
        size="lg"
        w="full"
        bg="black"
        color="white"
        mt={8}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </VStack>
  );
}

export default WaitingPage;
