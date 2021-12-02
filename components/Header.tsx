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
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta
          name="msapplication-square150x150logo"
          content="mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="mstile-310x310.png"
        />
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
