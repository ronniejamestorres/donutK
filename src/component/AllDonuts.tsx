import React from "react";
import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

const GET_DONUTS = gql`
  query Donuts {
    donuts {
      id
      name
      img
    }
  }
`;

const AllDonuts: React.FC = () => {
  const { data, loading, error } = useQuery(GET_DONUTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const colors = [
    "blue.200",
    "green.200",
    "red.200",
    "orange.200",
    "purple.200",
    "yellow.200",
    "cyan.200",
    "teal.200",
  ];

  return (
    <Flex justifyContent="center" wrap="wrap">
      {data.donuts.map(
        (
          donut: {
            id: React.Key | null | undefined;
            img: string | undefined;
            name: string | undefined;
          },
          index: number
        ) => (
          <Box
            key={donut.id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            m={4}
            backgroundColor={colors[index % colors.length]}
          >
            <Image
              src={donut.img}
              alt={donut.name}
              objectFit="cover"
              borderRadius="md"
              w={"100px"}
            />
          </Box>
        )
      )}
    </Flex>
  );
};

export default AllDonuts;
