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
  const { increaseCartQuantity, removeNumberCart, decreaseNumberQuantity } =
    useShoppingCart();
  const [addedDonuts, setAddedDonuts] = useState(new Set());
  const sliderRef = useRef(null);
  const [donutData, setDonutData] = useState([]);
  const [displayedDonuts, setDisplayedDonuts] = useState([]);
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

  const toast = useToast();

  const showToast = (donut) => {
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
  const showDecreasedToast = (donut) => {
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
  const showRemovedToast = (donut) => {
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
          onClick={() => sliderRef.current.slickPrev()}
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
          onClick={() => sliderRef.current.slickNext()}
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
                m={{ base: "auto", md: "8" }}
                minW={{ base: "calc(50% - 16px)", md: "calc(25% - 16px)" }} // Add a minimum width
                bg={"white"}
                h={"460px"}
                rounded={"3xl"}
                transition="transform 0.2s ease-out"
                _hover={{ transform: "scale(1.1)" }}
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                p={4}
              >
                <Flex justifyContent={"center"}>
                  <Image
                    src={donut.img}
                    alt={donut.name}
                    onClick={() => handleDonutClick(donut)}
                    cursor="pointer"
                    w={"200px"}
                  />
                </Flex>
                <Text fontWeight="bold" color="gray.600" mr={2}>
                  <Flex justifyContent={"center"}>
                    <Text fontSize={{ base: "sm", md: "xl" }} h={"10"}>
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
                  <Flex justifyContent="center" m={4}>
                    <Button
                      onClick={() => {
                        increaseCartQuantity(donut.id);
                        addToCart(donut);
                        showToast(donut);
                        setAddedDonuts((prev) => new Set(prev.add(donut.id)));
                      }}
                      bg={"pink.300"}
                      rounded={"full"}
                      color={"white"}
                      transition="transform 0.2s ease-out"
                      _hover={{ transform: "scale(1.1)" }}
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
