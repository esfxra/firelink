import { Button, VStack, useBoolean } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

function handleGitHubAuth() {
  signIn('github', {
    callbackUrl: '/admin',
  });
}

function handleGitLabAuth() {
  signIn('gitlab', {
    callbackUrl: '/admin',
  });
}

export default function AuthProviders() {
  const [isLoadingGitHub, setIsLoadingGitHub] = useBoolean(false);
  const [isLoadingGitLab, setIsLoadingGitLab] = useBoolean(false);

  return (
    <VStack spacing={3}>
      <Button
        isLoading={isLoadingGitHub}
        loadingText="Signing in with GitHub"
        isFullWidth
        onClick={() => {
          setIsLoadingGitHub.on();
          handleGitHubAuth();
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        isLoading={isLoadingGitLab}
        loadingText="Signing in with GitLab"
        isFullWidth
        onClick={() => {
          setIsLoadingGitLab.on();
          handleGitLabAuth();
        }}
      >
        Continue with GitLab
      </Button>
    </VStack>
  );
}
