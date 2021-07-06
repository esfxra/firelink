import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from '../styles/user.module.css';

export default function User({ user }) {
  return (
    <Layout title={`campfire - ${user.username}`}>
      <div className={styles.card}>
        <div className={styles.user}>
          {user.avatar && (
            <Image
              src={user.avatar}
              width={100}
              height={100}
              className={styles.avatar}
            />
          )}

          <div className={styles.name}>{user.displayname}</div>
          <div className={styles.name}>@{user.username}</div>
          <div className={styles.bio}>{user.bio}</div>
        </div>

        <div className={styles.links}>
          {user.links.length === 0 ? (
            <p>No links to see yet</p>
          ) : (
            user.links.map((link) => (
              <a href={link.url} target="_blank">
                <div className={styles.link}>{link.title}</div>
              </a>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/users/`);
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.username },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/users/${params.id}`);
  const user = await res.json();

  return {
    props: { user }, // will be passed to the page component as props
  };
}
