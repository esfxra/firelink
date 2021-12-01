import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import MainLayout from '../../../components/MainLayout';
import AuthLayout from '../../../components/auth/AuthLayout';
import SignUpLayout from '../../../components/auth/SignUpLayout';
import AuthProviders from '../../../components/auth/AuthProviders';

export default function SignUp() {
  return (
    <>
      <AuthProviders />
      <Center mt={5}>
        <NextLink href="/auth/signup/username" passHref>
          <Link bgGradient="linear(to-r, red.500, orange.500)" bgClip="text">
            Sign up with a username &#8594;
          </Link>
        </NextLink>
      </Center>
    </>
  );
}

SignUp.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AuthLayout title="firelink | sign up">
        <SignUpLayout>{page}</SignUpLayout>
      </AuthLayout>
    </MainLayout>
  );
};
