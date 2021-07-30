import React from 'react';
import { Flex, Box, AspectRatio } from '@chakra-ui/react';

interface Props {
  username: string;
  checksum: number;
}

/**
 * Shows a preview of the user profile site framed by a mobile device.
 *
 * @todo Write a hook that controls device size based on parent or window dimensions.
 */
export default function Preview({ username, checksum }: Props) {
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <AspectRatio minWidth="360px" maxWidth="410px" ratio={9 / 16}>
          <Box
            borderWidth={8}
            borderColor="blackAlpha.900"
            rounded={25}
            overflow="hidden"
          >
            <iframe
              key={checksum}
              width="100%"
              height="100%"
              style={{ borderRadius: 25 }}
              src={`${process.env.NEXT_PUBLIC_API_HOST}/${username}`}
            ></iframe>
          </Box>
        </AspectRatio>
      </Flex>
    </>
  );
}
