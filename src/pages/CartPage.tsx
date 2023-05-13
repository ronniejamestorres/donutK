import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { Image } from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Navbar from "../component/Navbar";
import GridCardsTest from "../component/GridCardsTest";
import FooterLanding from "../component/FooterLanding";
import { useEffect } from "react";

const CartPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { addToCart } = useCart();
  const { cart } = useCart();
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const taxRate = 0.1; // You can adjust the tax rate accordingly
  const subtotal = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

  const taxes = subtotal * taxRate;
  const totalAmount = subtotal + taxes;
  console.log("cart is ", cart);

  const handleCheckout = async () => {
    try {
      const aggregatedCart = aggregateCartItems(cart); // get the aggregated cart items
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

  const handleAddToCart = (donut) => {
    addToCart(donut);
  };
  const aggregateCartItems = (cartItems) => {
    const aggregatedItems = {};
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

  const aggregatedCart = aggregateCartItems(cart);

  return (
    <>
      <Navbar />
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
            maxW={{ base: "xl", md: "full" }}
            bg={"gray.100"}
            h={"xl"}
            p={4}
            borderRadius={4}
            rounded={"xl"}
            overflow={"scroll"}
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
                    <Box ml={4} fontFamily={"Gloria Hallelujah"}>
                      <Text fontSize="xl">{donut.name}</Text>
                      <Text>${donut.price.toFixed(2)}</Text>
                      <Text>Quantity: {donut.quantity}</Text>
                    </Box>
                  </Flex>
                  <Flex justifyContent={"center"} gap={""}>
                    <Box key={donut.id} m={4}>
                      <Button
                        onClick={() => {
                          increaseCartQuantity(donut.id);
                          addToCart(donut);
                        }}
                        borderColor={"pink.300"}
                        rounded={"full"}
                        variant="outline"
                        transition="transform 0.2s ease-out"
                        _hover={{ bg: "cyan.100" }}
                        //_focus={{ boxShadow: "outline" }}
                        color={"white"}
                        bg={"pink.300"}
                      >
                        {<AiFillPlusCircle />}
                      </Button>
                      {/* Add the decrease button */}
                      <Button
                        onClick={() => {
                          decreaseCartQuantity(donut.id);
                        }}
                        variant="outline"
                        rounded={"full"}
                        bg="orange.200"
                        color={"white"}
                        borderColor={"orange.200"}
                        ml={2}
                        transition="transform 0.2s ease-out"
                        _hover={{ bg: "cyan.100" }}
                        //_focus={{ boxShadow: "outline" }}
                      >
                        {<AiFillMinusCircle />}
                      </Button>
                    </Box>
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
                  <Box>${totalAmount.toFixed(2)}</Box>
                </Flex>
              </Box>

              <Box mt={4}>
                <Button
                  bg="pink.300"
                  size="lg"
                  onClick={handleCheckout}
                  fontFamily="Gloria Hallelujah"
                >
                  Checkout
                </Button>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>

      <GridCardsTest />
      <FooterLanding />
    </>
  );
};

export default CartPage;
