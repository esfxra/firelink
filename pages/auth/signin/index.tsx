import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import MainLayout from '../../../components/MainLayout';
import AuthLayout from '../../../components/auth/AuthLayout';
import SignInLayout from '../../../components/auth/SignInLayout';
import Header from '../../../components/Header';
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
    <MainLayout>
      <Header title="firelink | sign in" />
      <AuthLayout>
        <SignInLayout>{page}</SignInLayout>
      </AuthLayout>
    </MainLayout>
  );
};
