import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
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

export default function NewUser({ session }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    const { valid } = await validateUsername(event.target.value);
    setValid(valid);
  };

  const submitUsername = async () => {
    if (valid) {
      const result = await postUsername(session.user.id, username);

      if (result.success) {
        router.push('/admin');
      }
    }
  };

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

        <Input mb={3} value={username} onChange={handleChange} />

        {!valid && username !== '' && (
          <Alert status="error" rounded={5} mt={3} mb={3}>
            <AlertIcon />
            <AlertDescription>
              Username is invalid or already exists
            </AlertDescription>
          </Alert>
        )}

        <Button width="100%" isDisabled={!valid} onClick={submitUsername}>
          Submit
        </Button>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect the user to the login page if they are not logged in
  if (!session) {
    return {
      redirect: {
        destination: '/access',
        permanent: false,
      },
    };
  }

  const { db } = await connectToDB();
  const user = await getUserById(db, session.user.id);

  /**
   * Redirect the user to the admin page if they already have a username.
   *
   * @todo Consider adding username to session, but if you understand how to refresh a token.
   * This would handle the case for which the user changes its username mid-session.
   */
  if (user.username !== null) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

async function validateUsername(username) {
  if (username.length < 3) {
    return { valid: false };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${username}`
  );
  const { success } = await res.json();

  if (!success) {
    return { valid: true };
  }

  return { valid: false };
}

async function postUsername(userID: string, username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/user/id/${userID}`,
    {
      method: 'PUT',
      body: JSON.stringify(username),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { success } = await res.json();
  return { success };
}
