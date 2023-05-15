import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import { Box, Flex, Text } from "@chakra-ui/react";


const LogoutButton = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loginUser") !== null);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setIsLoggedIn(false);
    
    toast({
      render: () => (
        <Box color="white" p={3} bg="orange.200" borderRadius="md">
          <Flex alignItems="center">
            <Text color={"orange.700"} fontWeight={"bold"}>
              You have been logged out.
            </Text>
          </Flex>
        </Box>
      ),
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    navigate("/");
  };
  

  return (
    <>
      {isLoggedIn && (
        <Button onClick={handleLogout} colorScheme="pink">
          Logout
        </Button>
      )}

      {!isLoggedIn && (
        <NavLink to="/GoogleLoginPage">
          <Button
            variant="link"
            size="lg"
            className="font-weight-400"
            colorScheme="pink"
            color="orange.300"
            fontWeight="bold"
            _hover={{
              textDecoration: "none",
              color: "orange.400",
            }}
          >
            Login
            <RiLoginCircleFill className="me-2" color="pink"/>
          </Button>
        </NavLink>
      )}
    </>
  );
};

export default LogoutButton;
