import { getSession, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useState } from 'react';
import { connectToDB } from '../../db/connect';
import { getUserById } from '../../db/user';
import { getLinksByUserID } from '../../db/link';
import PromptLayout from '../../components/PromptLayout';
import LinkEditor from '../../components/admin/LinkEditor';
import Preview from '../../components/admin/Preview';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import styles from '../../styles/admin.module.css';
import { Link as LinkType } from '../../types';

interface Props {
  user: {
    _id: string;
    name: string;
    username: string;
  } | null;
  links: LinkType[] | null;
}

export default function Admin({ user, links }: Props) {
  const [session, loading] = useSession();
  const [checksum, setChecksum] = useState(0);

  const updatePreview = () => {
    setChecksum((checksum) => checksum + 1);
  };

  /**
   * Handle the user's session.
   * This is checked on the server first, but also here in the client
   * in case the session expires before a page reload.
   *
   * - Do not show anything while we wait for the session to be ready.
   * - Refer to the /access page if the session has expired or does not exist.
   */
  if (loading) {
    return null;
  }

  if (!loading && !session) {
    return (
      <PromptLayout>
        <p>You are not authenticated.</p>
        <Link href="/access">
          <a>
            <Button>Log in</Button>
          </a>
        </Link>
      </PromptLayout>
    );
  }

  return (
    <Layout title="campfire | admin">
      <div className={styles.admin}>
        {/* Links editor */}
        <section className={styles.editorContainer}>
          <h1>Link Editor</h1>
          <LinkEditor
            initialLinks={links}
            userID={user._id}
            onChange={updatePreview}
          />
        </section>

        {/* User profile page preview */}
        <section className={styles.previewContainer}>
          <h1>Preview</h1>
          <Preview username={user.username} checksum={checksum} />
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Fetch from the server initially, then handle mutations on the client.
  const session = await getSession(context);

  // DB calls require session data, so stop here if this is not available
  if (!session) {
    return {
      redirect: {
        destination: '/access',
        permanent: false,
      },
    };
  }

  /**
   * @todo Handle errors from DB calls.
   */
  const { db } = await connectToDB();
  const user = await getUserById(db, session.user.id);

  if (user.username === null) {
    return {
      redirect: {
        destination: '/auth/newUser',
        permanent: false,
      },
    };
  }

  const links = await getLinksByUserID(db, session.user.id);

  return {
    props: { user, links },
  };
}
