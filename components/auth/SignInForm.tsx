import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  useBoolean,
  useToast,
} from '@chakra-ui/react';

import { Inputs } from './auth.types';

// TODO: Implement cooldown after X erroneous attempts have been made
export default function SignInForm() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean(false);

  async function onSubmit(data: Inputs) {
    setIsLoading.on();
    const signInResult = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    // Handle API user sign in failure
    if (!signInResult.ok) {
      setIsLoading.off();
      toast({
        title: 'Sign in unsuccessful.',
        description: 'Please try again.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      reset();
      return;
    }

    // Send the user to the admin dashboard for successful sign ins
    router.push('/admin');
  }

  return (
    <form
      id="signinForm"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      {/* Username */}
      <FormControl mb={3}>
        <FormLabel mt={0} mb={2} id="usernameLabel" htmlFor="username">
          Username
        </FormLabel>

        <Input
          id="username"
          type="text"
          {...register('username', {
            required: true,
          })}
        />
      </FormControl>
      {/* Password */}
      <FormControl mb={3}>
        <FormLabel mt={0} mb={2} id="passwordLabel" htmlFor="password">
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
      </FormControl>

      <Button
        isLoading={isLoading}
        loadingText="Signing you in"
        type="submit"
        isFullWidth
      >
        Sign in with a username
      </Button>
    </form>
  );
}
