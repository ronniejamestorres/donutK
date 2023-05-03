import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Navbar from "./Navbar";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function StoreItem({ id, name, price, imgUrl }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card maxW="sm">
      <Navbar />
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />

      <div>
        {quantity === 0 ? (
          <Button onClick={() => increaseCartQuantity(id)}>Add to cart</Button>
        ) : (
          <Flex>
            <Button
              onClick={() => decreaseCartQuantity(id)}
              variant="solid"
              colorScheme="blue"
            >
              -
            </Button>
            <div>{quantity}</div>in cart
            <Box>
              <Button
                onClick={() => increaseCartQuantity(id)}
                variant="solid"
                colorScheme="blue"
              >
                +
              </Button>
            </Box>
            <Button onClick={() => removeFromCart(id)} bg={"red.500"}>
              remove
            </Button>
          </Flex>
        )}
      </div>
    </Card>
  );
}

export default StoreItem;
