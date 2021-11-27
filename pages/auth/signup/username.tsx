import { useState } from 'react';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link, FormLabel, Input, Button, Center, Box } from '@chakra-ui/react';

import SignUpLayout from '../../../components/auth/SignUpLayout';

export default function SignUpWithUsername() {
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

  return (
    <Box mt={5}>
      <FormLabel mb={1}>Username</FormLabel>
      <Input mb={3} value={username} onChange={handleUsernameChange} />
      <FormLabel mb={1}>Password</FormLabel>
      <Input mb={3} value={password} onChange={handlePasswordChange} />
      <Button
        isFullWidth
        disabled={!validUsername && !validPassword}
        onClick={handleUsernameSignup}
      >
        Sign up with username
      </Button>
      <Center mt={5}>
        <NextLink href="/auth/signup/" passHref>
          <Link
            bgGradient="linear(to-r, red.500, orange.500)"
            bgClip="text"
            fontWeight="500"
          >
            &#8592; Other sign up options
          </Link>
        </NextLink>
      </Center>
    </Box>
  );
}

SignUpWithUsername.getLayout = function getLayout(page) {
  return <SignUpLayout>{page}</SignUpLayout>;
};
