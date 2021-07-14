import React from 'react';
import styles from './LinkToggle.module.css';

interface Props {
  published: boolean;
  saveValue: ({ value: boolean }) => void;
}

export default function LinkToggle({ published, saveValue }: Props) {
  const handleToggle = () => {
    saveValue({ value: !published });
  };

  return (
    <div className={styles.toggle}>
      <div
        className={published ? styles.enabled : styles.disabled}
        onClick={handleToggle}
      ></div>
    </div>
  );
}
