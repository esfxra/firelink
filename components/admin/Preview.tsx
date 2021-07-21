import React from 'react';
import styles from './Preview.module.css';

interface Props {
  username: string;
  checksum: number;
}

/**
 * Shows a preview of the user profile site framed by a mobile device.
 *
 * @todo Write a hook that controls device size based on parent or window dimensions.
 */
export default function Preview({ username, checksum }: Props) {
  return (
    <>
      <div className={styles.preview}>
        <div className={styles.device}>
          <iframe
            key={checksum}
            className={styles.iframe}
            src={`${process.env.NEXT_PUBLIC_API_HOST}/${username}`}
          ></iframe>
        </div>
      </div>
    </>
  );
}
