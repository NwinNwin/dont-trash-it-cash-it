import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import fakeData from "../utils/fakeData";

function CheckoutPage() {
  const { id } = useParams();
  const itemId = id - 1;
  const item = fakeData[itemId];

  return (
    <Flex direction="column" align="center" py={16}>
      <Text fontSize="2xl" fontWeight="bold">
        Checkout for {item.name}
      </Text>
      {/* Add more checkout details here */}
    </Flex>
  );
}

export default CheckoutPage;
