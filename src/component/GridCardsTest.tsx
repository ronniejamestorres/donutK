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
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import donuts from "../data/donutData.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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

function GridCardsTest({ id, name, price }) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [donutData, setDonutData] = useState(donuts);
  const [displayedDonuts, setDisplayedDonuts] = useState(donuts.slice(0, 4));
  const [startIndex, setStartIndex] = useState(0);
  const { data } = useQuery(GET_DONUTS);
  const [selectedDonut, setSelectedDonut] = useState(null);
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

  const handleNextDonuts = () => {
    const newIndex = (startIndex + 4) % donutData.length;
    setStartIndex(newIndex);
    setDisplayedDonuts(donutData.slice(newIndex, newIndex + 4));
  };

  const handlePreviousDonuts = () => {
    const newIndex = (startIndex - 4 + donutData.length) % donutData.length;
    setStartIndex(newIndex);
    setDisplayedDonuts(donutData.slice(newIndex, newIndex + 4));
  };

  const handleDonutClick = (donut) => {
    setSelectedDonut(donut);
  };
  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        w={"fit-content"}
      />
      <Flex justify={"center"} gap={"4"}>
        <IconButton
          alignSelf="center"
          bg={"orange.300"}
          color={"white"}
          aria-label="Previous Donuts"
          size="lg"
          icon={<ArrowBackIcon />}
          onClick={handlePreviousDonuts}
        />

        <IconButton
          alignSelf="center"
          bg={"orange.300"}
          color={"white"}
          aria-label="Next Donuts"
          size="lg"
          icon={<ArrowForwardIcon />}
          onClick={handleNextDonuts}
          w={"fit-content"}
        />
      </Flex>
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
              <Box
                overflow="hidden"
                borderWidth="1px"
                p={"10px"}
                h={{ base: "300px", md: "300px" }}
                w={{ base: "auto", md: "300px" }}
                borderRadius="3xl"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                bg={"white"}
                transition="transform 0.2s ease-out"
                _hover={{ transform: "scale(1.1)" }}
              >
                <Box>
                  <Flex
                    justifyContent="center"
                    w={{ base: "none", sm: "300px" }}
                  >
                    <Image
                      src={donut.img}
                      alt={donut.name}
                      height={"100px"}
                      onClick={() => handleDonutClick(donut)}
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
                    <Button
                      onClick={() => {
                        increaseCartQuantity(donut.id);
                        addToCart(donut);
                      }}
                    >
                      Add to cart
                    </Button>

                    <Flex></Flex>
                  </Box>
                </Flex>
                {selectedDonut === donut && (
                  <Modal
                    isOpen={selectedDonut === donut}
                    onClose={() => setSelectedDonut(null)}
                  >
                    <ModalOverlay />
                    <ModalContent
                      overflow="hidden"
                      borderRadius="50px 50px 50px 50px"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                      bg={"pink.400"}
                      w={{ base: "300px", md: "400px" }}
                    >
                      <Flex
                        justifyContent="center"
                        bg={"white"}
                        p={"10px"}
                        h={"300px"}
                        alignItems={"center"}
                      >
                        <Image
                          src={donut.img}
                          height={"200px"}
                          width={"200px"}
                        />
                      </Flex>

                      <ModalHeader color={"white"} fontSize={"2xl"}>
                        {selectedDonut.name}
                      </ModalHeader>

                      <ModalCloseButton />

                      <ModalBody color={"white"}>
                        <Text>{selectedDonut.description}</Text>
                        <Text fontSize={"xl"} mt={"4px"} mb={"4px"}>
                          Ingredients :{" "}
                        </Text>
                        <Text>{selectedDonut.ingredients}</Text>
                      </ModalBody>
                      <Flex justifyContent={"center"}>
                        <Button
                          bg={"white"}
                          color={"pink.400"}
                          borderRadius={"full"}
                          w={"fit-content"}
                          m={"10px"}
                        >
                          Add to Basket
                        </Button>
                      </Flex>
                    </ModalContent>
                  </Modal>
                )}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}

export default GridCardsTest;
