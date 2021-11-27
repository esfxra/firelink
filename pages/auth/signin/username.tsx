import { useState } from 'react';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link, FormLabel, Input, Button, Center, Box } from '@chakra-ui/react';
import SignInLayout from '../../../components/auth/SignInLayout';

export default function SignInWithUsername() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleUsernameSignin() {
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
    <Box mt={5}>
      <FormLabel mb={1}>Username</FormLabel>
      <Input mb={3} value={username} onChange={handleUsernameChange} />
      <FormLabel mb={1}>Password</FormLabel>
      <Input mb={3} value={password} onChange={handlePasswordChange} />
      <Button isFullWidth onClick={handleUsernameSignin}>
        Sign in with username
      </Button>
      <Center mt={5}>
        <NextLink href="/auth/signin/" passHref>
          <Link
            bgGradient="linear(to-r, red.500, orange.500)"
            bgClip="text"
            fontWeight="500"
          >
            &#8592; Other sign in options
          </Link>
        </NextLink>
      </Center>
    </Box>
  );
}

SignInWithUsername.getLayout = function getLayout(page) {
  return <SignInLayout>{page}</SignInLayout>;
};
