import Link from 'next/link';
import { getSession, useSession } from 'next-auth/client';
import { useState } from 'react';
import { connectToDB } from '../../db/connect';
import { getLinksByUser } from '../../db/link';
import Layout from '../../components/Layout/Layout';
import LinkCard from '../../components/admin/LinkCard';
import styles from '../../styles/admin.module.css';

const NewLink = ({ userId, setAllLinks }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const addLink = async () => {
    const res = await fetch('http://localhost:3000/api/link/', {
      method: 'POST',
      body: JSON.stringify({ url, title, createdBy: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    console.log(data);

    // Reset fields for new link
    setUrl('');
    setTitle('');

    /**
     * Reset all links
     * @note This merges the previous state with the new one;
     * technically merging initial server props state with client state.
     * When the browser is refreshed, server state should include the changes from the mutation.
     */
    setAllLinks((state) => [...state, data]);
  };

  return (
    <div className={styles.newLink}>
      <div className={styles.newLinkForm}>
        <div className={styles.newLinkField}>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.newLinkField}>
          <label>url</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.newLinkButton} onClick={addLink}>
        add new link
      </button>
    </div>
  );
};

const Admin = ({ links }) => {
  const [session, loading] = useSession();
  const [allLinks, setAllLinks] = useState(links || []);

  const editLink = async (id, updates) => {
    console.log('attempting to save');
    console.log(updates);
    const res = await fetch(`http://localhost:3000/api/link/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    console.log(data);

    // Update links array
    setAllLinks((state) =>
      state.map((link: any) => {
        if (link._id === id) {
          return { ...data };
        }

        return link;
      })
    );
  };

  const deleteLink = async (id, idxRemove) => {
    const res = await fetch(`http://localhost:3000/api/link/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    if (data.result) {
      setAllLinks((state) => state.filter((_, idx) => idx !== idxRemove));
    }
  };

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

        <NewLink userId={session.user.id} setAllLinks={setAllLinks} />

        {allLinks.map((link, idx) => {
          const editWrapper = (updates) => {
            editLink(link._id, updates);
          };

          return (
            <LinkCard
              key={link._id}
              url={link.url}
              title={link.title}
              published={link.published}
              editLink={editWrapper}
              deleteLink={() => deleteLink(link._id, idx)}
            />
          );
        })}
      </section>

      {/* <section>
        <h2 className={styles.subheadline}>appearance</h2>
      </section> */}

      {/* <section>
        <h2 className={styles.subheadline}>account settings</h2>
      </section> */}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Fetch from the server initially, then handle mutations on the client
  const session: any = await getSession(context);

  // DB calls require session data, so stop here if this is not available
  if (!session) {
    return {
      props: { session },
    };
  }

  const { db } = await connectToDB();
  const links = await getLinksByUser(db, session.user.id);

  /**
   * The session obtained from the context will be available in pageProps
   * These then are passed to the next-auth Provider for the client
   *
   * See the setup in _app.js
   */
  return {
    props: { session, links },
  };
}

export default Admin;
