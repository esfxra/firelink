import { getSession, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useState } from 'react';
import {
  Divider,
  Link,
  Center,
  Grid,
  Heading,
  Button,
  Box,
} from '@chakra-ui/react';

import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';
import { getLinksByUserID } from '../../db/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LinkEditor from '../../components/admin/LinkEditor';
import Preview from '../../components/admin/Preview';

import { Link as LinkType } from '../../types';

interface Props {
  user: {
    _id: string;
    name: string;
    username: string;
  } | null;
  links: LinkType[] | null;
}

export default function Admin({ user, links }: Props) {
  const { data: session, status } = useSession();
  const [checksum, setChecksum] = useState(0);

  const loading = status === 'loading';

  const updatePreview = () => {
    setChecksum((checksum) => checksum + 1);
  };

  /**
   * Handle the user's session.
   * This is checked on the server first, but also here in the client
   * in case the session expires before a page reload.
   *
   * - Do not show anything while we wait for the session to be ready.
   * - Refer to the /signin page if the session has expired or does not exist.
   */
  if (loading) {
    return null;
  }

  if (!loading && !session) {
    return (
      <Box>
        <p>You are not authenticated.</p>
        <NextLink href="/auth/signin" passHref>
          <Link>
            <Button>Log in</Button>
          </Link>
        </NextLink>
      </Box>
    );
  }

  return (
    <Grid height="100vh" templateRows="auto 1fr auto">
      {/* Header */}
      <Box boxShadow="md" padding={5} zIndex="overlay">
        <Header title="firelink | admin" />
      </Box>

      {/* Main */}
      <Grid
        templateColumns={{ base: '1fr', lg: '1.5fr 10px 1fr' }}
        bg="gray.50"
      >
        {/* Links editor */}
        <Box padding={5}>
          <Heading as="h2" size="lg" mb={10}>
            Link Editor
          </Heading>
          <LinkEditor
            initialLinks={links}
            userID={user._id}
            onChange={updatePreview}
          />
        </Box>

        <Center display={{ base: 'none', lg: 'block' }}>
          <Divider orientation="vertical" />
        </Center>

        {/* User profile page preview */}
        <Box padding={5} display={{ base: 'none', lg: 'block' }}>
          <Heading as="h2" size="lg" mb={10}>
            Preview
          </Heading>
          <Preview username={user.username} checksum={checksum} />
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
}

export async function getServerSideProps(context) {
  // Fetch from the server initially, then handle mutations on the client.
  const session = await getSession(context);

  // DB calls require session data, so stop here if this is not available
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  /**
   * @todo Handle errors from DB calls.
   */
  const { db } = await connectToDB();
  console.log(session);
  const user = await getUserById(db, session.user.id);

  if (user.username === null) {
    return {
      redirect: {
        destination: '/auth/newUser',
        permanent: false,
      },
    };
  }

  const links = await getLinksByUserID(db, session.user.id);

  return {
    props: { user, links },
  };
}
