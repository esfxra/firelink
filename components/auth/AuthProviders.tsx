import { Button, VStack, useBoolean } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

import { GitHubIcon, GitLabIcon } from '../Icons';

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
        color="white"
        bgColor="gray.800"
        _hover={{ bgColor: 'gray.900' }}
        isFullWidth
        isLoading={isLoadingGitHub}
        loadingText="Signing in with GitHub"
        leftIcon={<GitHubIcon color="white" />}
        onClick={() => {
          setIsLoadingGitHub.on();
          handleGitHubAuth();
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        color="white"
        bgColor="purple.700"
        _hover={{ bgColor: 'purple.800' }}
        isFullWidth
        isLoading={isLoadingGitLab}
        loadingText="Signing in with GitLab"
        leftIcon={<GitLabIcon color="orange.500" />}
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
