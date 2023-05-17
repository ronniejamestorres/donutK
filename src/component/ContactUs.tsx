import React from "react";
import { Box, Heading, Text, Center } from "@chakra-ui/react";

interface ContactUsProps {}

const ContactUs: React.FC<ContactUsProps> = () => {
  return (
    <Center>
      <Box textAlign="center" maxWidth="600px" py="4" m={"40"}>
        <Heading as="h2" size="lg" mb="4">
          Contact Us
        </Heading>
        <Text fontSize="md" lineHeight="1.7" m={"20"}>
          We'd love to hear from you! If you have any questions, suggestions, or
          feedback, please don't hesitate to reach out. You can email us at
          hello@donuts.com or give us a call at (123) 456-7890.
        </Text>
      </Box>
    </Center>
  );
};

export default ContactUs;
