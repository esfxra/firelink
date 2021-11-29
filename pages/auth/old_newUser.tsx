import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';

// TODO: Refactor with react-hook-form AND consider making the Username Checker a component of its own
export default function NewUser({ userId }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);

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

  async function handleUsernameSubmit() {
    if (!validUsername) {
      return;
    }

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

      const result = await res.json();
      if (result.success) {
        router.push('/admin');
      } else {
        // TODO: Handle error on the UI
      }
    } catch (error) {
      console.error(error);
      // TODO: Handle the error on the UI
    }
  }

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.50"
    >
      <Box padding={8} boxShadow="2xl" rounded={10} backgroundColor="white">
        <Heading as="h1" mb={3}>
          Pick a username
        </Heading>

        <Text mb={3}>
          This will be the handle for your campfire,
          <br /> where all your links will be available.
        </Text>

        <Input mb={3} value={username} onChange={handleUsernameChange} />

        {!handleUsernameSubmit && username !== '' && (
          <Alert status="error" rounded={5} mt={3} mb={3}>
            <AlertIcon />
            <AlertDescription>
              Username is invalid or already exists
            </AlertDescription>
          </Alert>
        )}

        <Button
          width="100%"
          isDisabled={!validUsername}
          onClick={handleUsernameSubmit}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
}

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
