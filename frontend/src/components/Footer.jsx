import { Button, Flex } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      as="footer"
      justify="center"
      align="center"
      gap={4}
      w={"full"}
      position="fixed"
      bottom={0}
      bg="white"
      p={4}
      boxShadow="md"
      h={16}
    >
      <Button
        onClick={() => navigate("/")}
        colorScheme={location.pathname === "/" ? "blue" : "gray"}
      >
        Home
      </Button>
      <Button
        onClick={() => navigate("/rent")}
        colorScheme={location.pathname === "/rent" ? "blue" : "gray"}
      >
        Rent
      </Button>
      <Button
        onClick={() => navigate("/lend")}
        colorScheme={location.pathname === "/lend" ? "blue" : "gray"}
      >
        Lend
      </Button>
    </Flex>
  );
};

export default Footer;
