import {
  Flex,
  Text,
  Button,
  Box,
  Spinner,
  Grid,
  Icon,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import ImageCarousel from "../components/ImageCarousel";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  MdCategory,
  MdRecycling,
  MdPublic,
  MdLocalShipping,
  MdBolt,
  MdTimer,
  MdScale,
  MdInventory,
} from "react-icons/md";
import { GiWeight } from "react-icons/gi";

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [carbonData, setCarbonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemResponse, carbonResponse] = await Promise.all([
          axios.get(`http://localhost:3001/items/${id}`),
          axios.get(`http://localhost:3001/carbon/item/${id}`),
        ]);
        setItem(itemResponse.data);

        // Parse material_composition from string to array
        const carbonDataWithParsedMaterials = {
          ...carbonResponse.data,
          material_composition: carbonResponse.data.material_composition
            .replace(/[{"}]/g, "") // Remove {, }, and " characters
            .split(",") // Split into array by comma
            .map((material) => material.trim()), // Remove any whitespace
        };

        setCarbonData(carbonDataWithParsedMaterials);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  console.log(carbonData);

  const InfoCard = ({ icon, title, value, unit }) => {
    // Color mapping for different card types
    const getColorScheme = (title) => {
      switch (title.toLowerCase()) {
        case "category":
          return { bg: "blue.50", icon: "blue.500", border: "blue.200" };
        case "weight":
          return { bg: "purple.50", icon: "purple.500", border: "purple.200" };
        case "origin":
          return { bg: "green.50", icon: "green.500", border: "green.200" };
        case "transportation":
          return { bg: "orange.50", icon: "orange.500", border: "orange.200" };
        case "energy usage":
          return { bg: "yellow.50", icon: "yellow.600", border: "yellow.200" };
        case "lifetime":
          return { bg: "cyan.50", icon: "cyan.500", border: "cyan.200" };
        case "disposal method":
          return { bg: "teal.50", icon: "teal.500", border: "teal.200" };
        case "materials":
          return { bg: "pink.50", icon: "pink.500", border: "pink.200" };
        default:
          return { bg: "gray.50", icon: "gray.500", border: "gray.200" };
      }
    };

    const colors = getColorScheme(title);

    return (
      <Box
        p={4}
        borderRadius="lg"
        border="1px"
        borderColor={colors.border}
        bg={colors.bg}
        _hover={{
          shadow: "md",
          transform: "translateY(-2px)",
          borderColor: colors.icon,
        }}
        transition="all 0.2s"
      >
        <VStack spacing={2} align="start">
          <HStack spacing={2}>
            <Icon as={icon} boxSize={5} color={colors.icon} />
            <Text fontSize="sm" color="gray.700" fontWeight="medium">
              {title}
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {value} {unit}
          </Text>
        </VStack>
      </Box>
    );
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!item) {
    return <Text>Item not found</Text>;
  }

  return (
    <Flex direction="column" align="center" py={16} w="full">
      {/* Left side - Images */}
      <Flex>
        <ImageCarousel images={item.images} />
      </Flex>

      {/* Right side - Item details */}
      <Flex direction="column" w="full" px={3}>
        <Text fontSize="3xl" fontWeight="bold">
          {item.name}
        </Text>

        <Flex direction="column">
          <Text fontSize="3xl" color="green.600" fontWeight="semibold">
            ${item.rental_fee} per day
          </Text>
          <Text fontSize="md" color="gray.600">
            + ${item.collateral} collateral
          </Text>
        </Flex>

        <Flex justifyContent={"center"} gap={2} mt={4}>
          <Button
            size="xl"
            borderRadius={"lg"}
            w="50%"
            bg="green.500"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            Rent Now
          </Button>
          <Button size="xl" borderRadius={"lg"} w="50%" bg="black">
            Message Lender
          </Button>
        </Flex>

        <Box h="2px" bg="gray.200" my={4} />

        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Description
        </Text>
        <Text fontSize="md" color="gray.700" mb={9}>
          {item.description}
        </Text>

        {/* New Environmental Impact Section */}
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Environmental Impact
        </Text>

        {carbonData && (
          <Grid templateColumns={"repeat(2, 1fr)"} gap={4} mb={8}>
            <InfoCard
              icon={MdCategory}
              title="Category"
              value={carbonData.category}
            />

            <InfoCard
              icon={GiWeight}
              title="Weight"
              value={carbonData.estimated_weight_kg}
              unit="kg"
            />

            <InfoCard
              icon={MdPublic}
              title="Origin"
              value={carbonData.country_of_origin}
            />

            <InfoCard
              icon={MdLocalShipping}
              title="Transportation"
              value={`${carbonData.transportation_distance_km} km by ${carbonData.transport_mode}`}
            />

            <InfoCard
              icon={MdBolt}
              title="Energy Usage"
              value={carbonData.usage_energy_kwh_per_year}
              unit="kWh/year"
            />

            <InfoCard
              icon={MdTimer}
              title="Lifetime"
              value={carbonData.lifetime_years}
              unit="years"
            />

            <InfoCard
              icon={MdRecycling}
              title="Disposal Method"
              value={carbonData.disposal_method}
            />

            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="pink.200"
              bg="pink.50"
              _hover={{
                shadow: "md",
                transform: "translateY(-2px)",
                borderColor: "pink.500",
              }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={2}>
                <HStack>
                  <Icon as={MdInventory} boxSize={5} color="pink.500" />
                  <Text fontSize="sm" color="gray.700" fontWeight="medium">
                    Materials
                  </Text>
                </HStack>
                <Flex gap={2} flexWrap="wrap">
                  {carbonData.material_composition.map((material, index) => (
                    <Badge
                      key={index}
                      bg="blue.500"
                      color="white"
                      borderRadius="full"
                      px={2}
                      py={1}
                    >
                      {material}
                    </Badge>
                  ))}
                </Flex>
              </VStack>
            </Box>
          </Grid>
        )}
      </Flex>
    </Flex>
  );
}

export default ItemDetailPage;
