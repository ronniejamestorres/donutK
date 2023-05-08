import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import wave from "../images/wave3.svg";
import donutdetour from "../images/donutdetour.svg";
import "../App.css";

export default function hero() {
  return (
    <Box
      backgroundImage={`url(${wave})`}
      backgroundRepeat="no-repeat"
      backgroundPosition={{ base: "center", md: "center", xl: "center" }}
      backgroundSize={{ base: "cover", md: "cover", lg: "cover", xl: "cover" }}
      h={{ base: "90vh", md: "50vh", lg: "95vh", xl: "95vh" }}
      w={{ base: "100vw", md: "100vw", lg: "100vw", xl: "100vw" }}
    >
      <Container maxW={"6xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 2, md: 5 }}
          py={{ base: 4, md: 2, lg: 30, xl: 30 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 5 }}>
            <Heading
              fontFamily={"Gloria Hallelujah"}
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{
                base: "3xl",
                sm: "4xl",
                md: "4xl",
                lg: "6xl",
                xl: "6xl",
              }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  bg: "pink.300",
                  zIndex: -1,
                }}
              >
                Donuts Kingdom,
              </Text>
              <br />
              <Text as={"span"} color={"pink.300"}>
                eat
              </Text>
              <br />
              <Text as={"span"} color={"orange.300"}>
                everywhere!
              </Text>
            </Heading>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"md"}
                fontWeight={"normal"}
                px={3}
                colorScheme={"pink"}
                bg={"pink.400"}
                _hover={{ bg: "pink.300" }}
              >
                Show menu
              </Button>
              <Button rounded={"full"} size={"md"} fontWeight={"normal"} px={3}>
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"400px"}
              width={"full"}
              overflow={"hidden"}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 4, loop: Infinity },
                }}
              >
                <Image
                  alt={"Hero Image"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "300px", md: "350px", xl: "400px" }}
                  src={donutdetour}
                />
              </motion.div>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
