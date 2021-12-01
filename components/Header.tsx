import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Flex, Link, Button, HStack } from '@chakra-ui/react';

import Logo from './Logo';

interface HeaderProps {
  title: string;
}

function AdminButton() {
  return (
    <NextLink href="/admin">
      <Link>
        <Button
          color="white"
          bgGradient="linear(to-r, red.500, orange.500)"
          _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
        >
          Admin
        </Button>
      </Link>
    </NextLink>
  );
}

function SignInButton() {
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

function SignUpButton() {
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

function SignOutButton() {
  return (
    <Button
      colorScheme="gray"
      variant="outline"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign out
    </Button>
  );
}

/**
 * A header to be used from home, and from admin
 */
export default function Header({ title }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo />
      {/* NOTE: Never show session-related buttons in auth pages */}
      {!router.pathname.includes('/auth') && (
        <HStack>
          {!session && <SignInButton />}
          {!session && <SignUpButton />}
          {session && <SignOutButton />}
          {session && !router.pathname.includes('/admin') && <AdminButton />}
        </HStack>
      )}
    </Flex>
  );
}
