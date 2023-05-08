import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "../App.css";

function Cancel() {
 

  return (
    <Box 
      maxW="full"
      
      fontSize="xl"
      textAlign="center"
      mx={"auto"}
      fontFamily={"Gloria Hallelujah"}
      mt={20}
      

      >
      <p> Your command was cancelled. We're sorry to see you go!</p>
      <Link to="/">
        <Button
          bgColor={"pink.300"}
          rounded={"full"}
          mt={4}
          mr={2}
          fontFamily={"Gloria Hallelujah"}
        >
          Try again
        </Button>
      </Link>
    </Box>
  );
}

export default Cancel;







