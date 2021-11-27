import { Button, VStack } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

function handleGitHubAuth() {
  signIn('github', {
    callbackUrl: '/admin',
  });
}

export default function AuthProviders() {
  return (
    <VStack mt={5} spacing={3}>
      <Button isFullWidth onClick={handleGitHubAuth}>
        Continue with GitHub
      </Button>
      <Button isFullWidth disabled>
        Continue with GitLab
      </Button>
    </VStack>
  );
}
