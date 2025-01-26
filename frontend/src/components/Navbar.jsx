import { HStack, Button, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

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
      {user ? (
        <>
          <Button onClick={() => navigate("/lend")}>My Listings</Button>
          <Button onClick={() => navigate("/rent")}>My Rentals</Button>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      )}
      <ColorModeButton />
    </Flex>
  );
};

export default Navbar;
