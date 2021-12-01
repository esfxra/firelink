import { Flex } from '@chakra-ui/react';

export default function MainLayout({ children }) {
  return (
    <Flex
      w={{ base: '90%', md: '80%', xl: '1200px' }}
      h="100vh"
      pt="5vw"
      pb="5vw"
      m="0 auto"
    >
      <Flex flex={1} direction="column">
        {children}
      </Flex>
    </Flex>
  );
}
