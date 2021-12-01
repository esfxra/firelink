import router from 'next/router';
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import {
  Heading,
  FormErrorMessage,
  FormControl,
  Button,
  Box,
  useToast,
  useBoolean,
} from '@chakra-ui/react';

import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';

import MainLayout from '../../components/MainLayout';
import AuthLayout from '../../components/auth/AuthLayout';
import UsernameField from '../../components/auth/UsernameField';

import { AuthApiResponse } from '../../components/auth/auth.types';

async function registerUsername(userId: string, username: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/user/id/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      }
    );

    const { success } = (await res.json()) as AuthApiResponse<null>;
    return { success };
  } catch (error) {
    return { success: false };
  }
}

/**
 * This page is used to allow accounts created with providers to register usernames.
 */
export default function NewUser({ userId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>({ mode: 'onChange' });
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean(false);

  async function onSubmit(data: { username: string }) {
    setIsLoading.on();
    const { success } = await registerUsername(userId, data.username);

    // Handle a sign up error with a toast notifying the user
    if (!success) {
      setIsLoading.off();
      toast({
        title: 'An error occurred.',
        description: 'We could not register this username.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }

    // Send the user to the admin dashboard once the username has been created
    router.push('/admin');
  }

  return (
    <Box w="100%" maxW="350px">
      <Heading as="h2" mb={5}>
        Pick a username
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3} isInvalid={!!errors.username}>
          <UsernameField register={register} />
          {errors.username && (
            <FormErrorMessage mt={2}>
              {errors.username.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          loadingText="Submitting"
          type="submit"
          isFullWidth
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

NewUser.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout title="firelink | pick a username">{page}</AuthLayout>
    </MainLayout>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Check if the user already has an username
  const { db } = await connectToDB();
  const user = await getUserById(db, session.user.id);

  if (user.username !== null) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: session.user.id,
    },
  };
}
