import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

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
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button>Ledger</Button>
      <Button>Renting</Button>
      <Button>Help</Button>
    </Flex>
  );
};

export default Footer;
