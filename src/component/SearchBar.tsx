import React, { ReactElement, ReactNode } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494" />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            borderRadius="50px 50px 50px 50px"
            border="1px solid #949494"
            bg={"pink.400"}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default SearchBar;
