import Link from 'next/link';
import { getSession, useSession } from 'next-auth/client';
import Layout from '../../components/Layout/Layout';
import styles from '../../styles/admin.module.css';

export default function Admin() {
  const [session, loading] = useSession();

  // Do not show anything while we wait for the session
  if (loading) {
    return null;
  }

  // Refer the user to signing in again since they are not authorized
  if (!loading && !session) {
    return (
      <div>
        Try to{' '}
        <Link href="/login">
          <a style={{ color: '#ff8906', textDecoration: 'underline' }}>
            log in again
          </a>
        </Link>
        .
      </div>
    );
  }

  // Actual admin page components
  return (
    <Layout title="campfire">
      <h1 className={styles.headline}>admin</h1>
      <p>welcome, {session.user.name}</p>

      <section>
        <h2 className={styles.subheadline}>links</h2>
      </section>

      <section>
        <h2 className={styles.subheadline}>appearance</h2>
      </section>

      <section>
        <h2 className={styles.subheadline}>account settings</h2>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Fetch from the server initially, then handle mutations on the client
  const session = await getSession(context);

  /**
   * The session obtained from the context will be available in pageProps
   * These then are passed to the next-auth Provider for the client
   *
   * See the setup in _app.js
   */
  return {
    props: { session },
  };
}
