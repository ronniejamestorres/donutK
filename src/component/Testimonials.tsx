import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import '../App.css'

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('cyan.100', 'gray.800')}
      rounded={"xl"}
      
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      p={8}
      
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('cyan.100', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={100}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('white', 'gray.700')}>
  <Container maxW={'4xl'} py={16} as={Stack} spacing={24}>
    <Stack spacing={0} align={'center'}>
    <Heading
  fontFamily={'Gloria Hallelujah'}
  lineHeight={2}
  fontSize={{ base: "2xl", sm: "4xl",md:"4xl",lg:"5xl",xl:"5xl"}}
  >
  <Text
    as={'span'}
    position={'relative'}
    _after={{
      content: "''",
      width: 'full',
      height: '30%',
      position: 'absolute',
      bottom: 1,
      left: 0,
      bg: 'pink.300',
      zIndex: -1,
    }}
  >
    What our {' '}
    <Text as={'span'} color={'pink.300'}>
      customers
    </Text>{' '}
    are saying?
  </Text>
</Heading>

    </Stack>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: 8, md: 4,lg: 4, xl: 8 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialText>
              I love the donuts at this shop! They're always fresh and delicious.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://randomuser.me/api/portraits/men/32.jpg'
              }
              name={'Abel Cooper'}
              title={'Regular customer'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
             
              <TestimonialText>
              I had never tried these donuts before, but they were amazing. I'll definitely be back!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://randomuser.me/api/portraits/women/65.jpg'
              }
              name={'Vlere Dupont '}
              title={'First-time customer'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              
              <TestimonialText>
              I've tried donuts from all over the city, and these are by far the best. Keep up the great work!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://randomuser.me/api/portraits/men/44.jpg'
              }
              name={'Bob Johnson'}
              title={'Donut enthusiast'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}