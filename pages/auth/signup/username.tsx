import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import AuthLayout from '../../../components/auth/AuthLayout';
import SignUpLayout from '../../../components/auth/SignUpLayout';
import SignUpForm from '../../../components/auth/SignUpForm';

export default function SignUpWithUsername() {
  return (
    <>
      <SignUpForm />
      <Center mt={5}>
        <NextLink href="/auth/signup/" passHref>
          <Link
            bgGradient="linear(to-r, red.500, orange.500)"
            bgClip="text"
            fontWeight="500"
          >
            &#8592; Other sign up options
          </Link>
        </NextLink>
      </Center>
    </>
  );
}

SignUpWithUsername.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      <SignUpLayout>{page}</SignUpLayout>
    </AuthLayout>
  );
};