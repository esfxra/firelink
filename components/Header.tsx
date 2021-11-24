import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Flex, Heading, Link, Button, HStack } from '@chakra-ui/react';

interface Props {
  title: string;
}

const AdminButton = ({ session, router }) => {
  if (session && router.pathname !== '/admin') {
    return (
      <Button
        color="white"
        bgGradient="linear(to-r, red.500, orange.500)"
        _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
        onClick={() => router.push('/admin')}
      >
        Admin
      </Button>
    );
  }

  return null;
};

const AccessButton = ({ session, router }) => {
  if (!session && router.pathname !== '/auth/access') {
    return (
      <NextLink href="/auth/access">
        <Link>
          <Button
            color="white"
            bgGradient="linear(to-r, red.500, orange.500)"
            _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
          >
            Access
          </Button>
        </Link>
      </NextLink>
    );
  }

  return null;
};

const SignOutButton = ({ session }) => {
  if (session) {
    return (
      <Button
        colorScheme="gray"
        variant="outline"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Log out
      </Button>
    );
  }

  return null;
};

/**
 * A header to be used from home, and from admin
 */
export default function Header({ title }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextLink href="/" passHref>
        <Link>
          <Heading as="h1">campfire</Heading>
        </Link>
      </NextLink>

      <HStack>
        <SignOutButton session={session} />
        <AccessButton session={session} router={router} />
        <AdminButton session={session} router={router} />
      </HStack>
    </Flex>
  );
}
