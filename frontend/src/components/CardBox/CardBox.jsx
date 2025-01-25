import { Button, Flex } from "@chakra-ui/react";
import ItemCard from "../ItemCard/ItemCard";
import fakeData from "../../utils/fakeData";

const CardBox = () => {
  const itemsMap = fakeData.map((item) => (
    <ItemCard
      key={item.id}
      images={item.images}
      rental_fee={item.rental_fee}
      name={item.name}
    />
  ));
  return (
    <Flex width="100%" justifyContent="center" px={1}>
      <Flex
        wrap="wrap"
        justifyContent="center"
        width="100%"
        gap="3" // Gap between cards
      >
        {itemsMap}
      </Flex>
    </Flex>
  );
};

export default CardBox;
