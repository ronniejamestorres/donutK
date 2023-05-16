import { useState, useEffect } from "react";
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
  Divider,
  CloseButton,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useCart } from "../context/CartContext";
import { gql, useQuery } from "@apollo/client";

const GET_DONUTS = gql`
  query Donuts {
    donuts {
      name
      img
      description
      price
      ingredients
      qty
      date
      thumbsUp
      thumbsDown
      stripeProductId
      id
    }
  }
`;

type Donut = {
  id: string;
  _id: string;
  name: string;
  img: string;
  description: string;
  price: number;
  ingredients: string[]; // Change this line
  qty: number;
  date: string;
  thumbsUp: number;
  thumbsDown: number;
  stripeProductId: string;
};

const SearchBar = () => {
  const { increaseCartQuantity } = useShoppingCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [searchResults, setSearchResults] = useState<Donut[]>([]);
  const [selectedDonut, setSelectedDonut] = useState<Donut | null>(null);
  const [donutData, setDonutData] = useState<Donut[]>([]);
  const [showResults, setShowResults] = useState(true); // Add this state
  const { addToCart } = useCart();
  const { data, error, loading } = useQuery(GET_DONUTS);

  useEffect(() => {
    if (data) {
      setDonutData(data.donuts);
      setSearchTerms(data.donuts.map((donut: { name: any }) => donut.name));
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleClose = () => {
    setShowResults(false); // Set the state to false
  };
  const handleSearch = () => {
    const results = donutData.filter((donut) =>
      donut.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleDonutClick = (donut: Donut) => {
    setSelectedDonut(donut);
  };
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        mt={"10"}
        pl={{ base: "40px", md: "100px" }}
        pr={{ base: "40px", md: "100px" }}
        p={"10px"}
      >
        <FormControl>
          <Stack direction="row" alignItems="center">
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
            <Button
              bg={"pink.300"}
              onClick={handleSearch}
              color={"white"}
              rounded={"full"}
              p={"40px"}
            >
              <Search2Icon />
            </Button>
          </Stack>
        </FormControl>
      </Box>
      <Flex>
        {showResults && searchResults.length > 0 && (
          <Box>
            <CloseButton onClick={handleClose} /> {/* Add this close button */}
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap={4}
              p={4}
              rounded={"2xl"}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
              mb={"10px"}
            >
              {searchResults.map((donut) => (
                <GridItem key={donut.id}>
                  <Box
                    overflow="hidden"
                    borderWidth="1px"
                    p={"10px"}
                    h={{ base: "300px", md: "300px" }}
                    w={{ base: "auto", md: "300px" }}
                    borderRadius="3xl"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.35)"
                    bg={"white"}
                    transition="transform 0.2s ease-out"
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    <Flex
                      justifyContent="center"
                      w={{ base: "none", sm: "300px" }}
                    >
                      <Image
                        src={donut.img}
                        alt={donut.name}
                        height={"100px"}
                        onClick={() => handleDonutClick(donut)}
                        cursor="pointer"
                        m={"10px"}
                      />
                    </Flex>

                    <Box>
                      <Text fontWeight="bold" color="gray.600" mr={2}>
                        <Flex justifyContent={"center"}>
                          <Text fontSize="xl">{donut.name}</Text>
                        </Flex>
                        <Flex justifyContent={"center"}>
                          <Text fontSize="xl">${donut.price.toFixed(2)}</Text>
                        </Flex>
                      </Text>
                      <Flex justifyContent={"center"}>
                        <Text>{donut.qty} left</Text>
                      </Flex>
                    </Box>

                    <Divider />
                    <Flex justifyContent="center">
                      <Flex justifyContent="center">
                        <Box>
                          <Button
                            onClick={() => {
                              increaseCartQuantity(donut.id);
                              addToCart(donut);
                            }}
                            bg={"pink.300"}
                            rounded={"full"}
                            transition="transform 0.2s ease-out"
                            _hover={{ bg: "cyan.100" }}
                            //_focus={{ boxShadow: "outline" }}
                            color={"white"}
                          >
                            Add to cart
                          </Button>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default SearchBar;
