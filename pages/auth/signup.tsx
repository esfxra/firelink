import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Heading,
  FormLabel,
  Text,
  List,
  ListItem,
  ListIcon,
  Link,
  Button,
  Input,
  Center,
  VStack,
  Divider,
  Flex,
  Box,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const perks = [
  'One link to rule them all',
  'Customizable',
  'Safe and trusted',
  'Easy management',
];

function PerkList() {
  return (
    <List mt={{ base: 5, md: 0 }} spacing={{ base: 3, md: 10 }}>
      {perks.map((perk) => (
        <ListItem key={perk} display="flex" alignItems="center">
          <ListIcon fontSize={{ base: 'l', md: 'xl' }} as={CheckCircleIcon} />
          <Text fontSize={{ base: 'xl', md: '2xl' }}>{perk}</Text>
        </ListItem>
      ))}
    </List>
  );
}

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  async function handleUsernameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setUsername(event.target.value);

    // Make sure the user does not exist
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${event.target.value}`
      );

      const { success } = await res.json();
      setValidUsername(!success);
    } catch (error) {
      console.error(error);
      // TODO: Handle the error on the UI
    }
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    setValidPassword(event.target.value.length > 8);
  }

  async function handleUsernameSignup() {
    if (!validUsername && !validPassword) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      console.log(result);
      // TODO: Handle a successful sign up on the UI

      if (result.success) {
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
    } catch (error) {
      console.error(error);
      // TODO: Handle the error on the UI
    }
  }

  function handleGitHubSignup() {
    signIn('github', {
      callbackUrl: '/admin',
    });
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

                <Box display={{ base: 'block', md: 'none' }}>
                  <PerkList />
                </Box>

                {/* Sign up with OAuth provider */}
                <VStack mt={5} spacing={3}>
                  <Button isFullWidth onClick={handleGitHubSignup}>
                    Continue with GitHub
                  </Button>
                  <Button isFullWidth disabled>
                    Continue with GitLab
                  </Button>
                </VStack>

                <Divider mt={5} mb={5} />

                {/* Sign up with username */}
                <FormLabel mb={1}>Username</FormLabel>
                <Input
                  mb={3}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <FormLabel mb={1}>Password</FormLabel>
                <Input
                  mb={3}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  isFullWidth
                  disabled={!validUsername && !validPassword}
                  onClick={handleUsernameSignup}
                >
                  Sign up with username
                </Button>

                <Divider mt={5} mb={5} />

                {/* Link to user authentication */}
                <Center>
                  <Text>
                    Already have an account?{' '}
                    <NextLink href="/auth/signin" passHref>
                      <Link>Sign in</Link>
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
