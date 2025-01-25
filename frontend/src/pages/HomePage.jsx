import { Flex, Button } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import CardBox from "../components/CardBox";

const HomePage = () => {
  return (
    <Flex direction="column" align="center" py={16}>
      <SearchBar />
      <CardBox />
    </Flex>
  );
};

export default HomePage;
