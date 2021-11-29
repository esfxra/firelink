import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import {
  Text,
  FormErrorMessage,
  FormControl,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  Box,
  useToast,
  useBoolean,
} from '@chakra-ui/react';

import NewUserLayout from '../../components/auth/NewUserLayout';
import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';

import { AuthApiResponse } from '../../components/auth/auth.types';
import router from 'next/router';

function URLTemplate() {
  return (
    <Text
      fontWeight="600"
      bgGradient="linear(to-r, red.500, orange.500)"
      bgClip="text"
    >
      firelink.vercel.app/
    </Text>
  );
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

    if (success) {
      router.push('/admin');
    } else {
      setIsLoading.off();
      toast({
        title: 'An error occurred.',
        description: 'We could not register this username.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }
  }

  return (
    <Box mt={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3} isInvalid={!!errors.username}>
          <InputGroup>
            <InputLeftElement width="160px">
              <URLTemplate />
            </InputLeftElement>
            <Input
              pl="155px"
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
          </InputGroup>
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
  return <NewUserLayout>{page}</NewUserLayout>;
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
    // TODO: Handle the error on the UI
    console.error(error);
    return { success: false };
  }
}
