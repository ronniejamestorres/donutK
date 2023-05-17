import { useState, useEffect, createContext, useContext, useRef } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  Divider,
  IconButton,
  Box,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Modal,
  ModalOverlay,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiPlusMedical } from "react-icons/bi";
import { ImCross, ImMinus, ImPlus } from "react-icons/im";
import backgroundImage from "../images/DK-card-bg-01.svg";

interface Donut {
  name: string;
  img: string;
  description: string;
  price: number;
  ingredients: string[];
  qty: number;
  date: string;
  thumbsUp: number;
  thumbsDown: number;
  stripeProductId: string;
  id: string;
  cartQty?: number;
}

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

function GridCardsTest(): JSX.Element {
  const { increaseCartQuantity, removeNumberCart, decreaseNumberQuantity } =
    useShoppingCart();
  const [addedDonuts, setAddedDonuts] = useState(new Set());
  const sliderRef = useRef<Slider>(null);
  const [donutData, setDonutData] = useState<Donut[]>([]);
  const [displayedDonuts, setDisplayedDonuts] = useState<Donut[]>([]);

  const [startIndex, setStartIndex] = useState(0);
  const { data } = useQuery(GET_DONUTS);

  const {
    addToCart,
    removeFromCart,
    decreaseCartQuantity,
    getCartItemQuantity,
  } = useCart();

  useEffect(() => {
    if (data) {
      setDonutData(data.donuts);
      setDisplayedDonuts(data.donuts.slice(0, 4));
    }
  }, [data]);

  const [selectedDonut, setSelectedDonut] = useState<Donut | null>(null);

  const toast = useToast();

  const showToast = (donut: Donut) => {
    toast({
      render: () => (
        <Box color="white" p={3} bg="pink.300" borderRadius="md">
          <Flex alignItems="center">
            <Image
              src={donut.img}
              alt={donut.name}
              boxSize="50px"
              borderRadius="full"
              mr={3}
            />
            <Text color={"pink.700"} fontWeight={"bold"}>
              Added {donut.name} to bag
            </Text>
          </Flex>
        </Box>
      ),
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const showDecreasedToast = (donut: Donut) => {
    toast({
      render: () => (
        <Box color="white" p={3} bg="orange.200" borderRadius="md">
          <Flex alignItems="center">
            <Image
              src={donut.img}
              alt={donut.name}
              boxSize="50px"
              borderRadius="full"
              mr={3}
            />
            <Text color={"orange.700"} fontWeight={"bold"}>
              Removed 1 {donut.name} from bag
            </Text>
          </Flex>
        </Box>
      ),
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const showRemovedToast = (donut: Donut) => {
    toast({
      render: () => (
        <Box color="white" p={3} bg="cyan.200" borderRadius="md">
          <Flex alignItems="center">
            <Image
              src={donut.img}
              alt={donut.name}
              boxSize="50px"
              borderRadius="full"
              mr={3}
            />
            <Text color={"cyan.700"} fontWeight={"bold"}>
              Removed {donut.name} from bag
            </Text>
          </Flex>
        </Box>
      ),
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };
  const handleDonutClick = (donut: Donut) => {
    setSelectedDonut(donut);
  };

  return (
    <>
      <Flex justify={"center"} gap={"4"} m={"4"}>
        <IconButton
          alignSelf="center"
          bg={"orange.200"}
          color={"orange.700"}
          aria-label="Previous Donuts"
          size="lg"
          icon={<ArrowBackIcon />}
          onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
        />

        <IconButton
          alignSelf="center"
          bg={"orange.200"}
          color={"orange.700"}
          aria-label="Next Donuts"
          size="lg"
          icon={<ArrowForwardIcon />}
          onClick={() => sliderRef.current && sliderRef.current.slickNext()}
          w={"fit-content"}
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
        />
      </Flex>
      <Box
        //border="1px"
        overflow={"hidden"}
        mb={"10"}
      >
        <Slider ref={sliderRef} {...settings}>
          {donutData.map((donut) => (
            <Box>
              <Box
                key={donut.id}
                m={{ base: "4", md: "4", lg: "8" }}
                minW={{ base: "calc(50% - 16px)", md: "calc(25% - 16px)" }} // Add a minimum width
                bg={"white"}
                h={{ base: "400px", md: "460px", lg: "480px" }}
                rounded={"3xl"}
                transition="transform 0.2s ease-out"
                _hover={{ transform: "scale(1.1)" }}
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                p={4}
              >
                <Flex
                  justifyContent={"center"}
                  h={{ base: "100px", md: "auto", lg: "200px" }}
                >
                  <Image
                    src={donut.img}
                    alt={donut.name}
                    onClick={() => handleDonutClick(donut)}
                    cursor="pointer"
                    w={{ base: "100px", md: "200px" }}
                  />
                </Flex>
                <Text fontWeight="bold" color="gray.600" mr={2}>
                  <Flex justifyContent={"center"}>
                    <Text
                      fontSize={{ base: "sm", md: "md", lg: "xl" }}
                      m={"4"}
                      fontFamily={"Gloria Hallelujah"}
                      h={"60px"}
                    >
                      {donut.name}
                    </Text>
                  </Flex>

                  <Flex justifyContent={"center"}>
                    <Text fontSize="xl">${donut.price.toFixed(2)}</Text>
                  </Flex>
                </Text>
                <Text>{donut.qty} left</Text>

                <Divider />

                <Flex justifyContent="center" flexDirection={"column"}>
                  <Flex justifyContent="center" m={2}>
                    <Button
                      onClick={() => {
                        increaseCartQuantity(donut.id);
                        addToCart(donut);
                        showToast(donut);
                        setAddedDonuts((prev) => new Set(prev.add(donut.id)));
                      }}
                      bg={"pink.300"}
                      rounded={"full"}
                      color={"pink.700"}
                      transition="transform 0.2s ease-out"
                      _hover={{ transform: "scale(1.1)" }}
                      fontSize={{ base: "sm", md: "sm", lg: "md" }}
                    >
                      Add to cart
                      <Box ml={2}>
                        <ImPlus />
                      </Box>
                    </Button>
                  </Flex>

                  <Flex justifyContent="center" flexDirection={"row"}>
                    {/* Decrease button */}
                    <Button
                      isDisabled={getCartItemQuantity(donut.id) === 0}
                      onClick={() => {
                        decreaseNumberQuantity(donut.id);
                        decreaseCartQuantity(donut.id);
                        showDecreasedToast(donut);
                      }}
                      bg={"orange.200"}
                      rounded={"full"}
                      color={"orange.700"}
                      transition="transform 0.2s ease-out"
                      _hover={{ transform: "scale(1.1)" }}
                      m={2}
                    >
                      <ImMinus />
                    </Button>

                    {/* Remove button */}
                    <Button
                      isDisabled={getCartItemQuantity(donut.id) === 0}
                      onClick={() => {
                        removeFromCart(donut.id);
                        removeNumberCart(donut.id);
                        showRemovedToast(donut);

                        setAddedDonuts((prev) => {
                          const updatedSet = new Set(prev);
                          updatedSet.delete(donut.id);
                          return updatedSet;
                        });
                      }}
                      bg={"cyan.200"}
                      rounded={"full"}
                      color={"cyan.700"}
                      transition="transform 0.2s ease-out"
                      _hover={{ transform: "scale(1.1)" }}
                      m={2}
                    >
                      <ImCross />
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

                        <ModalHeader
                          color={"white"}
                          fontSize={"2xl"}
                          fontFamily={"Gloria Hallelujah"}
                        >
                          {selectedDonut.name}
                        </ModalHeader>

                        <ModalCloseButton />

                        <ModalBody color={"white"}>
                          <Text>{selectedDonut.description}</Text>
                          <Text
                            fontSize={"2xl"}
                            m={"4px"}
                            fontFamily={"Gloria Hallelujah"}
                          >
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
                            margin={"4"}
                          >
                            Add to cart
                            <Box ml={2}>
                              <ImPlus />
                            </Box>
                          </Button>
                        </Flex>
                      </ModalContent>
                    </Modal>
                  )}
                </Flex>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default GridCardsTest;
