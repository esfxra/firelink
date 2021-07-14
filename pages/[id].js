import Image from 'next/image';
import { connectToDB } from '../db/connect';
import { getUserById } from '../db/user';
import { getLinksByUser } from '../db/link';
import Layout from '../components/Layout/Layout';
import styles from '../styles/user.module.css';

export default function User({ user, links }) {
  return (
    <Layout title={`campfire - ${user.name}`}>
      <div className={styles.card}>
        <div className={styles.user}>
          {user.image && (
            <Image
              src={user.image}
              width={100}
              height={100}
              className={styles.avatar}
            />
          )}

          <div className={styles.name}>{user.name}</div>
          {/* <div className={styles.name}>{user.displayname}</div> */}
          {/* <div className={styles.name}>@{user.username}</div> */}
          {/* <div className={styles.bio}>{user.bio}</div> */}
        </div>

        <div className={styles.links}>
          {links.length === 0 ? (
            <p>No links to see yet</p>
          ) : (
            links.map((link) => {
              if (!link.published) {
                return;
              }

              return (
                <a href={link.url} target="_blank" key={link._id}>
                  <div className={styles.link}>{link.title}</div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const { db } = await connectToDB();
  const user = await getUserById(db, id);
  const links = await getLinksByUser(db, id);

  return {
    props: {
      user: {
        name: user.name,
        image: user.image,
      },
      links,
    },
  };
}
