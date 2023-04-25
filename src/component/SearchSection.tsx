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
  useBoolean,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import SearchText from "./SearchText";

function SearchSection() {
  const columns = useBreakpointValue({ base: 1, md: 2 });
  const [flag, setFlag] = useBoolean();
  return (
    <SimpleGrid columns={columns} spacing="10px" pt={"20"}>
      <SearchText />
      <SearchBar />
    </SimpleGrid>
  );
}

export default SearchSection;
