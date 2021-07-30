import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import {
  Flex,
  Heading,
  Button,
  Text,
  Container,
  Link,
  Spacer,
} from '@chakra-ui/react';

/**
 * @todo Add at least one more auth provider
 * @todo Consider login with email+username credentials
 */
export default function Access() {
  const [session, _] = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect users to admin if an active session exists
    if (session) {
      router.push('/admin');
    }
  });

  const handleGitHub = () => {
    signIn('github');
  };

  return (
    <Flex
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      background="gray.100"
    >
      <Spacer />

      <Container
        boxShadow="md"
        backgroundColor="white"
        padding={25}
        rounded={10}
      >
        <Heading as="h1">Login / register</Heading>
        <Text>You will be asked to pick a username later</Text>
        <Button colorScheme="blackAlpha" onClick={handleGitHub}>
          Continue with GitHub
        </Button>
      </Container>

      <Spacer />

      <NextLink href="/" passHref>
        <Link p={5}>
          <Heading as="h2">campfire</Heading>
        </Link>
      </NextLink>
    </Flex>
  );
}
