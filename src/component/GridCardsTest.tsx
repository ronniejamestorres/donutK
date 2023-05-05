import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";

import donuts from "../data/donutData.json";

import { gql, useQuery } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";

const GET_DONUTS = gql`
  query Donuts {
    donuts {
      name
      img
      description
      price
      ingredients
      qty
      date
      thumbsUp
      thumbsDown
      id
    }
  }
`;

function GridCardsTest({}) {
  const [donutData, setDonutData] = useState(donuts);
  const [displayedDonuts, setDisplayedDonuts] = useState(donuts.slice(0, 4));

  const { data } = useQuery(GET_DONUTS);

  const { addToCart } = useCart();

  useEffect(() => {
    if (data) {
      setDonutData(data.donuts);
      setDisplayedDonuts(data.donuts.slice(0, 4));
    }
    console.log(donutData);
  }, [data]);

  const handleAddToCart = (donut) => {
    addToCart(donut);
  };

  return (
    <>
      <NavLink to="/cartpage">
        <Button colorScheme="blue" mb={4}>
          View Cart
        </Button>
      </NavLink>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        w={"fit-content"}
      />

      <Flex flexDirection="row" justifyContent="center">
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={4}
          m={4}
        >
          {displayedDonuts.map((donut) => (
            <GridItem key={donut.id}>
              <Box>
                <Box>
                  <Flex
                    justifyContent="center"
                    w={{ base: "none", sm: "300px" }}
                  >
                    <Image
                      src={donut.img}
                      alt={donut.name}
                      height={"100px"}
                      cursor="pointer"
                      m={"10px"}
                    />
                  </Flex>

                  <Box>
                    <Text fontWeight="bold" color="gray.600" mr={2}>
                      <Flex justifyContent={"center"}>
                        <Text fontSize="xl">{donut.name}</Text>
                      </Flex>
                      <Flex justifyContent={"center"}>
                        <Text fontSize="xl">${donut.price.toFixed(2)}</Text>
                      </Flex>
                    </Text>
                    <Flex justifyContent={"center"}>
                      <Text>{donut.qty} left</Text>
                    </Flex>
                  </Box>
                </Box>
                <Divider />
                <Flex justifyContent="center">
                  <Box>
                    <Button onClick={() => addToCart(donut)}>
                      Add to cart
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}

export default GridCardsTest;
