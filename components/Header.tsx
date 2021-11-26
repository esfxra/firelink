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

function SignInButton({ session, router }) {
  if (!session) {
    return (
      <NextLink href="/auth/signin">
        <Link>
          <Button
            color="red.500"
            borderWidth="1px"
            borderColor="red.500"
            backgroundColor="transparent"
            _hover={{
              color: 'red.600',
              borderColor: 'red.600',
              backgroundColor: 'transparent',
            }}
          >
            Sign in
          </Button>
        </Link>
      </NextLink>
    );
  }

  return null;
}

function SignUpButton({ session, router }) {
  if (!session) {
    return (
      <NextLink href="/auth/signup">
        <Link>
          <Button
            color="white"
            bgGradient="linear(to-r, red.500, orange.500)"
            _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
          >
            Sign up
          </Button>
        </Link>
      </NextLink>
    );
  }
}

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
        <SignInButton session={session} router={router} />
        <SignUpButton session={session} router={router} />
        <AdminButton session={session} router={router} />
      </HStack>
    </Flex>
  );
}
