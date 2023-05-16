import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { gql } from "@apollo/client";
import DkLogo from "../images/services.png";

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const responseGoogleFailure = () => {
    console.log("Login failed.");
  };

  const responseGoogleSuccess = async (response: CredentialResponse) => {
    const googleIdToken = response.credential;

    try {
      const client = new ApolloClient({
        link: new HttpLink({
          uri: "https://donutk-backend-pifrn.ondigitalocean.app/graphql",
        }),
        cache: new InMemoryCache(),
      });
      const { data } = await client.mutate({
        mutation: gql`
          mutation LoginWithGoogle($googleIdToken: String!) {
            loginWithGoogle(googleIdToken: $googleIdToken) {
              token
              user {
                id
                email
                firstName
                lastName
                createdAt
                guest
              }
            }
          }
        `,
        variables: { googleIdToken },
      });

      localStorage.setItem("loginUser", data.loginWithGoogle);
      toast({
        render: () => (
          <Box color="white" p={3} bg="pink.300" borderRadius="md">
            <Flex alignItems="center">
              <Text color={"pink.700"} fontWeight={"bold"}>
                {"Hello, " + data.loginWithGoogle.user.firstName}
              </Text>
            </Flex>
          </Box>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      navigate("/showall");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxW="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      minWidth="100vw"
      bg={"pink.100"}
      bgImage={DkLogo}
      bgRepeat="no-repeat"
      bgPosition="initial"
      backgroundSize={{ base: "cover", md: "cover" }}
    >
      <Box
        bg={"gray.100"}
        h={"300px"}
        w={"300px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="30vh"
        minWidth="30vw"
        rounded={"xl"}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={responseGoogleSuccess}
            onError={responseGoogleFailure}
          />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
}
