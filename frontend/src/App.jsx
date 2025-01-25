import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex direction="column" align="center">
      <Navbar />
      <Flex py={16} w="full" justify="center">
        <Home />
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
