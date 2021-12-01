import { Flex } from '@chakra-ui/react';

import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <Flex h="100vh" direction="column">
      <Flex
        w={{ base: '90%', md: '85%', xl: '1100px' }}
        // pt="5vw"
        // pb="5vw"
        pt={{ base: 5, sm: 8, md: 14 }}
        pb={{ base: 0, md: 10 }}
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
