import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';
import { getLinksByUserID } from '../../db/link';
import PromptLayout from '../../components/admin/PromptLayout';
// import CreateUsernameModal from '../../components/admin/CreateUsernameModal';
import LinkList from '../../components/admin/LinkList';
import Layout from '../../components/Layout';
import styles from '../../styles/admin.module.css';

interface Props {
  user: {
    name: string;
    username: string;
  } | null;
  links: any[] | null;
}

/**
 * @todo Improve the username modal logic.
 * Consider showing it as a page even before admin.
 * This could be handled through one of the authentication callbacks.
 * The jwt callback can tell if a new user was created.
 */
export default function Admin({ user, links }: Props) {
  const [session, loading] = useSession();
  const router = useRouter();
  // const [usernameModal, setUsernameModal] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     if (user.username === '') {
  //       setUsernameModal(true);
  //       return;
  //     }
  //   }

  //   setUsernameModal(false);
  // }, []);

  // Do not show anything while we wait for the session
  if (loading) {
    return null;
  }

  // Refer the user to signing in again since they are not authorized
  if (!loading && !session) {
    return (
      <PromptLayout>
        <p>You are not authenticated.</p>
        {/* <Link href="/access"> */}
        <button
          className={styles.button}
          onClick={() => router.push('/access')}
        >
          Log in
        </button>
        {/* </Link> */}
      </PromptLayout>
    );
  }

  // // Actual admin page components
  // if (user) {
  //   if (user.username !== '') {
  //     <CreateUsernameModal
  //       id={session.user.id}
  //       closeModal={() => setUsernameModal(false)}
  //     />;
  //   }
  // }

  return (
    <Layout title="campfire | admin">
      <section>
        <h1 className={styles.subheadline}>Links</h1>
        <LinkList initialLinks={links} />
      </section>

      {/* <section>
        <h2 className={styles.subheadline}>appearance</h2>
      </section> */}

      {/* <section>
        <h2 className={styles.subheadline}>account settings</h2>
      </section> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Fetch from the server initially, then handle mutations on the client
  const session: any = await getSession(context);

  // DB calls require session data, so stop here if this is not available
  if (!session) {
    return {
      props: { session, user: null, links: null },
    };
  }

  const { db } = await connectToDB();
  const user = await getUserById(db, session.user.id);
  const links = await getLinksByUserID(db, session.user.id);

  /**
   * The session obtained from the context will be available in pageProps
   * These then are passed to the next-auth Provider for the client
   *
   * See the setup in _app.js
   */
  return {
    props: { session, user, links },
  };
}
