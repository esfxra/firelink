import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import styles from './Layout.module.css';

/**
 * @todo Consider splitting home, nav, and login layouts
 */
export default function Layout({ title, children }) {
  const [session, _] = useSession();
  const router = useRouter();

  function SessionNav() {
    const logOut = () => {
      signOut({ callbackUrl: '/' });
    };

    // Handle authorized user cases
    if (session) {
      // Show link to admin if user is logged in, and at home path
      if (router.pathname !== '/admin') {
        return (
          <button onClick={() => router.push('/admin')} className={styles.link}>
            go to admin
          </button>
        );
      }

      // Show log out button
      return (
        <button onClick={logOut} className={styles.link}>
          log out
        </button>
      );
    }

    // Show login links for a user that is signed out
    return (
      <>
        <Link href="/access">
          <a className={styles.link}>access</a>
        </Link>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>campfire</a>
        </Link>

        <div className={styles['header-links']}>
          <SessionNav />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
