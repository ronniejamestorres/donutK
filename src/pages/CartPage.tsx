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
import Navbar from "../component/Navbar";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Footer from "../component/Footer";
import backgroundImage from "../images/DK-card-bg-01.svg";

const CartPage: React.FC = () => {
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
      const line_items = cart;

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
      console.log(data);
      if (data.url) {
        console.log("data url is ", data.url);
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
      if (aggregatedItems[item.name]) {
        aggregatedItems[item.name].quantity += 1;
      } else {
        aggregatedItems[item.name] = { ...item, quantity: 1 };
      }
    });
    return Object.values(aggregatedItems);
  };

  const aggregatedCart = aggregateCartItems(cart);
  const handleDecreaseQuantity = (donutId) => {
    decreaseCartQuantity(donutId);
  };
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
            backgroundImage={`url(${backgroundImage})`}
            backgroundPosition="screen"
            backgroundSize={{ base: "full", md: "cover" }}
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
                        bg={"pink.400"}
                        transition="transform 0.2s ease-out"
                        _hover={{ bg: "cyan.100" }}
                        //_focus={{ boxShadow: "outline" }}
                        color={"white"}
                      >
                        +
                      </Button>
                      {/* Add the decrease button */}
                      <Button
                        onClick={() => handleDecreaseQuantity(donut.id)}
                        bg={"pink.200"}
                        ml={2}
                        transition="transform 0.2s ease-out"
                        _hover={{ bg: "cyan.100" }}
                        //_focus={{ boxShadow: "outline" }}
                        color={"white"}
                      >
                        -
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
              alignItems="center" // Center items vertically
              flexDirection="column" // Set the direction of the items to column
              borderRadius={4}
              rounded={"xl"}
            >
              <Text fontSize="3xl" fontFamily={"Gloria Hallelujah"} m={"4px"}>
                Order description
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                Subtotal: ${subtotal.toFixed(2)}
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                Taxes: ${taxes.toFixed(2)}
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                Total Amount: ${totalAmount.toFixed(2)}
              </Text>
              <Box mt={4}>
                <Button
                  bg="pink.300"
                  size="lg"
                  onClick={handleCheckout}
                  fontFamily={"Gloria Hallelujah"}
                >
                  Checkout
                </Button>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
