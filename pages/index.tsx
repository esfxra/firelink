import NextLink from 'next/link';
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
import MainLayout from '../components/MainLayout';
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
          fontSize={{ base: 'xl' }}
          fontWeight="bold"
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
    <>
      {/* Hero text */}
      <Box mt={16} mb={16} textAlign="center">
        <Text
          mb={1.5}
          fontWeight="bold"
          fontSize={{
            base: '4xl',
            sm: '5xl',
            // md: '6xl',
          }}
          lineHeight={1.15}
          bgGradient="linear(to-r, red.500, orange.500)"
          bgClip="text"
        >
          One link
          <Box as="br" display={{ base: 'inline-block', md: 'none' }} /> to rule
          them all
        </Text>
        <Text
          mb={3}
          fontSize={{
            base: 'xl',
            // md: '2xl',
          }}
        >
          Connect with your audience
          <Box as="br" display={{ base: 'inline-block', md: 'none' }} /> using a
          single link
        </Text>
        <NextLink href="/auth/signup" passHref>
          <Link>
            <Button
              fontSize="lg"
              color="white"
              bgGradient="linear(to-r, red.500, orange.500)"
              _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
            >
              Get started
            </Button>
          </Link>
        </NextLink>
      </Box>
      {/* The perks */}
      <Heading as="h2" fontSize={{ base: '2xl', sm: '3xl' }} mb={3}>
        Perks
      </Heading>
      <SimpleGrid
        mb={16}
        columns={{ base: 1, md: 3 }}
        spacing={{
          base: 5,
          md: 10,
        }}
      >
        <Perk
          icon={FiEdit}
          title="Customizable"
          text="Have control over the look and feel of your micro link site with themes and other options"
        />
        <Perk
          icon={FiSliders}
          title="User friendly"
          text="Quickly set up your profile and start adding links with our easy to learn editor"
        />
        <Perk
          icon={FiLock}
          title="Privacy-first"
          text="Get privacy-conscious insights from your visitors without tracking any personal data"
        />
      </SimpleGrid>
      {/* Profiles list */}
      <Heading as="h2" fontSize={{ base: '2xl', sm: '3xl' }} mb={3}>
        Discover profiles
      </Heading>
      <Flex
        wrap="wrap"
        mb={{
          base: 10,
          md: 0,
        }}
      >
        {users.map((user: any) => {
          if (user.username) {
            return (
              <NextLink href={`/${user.username}`} key={user.username}>
                <Link mr={{ base: 3, md: 5 }} mb={{ base: 3, md: 5 }}>
                  <Button
                    fontSize={{ base: 'lg' }}
                    fontWeight="400"
                    color="gray.800"
                    borderColor="gray.800"
                    borderWidth="1px"
                    bgColor="transparent"
                  >
                    @{user.username}
                  </Button>
                </Link>
              </NextLink>
            );
          }
        })}
      </Flex>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <Header title="firelink | one link to rule them all" />
      {page}
    </MainLayout>
  );
};

export async function getStaticProps() {
  const { db } = await connectToDB();
  const users = await getUsers(db);

  return {
    props: { users },
  };
}
