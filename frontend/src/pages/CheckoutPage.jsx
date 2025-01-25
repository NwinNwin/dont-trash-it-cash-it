import { useParams } from "react-router-dom";
import { Flex, Text, Box, Image, Input, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import fakeData from "../utils/fakeData";

function CheckoutPage() {
  const { id } = useParams();
  const itemId = id - 1;
  const item = fakeData[itemId];
  const [days, setDays] = useState(1);
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  const rentalTotal = item.rental_fee * days;
  const finalTotal = rentalTotal + item.collateral;

  const handleDaysChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setDays('');
    } else {
      const numValue = parseInt(value);
      setDays(numValue >= 1 ? numValue : 1);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      py={16}
      px={4}
      maxW="800px"
      mx="auto"
    >
      {/* Item Summary Section */}
      <Flex gap={6} w="full" align="center" mb={6}>
        <Image
          src={item.images[0]}
          alt={item.name}
          boxSize="100px"
          objectFit="cover"
          borderRadius="md"
        />
        <Text fontSize="2xl" fontWeight="bold">
          {item.name}
        </Text>
      </Flex>

      {/* Rental Duration Section */}
      <VStack spacing={2} w="full" align="start" mb={4}>
        <Text fontWeight="semibold">Rental Duration</Text>
        <Input
          type="number"
          value={days}
          onChange={handleDaysChange}
          placeholder="Number of days"
          w="200px"
        />
        <Text fontSize="lg" color="green.600">
          Rental Total: ${days ? rentalTotal : 0} (${item.rental_fee} × {days || 0} days)
        </Text>
      </VStack>

      <Box h="1px" bg="gray.200" my={4} w="full" />

      {/* What's Next Section */}
      <VStack spacing={3} w="full" align="start">
        <Text fontSize="xl" fontWeight="bold">
          What's Next?
        </Text>
        <Text color="gray.700">
          Your payment will be held securely in our smart contract. Once
          confirmed, you'll need to arrange a meetup with the lender to collect
          the item. The collateral will be returned when you return the item in
          its original condition.
        </Text>
      </VStack>

      <Box h="1px" bg="gray.200" my={4} w="full" />

      {/* Payment Summary Section */}
      <VStack spacing={3} w="full" align="start">
        <Text fontSize="xl" fontWeight="bold">
          Payment Summary
        </Text>
        <Text fontSize="sm" color="gray.600">
          Your Wallet: {walletAddress}
        </Text>
        <VStack spacing={1} w="full" align="start">
          <Flex justify="space-between" w="full">
            <Text>Rental Fee ({days} days)</Text>
            <Text>${rentalTotal}</Text>
          </Flex>
          <Flex justify="space-between" w="full">
            <Text>Collateral</Text>
            <Text>${item.collateral}</Text>
          </Flex>
          <Box h="1px" bg="gray.200" my={2} w="full" />
          <Flex justify="space-between" w="full">
            <Text fontWeight="bold">Total to Pay</Text>
            <Text fontWeight="bold">${finalTotal}</Text>
          </Flex>
        </VStack>
      </VStack>

      <Button
        mt={8}
        size="lg"
        w="full"
        colorScheme="green"
        onClick={() => console.log('Submit clicked')}
      >
        Submit Payment
      </Button>
    </Flex>
  );
}

export default CheckoutPage;
