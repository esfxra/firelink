import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import { Flex, Heading, Link, Button, HStack } from '@chakra-ui/react';

interface Props {
  title: string;
}

const AdminButton = ({ session, router }) => {
  if (session && router.pathname !== '/admin') {
    return <Button onClick={() => router.push('/admin')}>Admin</Button>;
  }

  return null;
};

const AccessButton = ({ session, router }) => {
  if (!session && router.pathname !== '/auth/access') {
    return (
      <NextLink href="/auth/access">
        <Link>
          <Button>Access</Button>
        </Link>
      </NextLink>
    );
  }

  return null;
};

const SignOutButton = ({ session }) => {
  if (session) {
    return (
      <Button onClick={() => signOut({ callbackUrl: '/' })}>Log out</Button>
    );
  }

  return null;
};

/**
 * A header to be used from home, and from admin
 */
export default function Header({ title }: Props) {
  const [session, _] = useSession();
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
