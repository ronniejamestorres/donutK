import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import backgroundImage from "../images/services.png";

import "../App.css";

function Success() {
  return (
    <Box
      maxW="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="100vw"
      backgroundImage={`url(${backgroundImage})`}
      backgroundColor={"cyan.100"}
      
      backgroundSize={{ base: "cover", md: "cover" }}
      bgRepeat="no-repeat"
      bgPosition="initial"
      
    >
      <Box
        maxW="full"
        h={"300px"}
        w={"300px"}
        fontSize="xl"
        textAlign="center"
        mx="auto"
        px="4"
        fontFamily={"Gloria Hallelujah"}
        mt={15}
        bg={"gray.100"}
        minHeight="30vh"
        minWidth="30vw"
        rounded={"xl"}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        
        <BsBagCheckFill size={60} color="pink"/>
        <p>Order has saved!</p>
        

        <Link to="/">
          <Button
            bgColor={"pink.300"}
            rounded={"full"}
            mt={10}
            mb={5}
            
          >
            Return Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Success;
