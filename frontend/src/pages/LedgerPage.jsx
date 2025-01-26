import {
  VStack,
  Text,
  Image,
  Box,
  Badge,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import { MdPerson, MdStore } from "react-icons/md";

function LedgerPage() {
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
    const fetchLedgerItems = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(`http://localhost:3001/items/ledger`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching ledger items:", error);
        setItems([]);
      }
    };

    fetchLedgerItems();
  }, [userEmail]);

  return (
    <VStack spacing={8} py={16} px={4} maxW="600px" mx="auto" mb={16}>
      <Text fontSize="2xl" fontWeight="bold">
        Rental Ledger
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">No rental history yet</Text>
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
            direction="column"
          >
            <Flex gap={4}>
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
                  colorScheme={item.status === "Returned" ? "green" : "yellow"}
                >
                  {item.status}
                </Badge>

                <HStack spacing={4} mt={2}>
                  <Text fontSize="sm" color="gray.500">
                    Rental: ${item.rental_fee}/day
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Collateral: ${item.collateral}
                  </Text>
                </HStack>
              </Box>
            </Flex>

            <Box h="1px" bg="gray.200" my={2} w="full" />

            <VStack align="start" spacing={2}>
              <Flex align="center" gap={2}>
                <MdStore />
                <Text fontWeight="medium">Lender:</Text>
                <Text>{item.lender_email}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <MdPerson />
                <Text fontWeight="medium">Renter:</Text>
                <Text>{item.renter_email}</Text>
              </Flex>
            </VStack>
          </Flex>
        ))
      )}
    </VStack>
  );
}

export default LedgerPage;
