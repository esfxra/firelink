import React, { useState } from 'react';
import styles from './LinkToggle.module.css';

interface Props {
  published: boolean;
  saveValue: ({ value: boolean }) => void;
}

export default function LinkToggle({ published, saveValue }: Props) {
  const [toggle, setToggle] = useState(published);

  const handleToggle = () => {
    saveValue({ value: !toggle });
    setToggle((state) => !state);
  };

  return (
    <div className={styles.toggle}>
      <div
        className={toggle ? styles.enabled : styles.disabled}
        onClick={handleToggle}
      ></div>
    </div>
  );
}
