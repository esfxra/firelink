import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';
import Button from '../../components/Button';
import PromptLayout from '../../components/PromptLayout';
import styles from '../../styles/newUser.module.css';

export default function newUser({ session }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    const { valid } = await validateUsername(event.target.value);
    setValid(valid);
  };

  const submitUsername = async () => {
    if (valid) {
      const result = await postUsername(session.user.id, username);

      if (result.success) {
        router.push('/admin');
      }
    }
  };

  return (
    <PromptLayout>
      <h1 style={{ marginTop: 0 }}>Pick a username</h1>

      <p>
        This will be the handle for your campfire,
        <br /> where all your links will be available.
      </p>
      <p>
        For instance, campfire.com/
        <span className={styles.urlUsername}>BlueberryHunter</span>
      </p>

      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={handleChange}
      />

      {!valid && username !== '' && (
        <div className={styles.invalid}>
          Username is invalid or already exists
        </div>
      )}

      <Button disabled={!valid} fullWidth onClick={submitUsername}>
        Submit
      </Button>
    </PromptLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect the user to the login page if they are not logged in
  if (!session) {
    return {
      redirect: {
        destination: '/access',
        permanent: false,
      },
    };
  }

  const { db } = await connectToDB();
  const user = await getUserById(db, session.user.id);

  /**
   * Redirect the user to the admin page if they already have a username.
   *
   * @todo Consider adding username to session, but if you understand how to refresh a token.
   * This would handle the case for which the user changes its username mid-session.
   */
  if (user.username !== null) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

async function validateUsername(username) {
  if (username.length < 3) {
    return { valid: false };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/user/username/${username}`
  );
  const { success } = await res.json();

  if (!success) {
    return { valid: true };
  }

  return { valid: false };
}

async function postUsername(userID: string, username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/user/id/${userID}`,
    {
      method: 'PUT',
      body: JSON.stringify(username),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { success } = await res.json();
  return { success };
}
