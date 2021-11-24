import LinkNext from 'next/link';
import { connectToDB } from '../db/connect';
import { getUsers } from '../db/user';
import { Box, Link, Heading, Flex, Button } from '@chakra-ui/react';
import Header from '../components/Header';

export default function Home({ users }) {
  return (
    <Box w={['90%', null, '80%']} m="5vw auto">
      <Header title="campfire" />
      <Heading as="h2" fontSize="2xl" mt={5} mb={3}>
        Discover profiles
      </Heading>

      <Flex>
        {users.map((user: any) => {
          if (user.username) {
            return (
              <LinkNext href={`/${user.username}`} key={user.username}>
                <Link mr={3}>
                  <Button colorScheme="gray" variant="outline">
                    @{user.username}
                  </Button>
                </Link>
              </LinkNext>
            );
          }
        })}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDB();
  const users = await getUsers(db);

  return {
    props: { users },
  };
}
