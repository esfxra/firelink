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
import PerkList from './PerkList';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <Flex h="100vh">
      <Flex p={{ base: 5 }} flex={1} direction="column">
        <Logo />

        <Flex flex={1} align="center" justify="center">
          <Flex
            w="100%"
            maxW="1024px"
            direction={{ base: 'column', md: 'row' }}
          >
            <Flex
              display={{ base: 'none', md: 'flex' }}
              mt={{ base: '20px', md: 0 }}
              flex={1}
              align="center"
              justify={{ base: 'flex-start', md: 'center' }}
            >
              <PerkList />
            </Flex>

            <Flex flex={1} align="center" justify="center">
              <Box w="100%" maxW="350px">
                <Heading as="h2">Sign up</Heading>
                {/* A list of the perks of creating an account */}
                <Box display={{ base: 'block', md: 'none' }}>
                  <PerkList />
                </Box>
                {/* Sign up options */}
                {children}
                <Divider mt={5} mb={5} />
                {/* Link to user authentication */}
                <Center>
                  <Text>
                    Already have an account?{' '}
                    <NextLink href="/auth/signin" passHref>
                      <Link
                        bgGradient="linear(to-r, red.500, orange.500)"
                        bgClip="text"
                      >
                        Sign in
                      </Link>
                    </NextLink>
                  </Text>
                </Center>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
