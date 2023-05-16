import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

type Donut = {
  name: string;
  price: number;
};

type BasketProps = {
  donuts: Donut[];
};

function Basket({ donuts }: BasketProps) {
  return (
    <Box mt={6}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Basket Donuts:
      </Text>
      <VStack spacing={2} align="stretch">
        {donuts.map((donut, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="md" fontWeight="bold">
              {donut.name}
            </Text>
            <Text fontSize="sm">Price: ${donut.price.toFixed(2)}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default Basket;
