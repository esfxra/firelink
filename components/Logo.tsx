import NextLink from 'next/link';
import { Heading, Link } from '@chakra-ui/react';

export default function Logo() {
  return (
    <NextLink href="/" passHref>
      <Link alignSelf="flex-start">
        <Heading as="h1" fontSize={{ base: '2.25rem', sm: '2.5rem' }}>
          firelink
        </Heading>
      </Link>
    </NextLink>
  );
}
