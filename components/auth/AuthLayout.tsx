import { Flex } from '@chakra-ui/react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Flex flex={1} align="center" justify="center">
      {children}
    </Flex>
  );
}
