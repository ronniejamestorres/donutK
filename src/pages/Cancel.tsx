import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdCancel} from "react-icons/md";
import backgroundImage from "../images/bg-grey-01.svg";
import "../App.css";

function Cancel() {
 

  return (
    <Box
      maxW="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="100vw"
      backgroundImage={`url(${backgroundImage})`}
      backgroundColor={"gray.200"}
      
      backgroundSize={{ base: "cover", md: "cover" }}
      bgRepeat="no-repeat"
      bgPosition="center"
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
      <MdCancel size={60} color="grey"/>
      <p> Your command was cancelled.</p>
      <Link to="/showall">
      <Button
            bgColor={"pink.300"}
            rounded={"full"}
            mt={10}
            mb={5}
            
          >
          Try again
        </Button>
      </Link>
    </Box>
    </Box>
  );
}

export default Cancel;







