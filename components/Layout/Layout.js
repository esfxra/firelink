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
          <a>
            <h1>campfire</h1>
          </a>
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
