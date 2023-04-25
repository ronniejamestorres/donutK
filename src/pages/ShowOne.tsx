import { useState, useEffect } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import donuts from "../data/donutData.json";

function ShowOne() {
  const [donutData, setDonutData] = useState(donuts);
  const [selectedDonutId, setSelectedDonutId] = useState(null);

  useEffect(() => {
    // Automatically update the donut data when the JSON file changes
    const intervalId = setInterval(() => {
      fetch("/donuts.json")
        .then((response) => response.json())
        .then((data) => setDonutData(data));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = (id) => {
    setSelectedDonutId(id === selectedDonutId ? null : id);
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      m={4}
    >
      {donutData.map((donut) => (
        <GridItem key={donut.id}>
          <Box
            borderWidth="1px"
            borderRadius="50px 50px 50px 50px"
            overflow="hidden"
            boxShadow="lg"
            bg={selectedDonutId === donut.id ? "pink" : "#E6E6E6"}
            transition="transform 0.2s ease-out"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => handleCardClick(donut.id)}
          >
            <Box h="100px" w="200px" bg={donut.img} />
            <Text fontSize="xl" fontWeight="bold" p={4}>
              {donut.flavor}
            </Text>
            {selectedDonutId === donut.id && (
              <Box p={4}>
                <Text mb={2} fontSize="2xl">
                  {donut.name}
                </Text>
                <Text mb={2}>Description: {donut.description}</Text>
                <Text mb={2}>Price: {donut.price}</Text>
                <Text mb={2}>Frosting: {donut.frosting}</Text>
                <Text mb={2}>Sprinkles: {donut.sprinkles ? "Yes" : "No"}</Text>
                <Text mb={2}>Quantity: {donut.qty}</Text>
              </Box>
            )}
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

export default ShowOne;
