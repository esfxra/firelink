import NextLink from 'next/link';
import { Text, Heading, Link, Divider, Center, Box } from '@chakra-ui/react';

interface SignInLayoutProps {
  children: React.ReactNode;
}

export default function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <Box w="100%" maxW="350px">
      <Heading as="h2">Sign in</Heading>
      <Box mt={5}>{children}</Box>
      <Divider mt={5} mb={5} />
      <Center>
        <Text>
          Don&apos;t have an account?{' '}
          <NextLink href="/auth/signup" passHref>
            <Link bgGradient="linear(to-r, red.500, orange.500)" bgClip="text">
              Sign up
            </Link>
          </NextLink>
        </Text>
      </Center>
    </Box>
  );
}
