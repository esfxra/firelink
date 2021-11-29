import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  Link,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Center,
  Flex,
  Box,
  useToast,
  useBoolean,
} from '@chakra-ui/react';

import SignUpLayout from '../../../components/auth/SignUpLayout';

import { Inputs, AuthApiResponse } from '../../../components/auth/auth.types';

async function checkUsernameAvailability(username: string) {
  try {
    // Check if the username exists
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${username}`
    );

    // Handle results, and return strings compatible with react-hook-form's error system
    const { success } = (await res.json()) as AuthApiResponse<null>;
    if (success) {
      return 'Username is already taken';
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return 'An error occurred';
  }
}

async function fetchSignUpRequest(
  username: string,
  password: string
): Promise<AuthApiResponse<null>> {
  try {
    // Sign the user up
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Return result
    const { success } = (await res.json()) as AuthApiResponse<null>;

    return { success, data: null };
  } catch (error) {
    return { success: false, data: null };
  }
}

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

export default function SignUpWithUsername() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean(false);

  async function onSubmit(data: Inputs) {
    setIsLoading.on();
    const signUpResult = await fetchSignUpRequest(data.username, data.password);

    // Handle API user sign up failure
    if (!signUpResult.success) {
      setIsLoading.off();
      toast({
        title: 'An error occurred.',
        description: 'We could not create your account.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      reset();
      return;
    }

    // Sign the user in
    const signInResult = await attemptSignInRequest(
      data.username,
      data.password
    );

    // Handle API user sign in failure
    if (!signInResult.success) {
      /**
       * Send the user to the sign in page.
       * This considers the fact at this point the account has been created.
       * There are safeguards in place that prevent reaching this point without creating an account.
       */
      router.push('/auth/signin');
      return;
    }

    // Send the user to the admin dashboard for successful sign ins
    router.push('/admin');
  }

  return (
    <Box mt={5}>
      <form
        id="signupForm"
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      >
        {/* Username */}
        <FormControl mb={3} isInvalid={!!errors.username}>
          <Flex
            mb={2}
            align="center"
            alignContent="center"
            justify="space-between"
          >
            <FormLabel m={0} id="usernameLabel" htmlFor="username">
              Username
            </FormLabel>
            {errors.username && (
              <FormErrorMessage m={0}>
                {errors.username.message}
              </FormErrorMessage>
            )}
          </Flex>
          <Input
            id="username"
            type="text"
            {...register('username', {
              required: 'This is required',
              minLength: {
                value: 4,
                message: 'Must be at least 4 characters',
              },
              maxLength: {
                value: 14,
                message: 'Must be at most 14 characters',
              },
              validate: {
                availability: checkUsernameAvailability,
              },
            })}
          />
        </FormControl>
        {/* Password */}
        <FormControl mb={3} isInvalid={!!errors.password}>
          <Flex
            mb={2}
            align="center"
            alignContent="center"
            justify="space-between"
          >
            <FormLabel m={0} id="passwordLabel" htmlFor="password">
              Password
            </FormLabel>
            {errors.password && (
              <FormErrorMessage m={0}>
                {errors.password.message}
              </FormErrorMessage>
            )}
          </Flex>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'This is required',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters',
              },
              maxLength: {
                value: 14,
                message: 'Must be at most 14 characters',
              },
            })}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          loadingText="Signing you up"
          type="submit"
          isFullWidth
        >
          Sign up with username
        </Button>
      </form>

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
