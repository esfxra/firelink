import { useState } from 'react';
import Layout from '../components/Layout/Layout';

/**
 * @todo Finish login implementation (waiting on authentication strategy)
 * @todo Add email as an alternative to username when logging in
 */
export default function Login() {
  // const [email] = useState();
  const [username, setUsername] = useState('');
  const [password] = useState();

  async function login() {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch('http://localhost:3000/api/users/', request);
    result = res.json();
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  return (
    <div>
      <Layout title="campfire - register">
        <h1>login</h1>
        <p>NOTE: Non-functioning login</p>
        <form onSubmit={handleSubmit}>
          <label>
            username
            <input type="text" onChange={handleUsername} value={username} />
          </label>

          <label>
            password
            <input type="password" onChange={handlePassword} value={password} />
          </label>

          <input type="submit" value="submit" />
        </form>
      </Layout>
    </div>
  );
}
