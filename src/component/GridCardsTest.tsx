import { useState, useEffect, createContext, useContext } from "react";
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
        <Box color="white" p={3} bg="orange.300" borderRadius="md">
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
        <Box color="white" p={3} bg="cyan.300" borderRadius="md">
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

  return (
    <>
      <Flex justify={"center"} gap={"4"} m={"4"}>
        <IconButton
          aria-label="Previous Donuts"
          icon={<ArrowBackIcon />}
          onClick={handlePreviousDonuts}
        />

        <IconButton
          aria-label="Next Donuts"
          icon={<ArrowForwardIcon />}
          onClick={handleNextDonuts}
        />
      </Flex>

      <Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}>
        {displayedDonuts.map((donut) => (
          <GridItem key={donut.id}>
            <Image src={donut.img} alt={donut.name} />

            <Text>{donut.name}</Text>

            <Text>${donut.price.toFixed(2)}</Text>

            <Text>{donut.qty} left</Text>

            <Divider />

            <Button
              onClick={() => {
                increaseCartQuantity(donut.id);
                addToCart(donut);
                showToast(donut);
                setAddedDonuts((prev) => new Set(prev.add(donut.id)));
              }}
            >
              Add to cart
            </Button>

            {/* Decrease button */}
            <Button
              isDisabled={getCartItemQuantity(donut.id) === 0}
              onClick={() => {
                decreaseNumberQuantity(donut.id);
                decreaseCartQuantity(donut.id);
                showDecreasedToast(donut);
              }}
            >
              Decrease
            </Button>

            {/* Remove button */}
            <Button
              // Disable the button if the cart is empty or the item quantity is 0
              isDisabled={getCartItemQuantity(donut.id) === 0}
              onClick={() => {
                removeFromCart(donut.id);
                removeNumberCart(donut.id);
                showRemovedToast(donut);

                // Remove the donut from the addedDonuts state
                setAddedDonuts((prev) => {
                  const updatedSet = new Set(prev);
                  updatedSet.delete(donut.id);
                  return updatedSet;
                });
              }}
            >
              Remove
            </Button>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default GridCardsTest;
