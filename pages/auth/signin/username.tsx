import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  Link,
  FormLabel,
  FormControl,
  Input,
  Button,
  Center,
  Box,
  useToast,
  useBoolean,
} from '@chakra-ui/react';

import SignInLayout from '../../../components/auth/SignInLayout';

import { AuthApiResponse, Inputs } from '../../../components/auth/auth.types';

async function attemptSignInRequest(
  username: string,
  password: string
): Promise<AuthApiResponse<null>> {
  const result = await signIn('credentials', {
    redirect: false,
    username,
    password,
  });

  if (result.error) {
    return { success: false, data: null };
  }

  if (result.ok) {
    return { success: true, data: null };
  }
}

// TODO: Implement cooldown after X erronous attempts have been made
export default function SignInWithUsername() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean(false);

  async function onSubmit(data: Inputs) {
    console.log('hi');
    setIsLoading.on();
    const signInResult = await attemptSignInRequest(
      data.username,
      data.password
    );

    // Handle API user sign in failure
    if (!signInResult.success) {
      setIsLoading.off();
      toast({
        title: 'Sign in unsuccessful.',
        description: 'Please try again.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      reset();
      return;
    }

    // Send the user to the admin dashboard for successful sign ins
    router.push('/admin');
  }

  return (
    <Box mt={5}>
      {/* <FormLabel mb={1}>Username</FormLabel>
      <Input mb={3} value={username} onChange={handleUsernameChange} /> */}
      <form
        id="signinForm"
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      >
        {/* Username */}
        <FormControl mb={3}>
          <FormLabel mt={0} mb={2} id="usernameLabel" htmlFor="username">
            Username
          </FormLabel>

          <Input
            id="username"
            type="text"
            {...register('username', {
              required: true,
            })}
          />
        </FormControl>
        {/* Password */}
        <FormControl mb={3}>
          <FormLabel mt={0} mb={2} id="passwordLabel" htmlFor="password">
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: true,
            })}
          />
        </FormControl>

        <Button
          isLoading={isLoading}
          loadingText="Signing you in"
          type="submit"
          isFullWidth
        >
          Sign in with username
        </Button>
      </form>
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
