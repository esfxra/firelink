import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import SignInLayout from '../../../components/auth/SignInLayout';
import AuthProviders from '../../../components/auth/AuthProviders';

function UsernameSignInLink() {
  return (
    <Center mt={5}>
      <NextLink href="/auth/signin/username" passHref>
        <Link bgGradient="linear(to-r, red.500, orange.500)" bgClip="text">
          Sign in with a username &#8594;
        </Link>
      </NextLink>
    </Center>
  );
}

export default function SignIn() {
  return (
    <>
      <AuthProviders />
      <UsernameSignInLink />
    </>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <SignInLayout>{page}</SignInLayout>;
};
