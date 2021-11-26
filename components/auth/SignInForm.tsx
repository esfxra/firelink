import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FormLabel, Input, Button } from '@chakra-ui/react';

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function attemptSignIn() {
    signIn('credentials', { username, password });
  }

  return (
    <>
      <FormLabel mt={2}>Username</FormLabel>
      <Input value={username} type="text" onChange={handleUsernameChange} />
      <FormLabel mt={2}>Password</FormLabel>
      <Input value={password} type="password" onChange={handlePasswordChange} />
      <Button width="100%" mt={5} onClick={attemptSignIn}>
        Sign in
      </Button>
    </>
  );
}
