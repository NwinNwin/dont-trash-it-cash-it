import { HStack, Button, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      justify="center"
      align="center"
      gap={4}
      w={"full"}
      position="fixed"
      top={0}
      zIndex={1}
      bg="white"
      boxShadow="md"
      h={16}
    >
      <Flex>Logo</Flex>
      <Button onClick={() => navigate("/list")}>List Item</Button>
      <Button>Sign In</Button>
      <ColorModeButton />
    </Flex>
  );
};

export default Navbar;
