import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  useBreakpointValue,
  Image,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";

function GridCards({ donutData }) {
  const columns = useBreakpointValue({ base: 2, md: 4 }); // 2 columns on small screens, 3 on larger screens
  return (
    <SimpleGrid columns={columns} spacing="10px" margin="50px">
      <Card
        maxW="sm"
        bg="#E6E6E6"
        borderRadius="50px 50px 50px 50px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        transition="transform 0.2s ease-out"
        _hover={{ transform: "scale(1.1)" }}
      >
        <CardBody margin={"4"}>
          <Image
            src="https://png2.cleanpng.com/sh/c210e8eb09c2a42192152558264e145b/L0KzQYi4UcI4N2EAfZGAYUHmdIeBUcNjP5cAT5C6M0a2QYW6UcE2OWI9S6s8NkG1RISATwBvbz==/5a1cd6813b7f97.1363143115118393612437.png"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">{donutData[0].name}</Heading>
            <Text>{donutData[0].ingredients}</Text>
            Image Dispo Prix Ingredients Quantité Date Thumbs up or down
            <Text color="blue.600" fontSize="2xl">
              {donutData[0].price}$
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="orange">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Card
        maxW="sm"
        bg="#E6E6E6"
        height="fit"
        borderRadius="50px 50px 50px 50px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        transition="transform 0.2s ease-out"
        _hover={{ transform: "scale(1.1)" }}
      >
        <CardBody margin={"4"}>
          <Image
            src="https://d2zv6vzmaqao5e.cloudfront.net/foodticket/images/6468/_cms1667989623_cinnamon-swirl.png"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">Hot Donut</Heading>
            <Text>Eat this Eat that</Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="orange">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Card
        maxW="sm"
        bg="#E6E6E6"
        height="fit"
        borderRadius="50px 50px 50px 50px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        transition="transform 0.2s ease-out"
        _hover={{ transform: "scale(1.1)" }}
      >
        <CardBody margin={"4"}>
          <Image
            src="https://tb-static.uber.com/prod/image-proc/processed_images/d7aa2ec6e0b783acad468958d24be077/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">Hot Donut</Heading>
            <Text>Eat this Eat that</Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="orange">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Card
        maxW="sm"
        bg="#E6E6E6"
        height="fit"
        borderRadius="50px 50px 50px 50px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        transition="transform 0.2s ease-out"
        _hover={{ transform: "scale(1.1)" }}
      >
        <CardBody margin={"4"}>
          <Image
            src="https://tb-static.uber.com/prod/image-proc/processed_images/ad1a828916e460172a4380afd01638a6/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">Hot Donut</Heading>
            <Text>Eat this Eat that</Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="orange">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}

export default GridCards;
