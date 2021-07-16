import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import styles from './Header.module.css';

interface Props {
  title: string;
}

const AdminButton = ({ session, router }) => {
  if (session && router.pathname !== '/admin') {
    return (
      <button className={styles.button} onClick={() => router.push('/admin')}>
        admin
      </button>
    );
  }

  return null;
};

const AccessButton = ({ session, router }) => {
  if (!session && router.pathname !== '/access') {
    return (
      <Link href="/access">
        <a className={styles.button}>access</a>
      </Link>
    );
  }

  return null;
};

const LogOutLink = ({ session }) => {
  if (session)
    return (
      <span
        className={styles.link}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        log out
      </span>
    );

  return null;
};

/**
 * A header to be used from home, and from admin
 */
export default function Header({ title }: Props) {
  const [session, _] = useSession();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <a className={styles.logo}>campfire</a>
      </Link>

      <div className={styles.headerLinks}>
        <LogOutLink session={session} />
        <AccessButton session={session} router={router} />
        <AdminButton session={session} router={router} />
      </div>
    </header>
  );
}
