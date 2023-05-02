import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  IconButton,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
} from "@chakra-ui/react";
import donuts from "../data/donutData.json";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { MdOutlineShoppingCart } from "react-icons/md";

function GridCards({ onAddToBasket }) {
  const [donutData, setDonutData] = useState(donuts);
  const [displayedDonuts, setDisplayedDonuts] = useState(donuts.slice(0, 4));
  const [startIndex, setStartIndex] = useState(0);
  const [basketDonuts, setBasketDonuts] = useState([]);
  const [selectedDonut, setSelectedDonut] = useState(null);
  const [showBasketDonuts, setShowBasketDonuts] = useState(false); // Add this state

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetch("/donuts.json")
  //       .then((response) => response.json())
  //       .then((data) => setDonutData(data));
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  const handleAddToBasket = (donut) => {
    setBasketDonuts([...basketDonuts, donut]);
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
  const toggleBasketDonuts = () => {
    setShowBasketDonuts(!showBasketDonuts);
  };

  return (
    <>
      <Flex justify={"center"} gap={"4"}>
        <IconButton
          alignSelf="center"
          bg={"orange.300"}
          color={"white"}
          aria-label="Previous Donuts"
          size="lg"
          icon={<ArrowBackIcon />}
          onClick={handlePreviousDonuts}
          w={"fit-content"}
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
      <Flex flexDirection="row" justifyContent="center">
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={4}
          m={4}
        >
          {displayedDonuts.map((donut) => (
            <GridItem key={donut._id}>
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
                  <Flex justifyContent="center">
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
                  <Button
                    onClick={() => handleAddToBasket(donut)}
                    bg={"pink.300"}
                    color={"white"}
                    mt={"10px"}
                  >
                    Add to Basket
                  </Button>
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
                      </ModalBody>
                      <Flex justifyContent={"center"}>
                        <Button
                          onClick={() => handleAddToBasket(donut)}
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
      <Flex>
        <IconButton
          onClick={toggleBasketDonuts}
          color="orange.400"
          bg={"white"}
          icon={
            showBasketDonuts ? (
              <MdOutlineShoppingCart />
            ) : (
              <MdOutlineShoppingCart />
            )
          }
          aria-label="Toggle Basket Donuts"
        />

        {showBasketDonuts && (
          <Box
            border={"1px"}
            h={"300px"}
            w={"300px"}
            overflow={"scroll"}
            borderRadius={"3xl"}
          >
            <Text fontSize="xl" fontWeight="bold"></Text>
            <VStack spacing={2} align="stretch">
              {basketDonuts.map((donut, index) => (
                <Box key={index} borderRadius="lg" p={4}>
                  <Text fontSize="md" fontWeight="bold">
                    {donut.name}
                  </Text>
                  <Text fontSize="sm">Price: ${donut.price.toFixed(2)}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default GridCards;
