import { Flex } from '@chakra-ui/react';

import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <Flex h="100vh" direction="column">
      <Flex
        w={{ base: '90%', md: '80%', xl: '1200px' }}
        pt="5vw"
        pb="5vw"
        m="0 auto"
        flex={1}
      >
        <Flex flex={1} direction="column">
          {children}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
