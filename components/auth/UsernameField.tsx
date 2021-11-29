import { Text, Input, InputLeftElement, InputGroup } from '@chakra-ui/react';

import { AuthApiResponse } from './auth.types';

async function checkUsernameAvailability(username: string) {
  try {
    // Check if the username exists
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${username}`
    );

    // Handle results, and return strings compatible with react-hook-form's error system
    const { success } = (await res.json()) as AuthApiResponse<null>;
    if (success) {
      return 'Username is already taken';
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return 'An error occurred';
  }
}

export default function UsernameField({ register }) {
  return (
    <InputGroup>
      <InputLeftElement width="160px">
        <Text
          fontWeight="600"
          bgGradient="linear(to-r, red.500, orange.500)"
          bgClip="text"
        >
          firelink.vercel.app/
        </Text>
      </InputLeftElement>
      <Input
        pl="155px"
        id="username"
        type="text"
        {...register('username', {
          required: 'This is required',
          minLength: {
            value: 4,
            message: 'Must be at least 4 characters',
          },
          maxLength: {
            value: 14,
            message: 'Must be at most 14 characters',
          },
          validate: {
            availability: checkUsernameAvailability,
          },
        })}
      />
    </InputGroup>
  );
}
