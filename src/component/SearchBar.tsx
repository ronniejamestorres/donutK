import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import data from "../data/donutData.json";

type Donut = {
  _id: string;
  name: string;
  img: string;
  description: string;
  price: number;
  ingredients: string;
  qty: number;
  date: string;
  thumbsUp: number;
  thumbsDown: number;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Donut[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = data.filter((donut) =>
      donut.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const searchTerms = data.map((donut) => donut.name);

  return (
    <Box
      display="flex"
      alignItems="center"
      mt={"10"}
      pl={{ base: "40px", md: "100px" }}
      pr={{ base: "40px", md: "100px" }}
      p={"10px"}
    >
      <FormControl>
        <FormLabel htmlFor="search">Search Donuts</FormLabel>
        <Stack direction="row">
          <Input
            type="text"
            id="search"
            placeholder="Enter a donut name"
            value={searchTerm}
            onChange={handleChange}
            list="searchTerms"
          />
          <datalist id="searchTerms">
            {searchTerms.map((term) => (
              <option key={term} value={term} />
            ))}
          </datalist>
          <Button bg={"pink.400"} onClick={handleSearch} color={"white"}>
            Search
          </Button>
        </Stack>
      </FormControl>
      {searchResults.length > 0 && (
        <Box mt={8}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {searchResults.map((donut) => (
              <GridItem key={donut._id}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Flex justifyContent="center">
                    <Image src={donut.img} alt={donut.name} height={"100px"} />
                  </Flex>
                  <Box p="6">
                    <Flex alignItems="baseline">
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="gray.600"
                        mr={2}
                      >
                        ${donut.price.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="semibold"
                        textTransform="uppercase"
                      >
                        {donut.qty} left
                      </Text>
                    </Flex>
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {donut.name}
                    </Box>
                    <Box>
                      <Text
                        mt={2}
                        color="gray.500"
                        fontSize="sm"
                        lineHeight="tall"
                      >
                        {donut.description}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
