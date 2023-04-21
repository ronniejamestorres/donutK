import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";

function SearchSection() {
  const columns = useBreakpointValue({ base: 1, md: 2 });
  return (
    <SimpleGrid columns={columns} spacing="10px" margin="10px">
      <Card bg="none" boxShadow="0px 4px 4px rgba(0, 0, 0, 0)">
        <CardBody mt={"10"}>
          <Stack mt="2" spacing="3">
            <Heading color="orange.400" fontSize="5xl" size="">
              TRY OUR BEST
              <Text as="span" color="#F249A6" margin={"10px"}>
                DONUTS
              </Text>
              IN TOWN
            </Heading>
            <Text color="" fontSize="">
              Who loves donuts? Or perhaps it would be easier to ask, « Who
              doesn’t love donuts? » So, what are you waiting for, order our
              fresh donuts now!
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <SearchBar />
    </SimpleGrid>
  );
}

export default SearchSection;
