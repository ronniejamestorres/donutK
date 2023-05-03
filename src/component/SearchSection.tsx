import { SimpleGrid, useBreakpointValue, useBoolean } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import SearchText from "./SearchText";

function SearchSection() {
  const columns = useBreakpointValue({ base: 1, md: 2 });
  return (
    <SimpleGrid columns={columns} spacing="10px" pt={"20"}>
      <SearchText />
      <SearchBar />
    </SimpleGrid>
  );
}

export default SearchSection;
