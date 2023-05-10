import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Image,
  } from "@chakra-ui/react";
  import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
  import { ReactNode } from "react";
  import DkLogo from "../images/DkLogo-01.svg";
  import { MdBorderClear } from "react-icons/md";
  
  const Logo = (props: any) => {
    return (
      <Box
        bgColor={"white"}
        borderRadius="50px 50px 50px 50px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Image
          boxSize={{ base: "80px", md: "100px" }}
          objectFit="contain"
          src={DkLogo}
          alt="DK Logo"
          p={4}
        />
      </Box>
    );
  };
  
  const SocialButton = ({
    children,
    label,
    href,
  }: {
    children: ReactNode;
    label: string;
    href: string;
  }) => {
  
  return (
      <chakra.button
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        as={"a"}
        href={href}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function FooterLanding() {
    return (
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("grey.200", "gray.200")}
        w="100%"
        p={"2"}
        
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column-reverse", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Logo />
          <Text color={"black"}>© DONUTS KINGDOM. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }