import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import MainLayout from '../../../components/MainLayout';
import AuthLayout from '../../../components/auth/AuthLayout';
import SignInLayout from '../../../components/auth/SignInLayout';
import SignInForm from '../../../components/auth/SignInForm';

export default function SignInWithUsername() {
  return (
    <>
      <SignInForm />
      <Center mt={5}>
        <NextLink href="/auth/signin/" passHref>
          <Link
            bgGradient="linear(to-r, red.500, orange.500)"
            bgClip="text"
            fontWeight="500"
          >
            &#8592; Other sign in options
          </Link>
        </NextLink>
      </Center>
    </>
  );
}

SignInWithUsername.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout title="firelink | sign in">
        <SignInLayout>{page}</SignInLayout>
      </AuthLayout>
    </MainLayout>
  );
};
