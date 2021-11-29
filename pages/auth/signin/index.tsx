import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import AuthLayout from '../../../components/auth/AuthLayout';
import SignInLayout from '../../../components/auth/SignInLayout';
import AuthProviders from '../../../components/auth/AuthProviders';

export default function SignIn() {
  return (
    <>
      <AuthProviders />
      <Center mt={5}>
        <NextLink href="/auth/signin/username" passHref>
          <Link bgGradient="linear(to-r, red.500, orange.500)" bgClip="text">
            Sign in with a username &#8594;
          </Link>
        </NextLink>
      </Center>
    </>
  );
}

SignIn.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      <SignInLayout>{page}</SignInLayout>
    </AuthLayout>
  );
};
