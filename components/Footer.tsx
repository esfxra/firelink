import { Text, Tag, Flex, Box } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" bgColor="gray.900">
      <Flex
        w={{ base: '90%', md: '80%', xl: '1200px' }}
        pt={5}
        pb={5}
        m="0 auto"
        justify="center"
      >
        <Box textAlign="center">
          <Text color="white">firelink &copy; 2021</Text>
          <Tag
            mt={2}
            color="white"
            bgGradient="linear(to-r, red.500, orange.500)"
          >
            BETA
          </Tag>
        </Box>
      </Flex>
    </Box>
  );
}
