import React from 'react';
import styles from './PromptLayout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function PromptLayout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}
