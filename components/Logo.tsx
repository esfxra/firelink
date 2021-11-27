import NextLink from 'next/link';
import { Heading, Link } from '@chakra-ui/react';

export default function Logo() {
  return (
    <NextLink href="/" passHref>
      <Link alignSelf="flex-start">
        <Heading as="h1">campfire</Heading>
      </Link>
    </NextLink>
  );
}
