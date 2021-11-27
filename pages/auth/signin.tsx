import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Heading,
  FormLabel,
  Text,
  Link,
  VStack,
  Center,
  Button,
  Divider,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';

// Will use this to toggle the username / password form
// &#8594;

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Do not show the signIn page while loading the session
  useEffect(() => {
    // Redirect users to admin if an active session exists
    if (session) {
      router.push('/admin');
    }
  });

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleGitHubSignin() {
    signIn('github', {
      callbackUrl: '/admin',
    });
  }

  async function handleCredentialsSignin() {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      // TODO: Handle ERROR here
      console.error(result.error);
      return;
    }

    if (result.ok) {
      router.push('/admin');
    }
  }

  return (
    <Flex h="100vh">
      <Flex p={{ base: 5 }} flex={1} direction="column">
        <NextLink href="/" passHref>
          <Link alignSelf="flex-start">
            <Heading as="h1">campfire</Heading>
          </Link>
        </NextLink>

        <Flex flex={1} align="center" justify="center">
          <Box w="100%" maxW="350px">
            <Heading as="h2">Sign in</Heading>
            {/* Sign in with OAuth provider */}
            <VStack mt={5} spacing={3}>
              <Button isFullWidth onClick={handleGitHubSignin}>
                Continue with GitHub
              </Button>
              <Button isFullWidth disabled>
                Continue with GitLab
              </Button>
            </VStack>

            <Divider mt={5} mb={5} />

            {/* Sign in with username */}
            <FormLabel mb={1}>Username</FormLabel>
            <Input mb={3} value={username} onChange={handleUsernameChange} />
            <FormLabel mb={1}>Password</FormLabel>
            <Input mb={3} value={password} onChange={handlePasswordChange} />
            <Button isFullWidth onClick={handleCredentialsSignin}>
              Sign in with username
            </Button>

            <Divider mt={5} mb={5} />

            {/* Link to user registration */}
            <Center>
              <Text>
                Don&apos;t have an account?{' '}
                <NextLink href="/auth/signup" passHref>
                  <Link>Sign up</Link>
                </NextLink>
              </Text>
            </Center>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
