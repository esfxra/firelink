import Image from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Center,
  Heading,
  Flex,
  VStack,
  Container,
  Text,
  Link,
} from '@chakra-ui/react';

import { connectToDB } from '../db/connect';
import { getUserByUsername } from '../db/user';
import { getLinksByUserID } from '../db/link';

export default function User({ user, links }) {
  return (
    <Flex minHeight="100vh" direction="column" p={5}>
      <Box as="main" flex={1}>
        {/* Profile details */}
        <VStack mb={5}>
          {user.image && (
            <Image
              src={user.image}
              width={100}
              height={100}
              className="avatar"
              alt="User profile picture"
            />
          )}
          <Text
            fontWeight="bold"
            bgGradient="linear(to-r, red.500, orange.500)"
            bgClip="text"
          >
            @{user.username}
          </Text>
        </VStack>

        {/* Links */}
        <VStack
          w={{ base: '100%', md: '500px' }}
          ml="auto"
          mr="auto"
          align="stretch"
          spacing={4}
        >
          {!links.length ? (
            <Text alignSelf="center">No links to see (yet).</Text>
          ) : (
            links.map((link) => {
              if (!link.published) {
                return;
              }

              return (
                <Link
                  href={link.url}
                  isExternal={true}
                  rel="noreferrer"
                  key={link._id}
                >
                  <Container
                    p="5px 10px"
                    rounded={8}
                    borderColor="gray.500"
                    borderWidth={1}
                  >
                    {link.title}
                  </Container>
                </Link>
              );
            })
          )}
        </VStack>
      </Box>

      <Box as="footer" flexShrink={0}>
        <Center>
          <NextLink href="/">
            <Link>
              <Heading as="h1">firelink</Heading>
            </Link>
          </NextLink>
        </Center>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const { db } = await connectToDB();

  const result = await getUserByUsername(db, username);

  // Handle the case for which the user doesn't exist
  if (!result.success) {
    return {
      notFound: true,
    };
  }

  /**
   * @todo API should only return published links
   */
  const user = result.data;
  const linksByUser = await getLinksByUserID(db, user._id);
  const links = linksByUser.filter((link) => link.published);

  return {
    props: {
      user,
      links,
    },
  };
}
