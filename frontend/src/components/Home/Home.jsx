import { Flex, Button } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import CardBox from "../CardBox/CardBox";

const Home = () => {
  return (
    <Flex direction="column" align="center">
      <SearchBar />
      <CardBox />
    </Flex>
  );
};

export default Home;
