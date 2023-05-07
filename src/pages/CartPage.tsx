import { Box, Container, Flex, Text, Button } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { Image } from "@chakra-ui/react";

const CartPage: React.FC = () => {
  const { cart } = useCart();

  const taxRate = 0.1; // You can adjust the tax rate accordingly

  const subtotal = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

  const taxes = subtotal * taxRate;
  const totalAmount = subtotal + taxes;

  const handleCheckout = async () => {
    try {
      console.log(cart);
      const line_items = cart;

      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
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
      window.location = data.url;
    } catch (err) {
      console.log(err);
    }
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

  return (
    <Container maxW="xl" mt={{ sm: 5, md: 8, lg: 10, xl: 12 }} bg={"gray.100"}>
      <Box>
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
          </Box>
        ))}

        <Box mt={6} bg="cyan.100" p={4} borderRadius={4} rounded={"xl"}>
          <Text fontSize="xl" mb={2} fontFamily={"Gloria Hallelujah"}>
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
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
