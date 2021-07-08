import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({ title, children }) {
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
          <Link href="/login">
            <a className={styles.link}>login</a>
          </Link>
          <Link href="/login">
            <a className={styles.link}>register</a>
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
