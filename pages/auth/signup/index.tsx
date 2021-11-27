import NextLink from 'next/link';
import { Link, Center } from '@chakra-ui/react';

import SignUpLayout from '../../../components/auth/SignUpLayout';
import AuthProviders from '../../../components/auth/AuthProviders';

function UsernameSignUpLink() {
  return (
    <Center mt={5}>
      <NextLink href="/auth/signup/username" passHref>
        <Link bgGradient="linear(to-r, red.500, orange.500)" bgClip="text">
          Sign up with a username &#8594;
        </Link>
      </NextLink>
    </Center>
  );
}

export default function SignUp() {
  return (
    <>
      <AuthProviders />
      <UsernameSignUpLink />
    </>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <SignUpLayout>{page}</SignUpLayout>;
};
