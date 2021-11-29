import { Flex } from '@chakra-ui/react';

import Logo from '../Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Flex h="100vh">
      <Flex p={{ base: 5 }} flex={1} direction="column">
        <Logo />
        <Flex flex={1} align="center" justify="center">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
