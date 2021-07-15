import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './ProfileLayout.module.css';

/**
 * @todo Layout for user profile page
 */
export default function ProfileLayout({ title, children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Link href="/">
          <a className={styles.logo}>campfire</a>
        </Link>
      </footer>
    </div>
  );
}
