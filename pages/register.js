import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/register.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState();

  async function submit() {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    };

    try {
      const res = await fetch('http://localhost:3000/api/users/', request);
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  return (
    <Layout title="campfire - register">
      <div className={styles.wrapper}>
        <h2>register</h2>
        <form onSubmit={handleSubmit}>
          <label>
            username
            <input type="text" onChange={handleUsername} value={username} />
          </label>

          <label>
            email
            <input type="email" onChange={handleEmail} value={email} />
          </label>

          {/* <label>
            password
            <input type="password" onChange={setPassword} value={password} />
          </label> */}

          <input type="submit" value="submit" />
        </form>
      </div>
    </Layout>
  );
}
