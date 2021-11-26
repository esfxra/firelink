import { useState } from 'react';
import { FormLabel, Input, Button, Box } from '@chakra-ui/react';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  async function handleUsernameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;
    setUsername(newValue);

    if (newValue.length < 3) {
      setValidUsername(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${newValue}`
    );

    const { success } = await res.json();

    console.log('success ', success);

    if (!success) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setPassword(newValue);

    if (newValue.length < 3) {
      setValidPassword(false);
      return;
    }

    setValidPassword(true);
  }

  async function attemptSignUp() {
    if (validUsername && validPassword) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();

      if (result.success) {
        // Authenticate the user???
        // Navigate to the admin panel
      } else {
        // Failure
      }
    }
  }

  return (
    <>
      <FormLabel mt={2}>Username</FormLabel>
      <Input value={username} type="text" onChange={handleUsernameChange} />
      <FormLabel mt={2}>Password</FormLabel>
      <Input value={password} type="password" onChange={handlePasswordChange} />
      <Button isFullWidth mt={5} onClick={attemptSignUp}>
        Sign up with a username
      </Button>
    </>
  );
}
