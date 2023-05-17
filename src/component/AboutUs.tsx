import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import donutImg from "../images/1540d4496a4e5e7fd642523fe792ab8c.jpg";

interface DonutStoryProps {}

const AboutUs: React.FC<DonutStoryProps> = () => {
  return (
    <Box
      pt={"100px"}
      pr={{ base: "10px", md: "80px", lg: "80px" }}
      pl={{ base: "10px", md: "80px", lg: "80px" }}
    >
      <Flex justifyContent={"center"}>
        <Text
          fontFamily={"Gloria Hallelujah"}
          lineHeight={1.3}
          fontWeight={600}
          fontSize={{
            base: "xl",
            sm: "4xl",
            md: "4xl",
            lg: "4xl",
            xl: "4xl",
          }}
        >
          DONUT KINGDOM
        </Text>
      </Flex>
      <Text
        fontSize="lg"
        lineHeight="1.7"
        p={{ base: "10px", md: "80px", lg: "80px" }}
      >
        Our delicious journey began in 2010, when our founder, Jane Doe, decided
        to pursue her passion for baking. She spent countless hours perfecting
        her donut recipes and experimenting with unique flavor combinations.
        After a year of tireless dedication, she opened our first donut shop in
        the heart of her hometown. The community quickly fell in love with our
        freshly baked, melt-in-your-mouth treats, and the rest is history.
      </Text>
      <Box>
        <Flex justifyContent={"center"}>
          <Image
            src={donutImg}
            alt="Donut"
            objectFit="cover"
            borderRadius="xl"
            marginBottom="1.5rem"
            w={"800px"}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default AboutUs;
