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
function MiniGridCards(): JSX.Element {
  const { increaseCartQuantity } = useShoppingCart();
  const [addedDonuts, setAddedDonuts] = useState(new Set());
  const sliderRef = useRef<Slider | null>(null);

  const [donutData, setDonutData] = useState([]);
  const [displayedDonuts, setDisplayedDonuts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const { data } = useQuery(GET_DONUTS);

  const { addToCart } = useCart();

  useEffect(() => {
    if (data) {
      setDonutData(data.donuts);
      setDisplayedDonuts(data.donuts.slice(0, 4));
    }
  }, [data]);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
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
      <Flex justifyContent={"center"}>
        <Text
          as="h1"
          fontSize="3xl"
          fontWeight="bold"
          fontFamily={"Gloria Hallelujah"}
        >
          Missed a donut ?
        </Text>
      </Flex>
      <Flex justify={"center"} gap={"4"} m={"10"}>
        <IconButton
          alignSelf="center"
          color={"orange.700"}
          aria-label="Previous Donuts"
          size="lg"
          icon={<ArrowBackIcon />}
          onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
          bg={"orange.200"}
        />

        <IconButton
          alignSelf="center"
          bg={"orange.200"}
          aria-label="Next Donuts"
          size="lg"
          icon={<ArrowForwardIcon />}
          onClick={() => sliderRef.current && sliderRef.current.slickNext()}
          w={"fit-content"}
          rounded={"full"}
          transition="transform 0.2s ease-out"
          _hover={{ transform: "scale(1.5)" }}
          color={"orange.700"}
        />
      </Flex>
      <Box
        overflow={"hidden"}
        rounded={"xl"}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
        m={10}
      >
        <Slider ref={sliderRef} {...settings}>
          {donutData.map((donut: Donut) => (
            <Box>
              <Box key={donut.id} bg={"white"} rounded={"3xl"} p={12}>
                <Flex justifyContent={"center"}>
                  <Image
                    src={donut.img}
                    alt={donut.name}
                    cursor="pointer"
                    onClick={() => {
                      const donutIdAsNumber = parseInt(donut.id, 10);
                      increaseCartQuantity(donutIdAsNumber);
                      addToCart(donut);
                      showToast(donut);
                      setAddedDonuts((prev) => new Set(prev.add(donut.id)));
                    }}
                    w={{ base: "100px", md: "100px" }}
                    transition="transform 0.2s ease-out"
                    _hover={{ transform: "scale(2)" }}
                  />
                </Flex>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default MiniGridCards;
