import NextLink from 'next/link';
import {
  Heading,
  Text,
  Link,
  Center,
  Divider,
  Flex,
  Box,
} from '@chakra-ui/react';

import Logo from '../../components/Logo';

interface SignInLayoutProps {
  children: React.ReactNode;
}

export default function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <Flex h="100vh">
      <Flex p={{ base: 5 }} flex={1} direction="column">
        <Logo />

        <Flex flex={1} align="center" justify="center">
          <Box w="100%" maxW="350px">
            {/* Sign in options */}
            <Heading as="h2">Pick a username</Heading>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
