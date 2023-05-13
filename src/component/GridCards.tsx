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
  keyframes,
} from "@chakra-ui/react";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { ArrowBackIcon, ArrowForwardIcon, MinusIcon } from "@chakra-ui/icons";
import backgroundImage from "../images/DK-card-bg-01.svg";

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
      stripeProductId
      id
    }
  }
`;

function GridCardsTest({ id, name, price }) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const quantity = getItemQuantity(id);
  const [donutData, setDonutData] = useState([]);
  const [displayedDonuts, setDisplayedDonuts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const { loading, data, error } = useQuery(GET_DONUTS);
  const [selectedDonut, setSelectedDonut] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (data) {
      setDonutData(data.donuts);
      setDisplayedDonuts(data.donuts.slice(0, 4));
    }
  }, [data]);

  const handleAddToCart = (donut) => {
    addToCart(donut);
    console.log(donut); // Log the added item to the console
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
  const handleDecreaseQuantity = (donutId) => {
    decreaseCartQuantity(donutId);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(selectedItem);
  };
  return (
    <>
      <Flex justify={"center"} gap={"4"} m={"4"}>
        <IconButton
          alignSelf="center"
          bg={"orange.300"}
          color={"white"}
          aria-label="Previous Donuts"
          size="lg"
          icon={<ArrowBackIcon />}
          onClick={handlePreviousDonuts}
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
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
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
        />
      </Flex>

      <Flex flexDirection="row" justifyContent="center" mb={"100"}>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={4}
          m={2}
        >
          {displayedDonuts.map((donut) => (
            <GridItem key={donut.id}>
              <Box
                overflow="hidden"
                borderWidth="1px"
                p={"10px"}
                h={{ base: "300px", md: "600px" }}
                w={{ base: "auto", md: "auto" }}
                borderRadius="3xl"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                bg={"white"}
                transition="transform 0.2s ease-out"
                _hover={{ transform: "scale(1.1)" }}
              >
                <Flex justifyContent="center" w={{ base: "none", sm: "300px" }}>
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

                <Divider />

                <Flex justifyContent="center">
                  <Box>
                    <Button
                      onClick={() => {
                        increaseCartQuantity(donut.id);
                        addToCart(donut);
                      }}
                      bg={"pink.300"}
                      rounded={"full"}
                      transition="transform 0.2s ease-out"
                      _hover={{ bg: "cyan.100" }}
                      //_focus={{ boxShadow: "outline" }}
                      color={"white"}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </Flex>
                <Flex justifyContent="center">
                  <Box>
                    <Button
                      onClick={() => {
                        decreaseCartQuantity(donut.id);
                      }}
                      bg={"pink.300"}
                      rounded={"full"}
                      transition="transform 0.2s ease-out"
                      _hover={{ bg: "cyan.100" }}
                      //_focus={{ boxShadow: "outline" }}
                      color={"white"}
                    >
                      decrease
                    </Button>
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
                        bg={"white"}
                        justifyContent="center"
                        p={"10px"}
                        h={"300px"}
                        alignItems={"center"}
                        backgroundImage={`url(${backgroundImage})`}
                        backgroundRepeat="no-repeat"
                        backgroundPosition="center"
                        backgroundSize={{ base: "full", md: "cover" }}
                      >
                        <Image
                          src={donut.img}
                          height={"full"}
                          width={"full"}
                          w={{ base: "200px", md: "200px" }}
                          h={{ base: "200px", md: "200px" }}
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
                          m={"10px"}
                          onClick={() => {
                            increaseCartQuantity(donut.id);
                            addToCart(donut);
                          }}
                          bg={"pink.100"}
                          rounded={"full"}
                          transition="transform 0.2s ease-out"
                          _hover={{ bg: "cyan.100" }}
                          //_focus={{ boxShadow: "outline" }}
                          color={"pink.700"}
                        >
                          Add to cart
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
