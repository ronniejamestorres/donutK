import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ReactElement } from "react";
import { GiDonut } from "react-icons/gi";

import { FaTruck } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
}

const Card = ({ heading, description, icon }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderLeftColor={"pink.300"}
      borderBottomColor={"orange.300"}
      borderRadius="xl"
      overflow="hidden"
      mb={5}
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("orange.300", "orange.200")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function gridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={8} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight={"bold"}
          fontFamily={"Gloria Hallelujah"}
        >
          Our 
      
          <Text as={'span'} color={'pink.300'}>
         <span> Services</span>
        
          </Text>
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Donuts are the perfect pick-me-up on a busy day or a sweet reward for
          a job well done. 
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={12}>
        <Flex
          flexWrap="wrap"
          gridGap={8}
          justify="center"
          fontFamily={"Gloria Hallelujah"}
        >
          <Card
            heading={"Donuts"}
            icon={<Icon as={GiDonut} w={10} h={10} />}
            description={
              "We offer a variety of delicious donuts that are sure to satisfy your sweet tooth.Our menu features classic flavors like glazed and chocolate, as well as unique options like maple bacon and matcha green tea."
            }
          />
          <Card
            heading={"Delivery"}
            icon={<Icon as={FaTruck} w={10} h={10} />}
            description={
              "Not in the mood to leave your house? No problem! We offer convenient delivery options so you can enjoy our tasty treats from the comfort of your own home. Simply place your order online and well take care of the rest."
            }
          />
          <Card
            heading={"Ordering online"}
            icon={<Icon as={AiOutlineShoppingCart} w={10} h={10} />}
            description={
              "our website makes it easy to browse our menu, customize your order, and pay securely. Whether you are ordering a dozen donuts for the office or just treating yourself to a midday snack, we have got you covered."
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
