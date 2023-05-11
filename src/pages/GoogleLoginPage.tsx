import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, useToast } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import DkLogo from "../images/DkLogo-01.svg";


export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const toast = useToast(); // Ajout de useToast ici

  const responseGoogleFailure = (response) => {
    console.log(response);
  };
  const responseGoogleSuccess = async (response) => {
    const googleIdToken = response.credential;
    
    try {
      const client = new ApolloClient({
        link: new HttpLink({
          uri: 'https://donutk-backend-pifrn.ondigitalocean.app/graphql',
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
      
      
      localStorage.setItem('loginUser', data.loginWithGoogle);
      toast({ // Modification ici pour utiliser la fonction toast
        title: "Hello, " + data.loginWithGoogle.user.firstName, // Modification ici pour afficher le prénom
        status: "success",
        duration: 5000,
        isClosable: true,
        colorScheme: "pink",
        

        
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
    bgPosition="center"
  >
    <Box
      bg={"gray.100"}
      h={  "300px" }
      w={ "300px" }
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
          onFailure={responseGoogleFailure}
          render={({ onClick }) => (
            <Button
              onClick={onClick}
              leftIcon={<FcGoogle />}
              colorScheme="red"
            >
              Sign in with Google
            </Button>
          )}
        />
      </GoogleOAuthProvider>
    </Box>
  </Box>
);
}
