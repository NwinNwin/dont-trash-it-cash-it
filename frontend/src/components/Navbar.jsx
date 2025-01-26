import { HStack, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { MdAdd, MdLogout, MdLogin } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const NavButton = ({ icon, label, onClick, colorScheme = "gray" }) => (
    <Button
      leftIcon={<Icon as={icon} boxSize={5} />}
      onClick={onClick}
      colorScheme={colorScheme}
      variant="ghost"
      size="md"
      _hover={{ bg: `${colorScheme}.50` }}
    >
      {label}
    </Button>
  );

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      w="full"
      position="fixed"
      top={0}
      zIndex={1}
      bg="white"
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
      h={16}
      px={1}
    >
      <Image
        src="/ih_logo.png"
        alt="Logo"
        h="80px"
        cursor="pointer"
        onClick={() => navigate("/")}
      />

      <HStack spacing={2}>
        <NavButton
          icon={MdAdd}
          label="List Item"
          onClick={() => navigate("/list")}
          colorScheme="blue"
        />

        {user ? (
          <>
            <NavButton
              icon={MdLogout}
              label="Sign Out"
              onClick={handleSignOut}
              colorScheme="red"
            />
          </>
        ) : (
          <NavButton
            icon={MdLogin}
            label="Sign In"
            onClick={() => navigate("/signin")}
            colorScheme="green"
          />
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
