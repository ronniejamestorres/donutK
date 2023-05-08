import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../App.css";

function Success() {
  return (
    <Box
      maxW="full"
      fontSize="xl"
      textAlign="center"
      mx="auto"
      fontFamily={"Gloria Hallelujah"}
      mt={20}
      

      >
      <p>Your command was successful. Thank you for shopping with us!</p>
      <Link to="/showall">
        <Button
          bgColor={"pink.300"}
          rounded={"full"}
          mt={4}
          mr={2}
          fontFamily={"Gloria Hallelujah"}
        >
          Continue Shopping
        </Button>
      </Link>
    </Box>
  );
}

export default Success;



