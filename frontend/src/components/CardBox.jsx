import { Button, Flex } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import axios from "axios";
import { useState, useEffect } from "react";

const CardBox = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const itemsMap = items.map(
    (item) =>
      item.status === "Listed" && (
        <ItemCard
          key={item.id}
          id={item.id}
          images={item.images}
          rental_fee={item.rental_fee}
          name={item.name}
        />
      )
  );
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
