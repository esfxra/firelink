import LinkNext from 'next/link';
import {
  Text,
  Link,
  Heading,
  Icon,
  Button,
  SimpleGrid,
  Flex,
  Box,
} from '@chakra-ui/react';
import { FiSliders, FiEdit, FiLock } from 'react-icons/fi';

import { connectToDB } from '../db/connect';
import { getUsers } from '../db/user';
import Header from '../components/Header';

function Perk({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <Box>
      <Flex align="center">
        <Icon as={icon} w={6} h={6} color="red.500" />
        <Text
          ml={3}
          fontSize="xl"
          fontWeight="500"
          bgGradient="linear(to-r, red.500, orange.500)"
          bgClip="text"
        >
          {title}
        </Text>
      </Flex>
      <Text fontSize="xl">{text}</Text>
    </Box>
  );
}

export default function Home({ users }) {
  return (
    <Box w={['90%', null, '80%']} m="5vw auto">
      <Header title="firelink | one link to rule them all" />
      {/* Hero text */}
      <Box mt={16} mb={16}>
        <Text
          mb={3}
          fontWeight="bold"
          fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
          lineHeight={1.15}
          bgGradient="linear(to-r, red.500, orange.500)"
          bgClip="text"
        >
          One link to rule them all
        </Text>
        <Text mb={3} fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}>
          Connect with your audience using a single link
        </Text>
        <Button
          color="white"
          bgGradient="linear(to-r, red.500, orange.500)"
          _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
        >
          Get started
        </Button>
      </Box>
      {/* The perks */}
      <Heading as="h2" fontSize="2xl" mb={3}>
        Perks
      </Heading>
      <SimpleGrid
        mb={16}
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, md: 10 }}
      >
        <Perk
          icon={FiEdit}
          title="Customizable"
          text="Have control over the look and feel of your micro link site with themes and other options."
        />
        <Perk
          icon={FiSliders}
          title="Easy to manage"
          text="Quickly set up your profile and start adding links with our user friendly editor."
        />
        <Perk
          icon={FiLock}
          title="Privacy-first"
          text="Get privacy-conscious insights from your visitors without tracking any personal data."
        />
      </SimpleGrid>
      {/* Profiles list */}
      <Heading as="h2" fontSize="2xl" mb={3}>
        Discover profiles
      </Heading>
      <Flex wrap="wrap">
        {users.map((user: any) => {
          if (user.username) {
            return (
              <LinkNext href={`/${user.username}`} key={user.username}>
                <Link mr={3} mb={3}>
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
