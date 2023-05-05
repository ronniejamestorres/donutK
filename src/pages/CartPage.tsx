import { Box, Text } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { Image } from "@chakra-ui/react";

const CartPage: React.FC = () => {
  const { cart } = useCart();

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Your Cart
      </Text>
      {cart.map((donut) => (
        <Box key={donut.id} mb={4}>
          <Text fontSize="xl">{donut.name}</Text>
          <Image src={donut.img} alt={donut.name} height={"100px"} />
          <Text>${donut.price.toFixed(2)}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default CartPage;
