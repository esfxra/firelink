import React, { useState } from 'react';
import styles from './CreateUsernameModal.module.css';

/**
 * @todo Add validation: unique username, min/max length (could be done on the server)
 * @todo Disable create button until validation is a success
 */
export default function CreateUsername({
  id,
  closeModal,
}: {
  id: string;
  closeModal: () => void;
}) {
  const [username, setUsername] = useState('');

  const handleChange = (e: any) => {
    setUsername(e.target.value);
  };

  const submitUsername = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(username),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    closeModal();
  };

  return (
    <div className={styles.wrapper}>
      <h1>Pick a username</h1>
      <p>
        This will be the handle for your campfire, where all your links will be
        available.
      </p>
      <p>
        For instance, campfire.com/
        <span className={styles.urlUsername}>BlueberryHunter</span>
      </p>
      <input
        className={styles.textInput}
        type="text"
        value={username}
        onChange={handleChange}
      />
      <button className={styles.submitButton} onClick={submitUsername}>
        submit username
      </button>
    </div>
  );
}
