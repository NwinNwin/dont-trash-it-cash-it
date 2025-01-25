import {
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Grid,
  Box,
  Image,
  Flex,
  HStack,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

function ListItemPage() {
  const [images, setImages] = useState(Array(4).fill(null));
  const fileInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = imageUrl;
      setImages(newImages);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup URLs when component unmounts
      images.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  return (
    <Container maxW="container.md" py={16}>
      <VStack
        spacing={8}
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Heading size="lg" alignSelf="start">
          List Item
        </Heading>

        {/* Image Upload Grid */}
        <VStack w="full" spacing={4}>
          <Text fontWeight="medium" alignSelf="start" color="gray.700">
            Photos
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
            {images.map((img, index) => (
              <Box
                key={index}
                bg="gray.50"
                aspectRatio={1}
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                onClick={() => fileInputRefs[index].current?.click()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                border="2px dashed"
                borderColor={img ? "transparent" : "gray.200"}
                transition="all 0.2s"
                _hover={{
                  borderColor: img ? "transparent" : "gray.300",
                  bg: img ? "gray.50" : "gray.100",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefs[index]}
                  onChange={(e) => handleImageUpload(index, e)}
                  style={{ display: "none" }}
                />
                {index === 0 && !img && (
                  <Text color="gray.500" fontSize="sm" fontWeight="medium">
                    UPLOAD
                  </Text>
                )}
                {img && (
                  <Image
                    src={img}
                    alt={`Upload ${index + 1}`}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                )}
              </Box>
            ))}
          </Grid>
        </VStack>

        {/* Item Details */}
        <VStack spacing={6} w="full">
          <Input
            placeholder="What are you selling?"
            size="lg"
            borderRadius="md"
            _placeholder={{ color: "gray.400" }}
          />
          <Textarea
            placeholder="Describe your item (5+ words)"
            minH="120px"
            size="lg"
            borderRadius="md"
            _placeholder={{ color: "gray.400" }}
          />
        </VStack>

        {/* Pricing Section */}
        <VStack spacing={6} w="full">
          <Text fontSize="xl" fontWeight="semibold" alignSelf="start">
            Pricing
          </Text>

          <HStack w="full" spacing={4}>
            <Text color="gray.600">$</Text>
            <Input
              type="number"
              placeholder="Set your daily rate"
              size="lg"
              borderRadius="md"
            />
            <Text color="gray.600">per day</Text>
          </HStack>

          <HStack w="full" spacing={4}>
            <Text color="gray.600">$</Text>
            <Input
              type="number"
              placeholder="Set your Collateral"
              size="lg"
              borderRadius="md"
            />
          </HStack>

          <Input
            type="number"
            placeholder="Days limit"
            size="lg"
            borderRadius="md"
          />
        </VStack>

        {/* Submit Button */}
        <Button
          w="full"
          size="lg"
          colorScheme="blue"
          mt={4}
          borderRadius="md"
          onClick={() => console.log("List item")}
          _hover={{
            transform: "translateY(-1px)",
            boxShadow: "md",
          }}
        >
          Confirm and List
        </Button>
      </VStack>
    </Container>
  );
}

export default ListItemPage;
