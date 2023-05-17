import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  ReactNode,
} from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { Image } from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
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

interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  stripeProductId: string;
  description: string;
  ingredients: string;
  qty: number;
  date: string;
  thumbsUp: number;
  thumbsDown: number;
}

type AggregatedItems = {
  [key: string]: CartItem;
};

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

const Checkout: React.FC = () => {
  const size = useBreakpointValue({
    base: "300px",
    md: "600px",
    lg: "1000px",
    xl: "800px",
  });
  const { data } = useQuery(GET_DONUTS);
  const { increaseCartQuantity, removeNumberCart, decreaseNumberQuantity } =
    useShoppingCart();
  const [displayedDonuts, setDisplayedDonuts] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [addedDonuts, setAddedDonuts] = useState(new Set());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cart } = useCart();

  const taxRate = 0.1; // You can adjust the tax rate accordingly
  const subtotal = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );
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
  const taxes = subtotal * taxRate;
  const totalAmount = subtotal + taxes;
  console.log("cart is ", cart);
  const handleCheckout = async () => {
    try {
      const aggregatedCart = aggregateCartItems(mapDonutsToCartItems(cart)); // get the aggregated cart items

      const line_items = aggregatedCart.map((item) => ({
        price: item.stripeProductId,
        quantity: item.quantity,
      }));

      const response = await fetch(
        "https://donutk-backend-pifrn.ondigitalocean.app/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            line_items,
          }),
        }
      );
      const data = await response.json();
      if (data.url) {
        window.location = data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mapDonutsToCartItems = (donuts: Donut[]): CartItem[] => {
    return donuts.map((donut) => ({
      ...donut,
      quantity: donut.cartQty || 0,
      ingredients: Array.isArray(donut.ingredients)
        ? donut.ingredients.join(", ")
        : donut.ingredients,
    }));
  };

  const convertDonutToCartItem = (donut: Donut): CartItem => {
    return {
      ...donut,
      quantity: donut.cartQty || 0,
      ingredients: Array.isArray(donut.ingredients)
        ? donut.ingredients.join(", ")
        : donut.ingredients,
    };
  };

  const aggregateCartItems = (cartItems: CartItem[]): CartItem[] => {
    const aggregatedItems: AggregatedItems = {};
    cartItems.forEach((item) => {
      const key = item.stripeProductId; // use the stripeProductId as the key
      if (aggregatedItems[key]) {
        aggregatedItems[key].quantity += 1; // increment the quantity if the item already exists
      } else {
        aggregatedItems[key] = { ...item, quantity: 1 }; // create a new item with quantity 1
      }
    });
    return Object.values(aggregatedItems); // convert the object to an array
  };

  const aggregatedCart = aggregateCartItems(cart.map(convertDonutToCartItem)); // get the aggregated cart items

  const showToast = (donut: CartItem) => {
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
  const showDecreasedToast = (donut: CartItem) => {
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
  const showRemovedToast = (donut: CartItem) => {
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

  return (
    <>
      <Container maxW={"full"} mt={"100"} mb={"100"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          <GridItem
            colSpan={{ base: 1, md: 2 }}
            bg={"gray.100"}
            h={"xl"}
            p={4}
            borderRadius={4}
            rounded={"xl"}
            overflow={"scroll"}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
          >
            <Box maxW={{ base: "xl", md: "full" }}>
              <Text
                as="h1"
                fontSize="3xl"
                fontWeight="bold"
                mb={4}
                fontFamily={"Gloria Hallelujah"}
                bgColor={"pink.300"}
                rounded={"lg"}
              >
                Shopping Bag
              </Text>
              {aggregatedCart.map((donut) => (
                <Box key={donut.id} mb={4}>
                  <Flex alignItems="center">
                    <Image
                      src={donut.img}
                      alt={donut.name}
                      height={"150px"}
                      bg={"gray.200"}
                      mr={2}
                      rounded={"full"}
                    />
                    <Box ml={4}>
                      <Text
                        fontSize="xl"
                        fontWeight={"bold"}
                        fontFamily={"Gloria Hallelujah"}
                      >
                        {donut.name}
                      </Text>
                      <Text fontSize={"xl"} fontWeight={"bold"}>
                        ${donut.price.toFixed(2)}
                      </Text>
                      <Text>Quantity: {donut.quantity}</Text>
                    </Box>
                  </Flex>

                  <Flex justifyContent="center" flexDirection={"row"}>
                    <Button
                      onClick={() => {
                        increaseCartQuantity(donut.id);
                        addToCart({
                          ...donut,
                          ingredients: donut.ingredients.split(", "), // assuming ingredients are comma-separated in the 'CartItem' type
                        });
                        showToast(donut);
                        setAddedDonuts((prev) => new Set(prev.add(donut.id)));
                      }}
                      bg={"pink.300"}
                      rounded={"full"}
                      color={"white"}
                      transition="transform 0.2s ease-out"
                      _hover={{ transform: "scale(1.1)" }}
                      m={2}
                    >
                      <ImPlus />
                    </Button>

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
                </Box>
              ))}
            </Box>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, md: 2 }}
            mt={{ base: 6, md: 0 }}
            bg="cyan.100"
            p={4}
            borderRadius={4}
            rounded={"xl"}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              h="100%"
            >
              <Text fontSize="3xl" m={4} textAlign="center">
                Order description
              </Text>

              <Box fontWeight="bold" fontSize="xl" textAlign="center">
                <Text>Total Amount:</Text>
                <Flex justifyContent="center" fontSize="4xl">
                  <Box>${subtotal.toFixed(2)}</Box>
                </Flex>
              </Box>

              <Box mt={4}>
                <Button
                  bg="pink.300"
                  size="lg"
                  onClick={handleCheckout}
                  color={"pink.700"}
                  transition="transform 0.2s ease-out"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  Checkout
                </Button>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default Checkout;
