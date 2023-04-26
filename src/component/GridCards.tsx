import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import donuts from "../data/donutData.json";

function GridCards() {
  const [donutData, setDonutData] = useState(donuts);
  const [selectedDonuts, setSelectedDonuts] = useState([]);

  // useEffect(() => {
  //   // Automatically update the donut data when the JSON file changes
  //   const intervalId = setInterval(() => {
  //     fetch("/donuts.json")
  //       .then((response) => response.json())
  //       .then((data) => setDonutData(data));
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  const handleAddToBasket = (donut) => {
    setSelectedDonuts([...selectedDonuts, donut]);
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      m={4}
    >
      {donutData.map((donut) => (
        <GridItem key={donut._id}>
          <Box
            overflow="hidden"
            borderWidth="1px"
            borderRadius="50px 50px 50px 50px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
            bg="#E6E6E6"
            transition="transform 0.2s ease-out"
            _hover={{ transform: "scale(1.1)" }}
          >
            <Flex justifyContent="center">
              <Image src={donut.img} alt={donut.name} height={"200px"} />
            </Flex>
            <Box p="6">
              <Flex alignItems="baseline">
                <Text fontSize="md" fontWeight="bold" color="gray.600" mr={2}>
                  ${donut.price.toFixed(2)}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {donut.qty} left
                </Text>
              </Flex>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {donut.name}
              </Box>
              <Box>
                <Text mt={2} color="gray.500" fontSize="sm" lineHeight="tall">
                  {donut.description}
                </Text>
              </Box>
              <Button mt={4} onClick={() => handleAddToBasket(donut)}>
                Add to Basket
              </Button>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

export default GridCards;
