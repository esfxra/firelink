import Image from 'next/image';
import { connectToDB } from '../db/connect';
import { getUserByUsername } from '../db/user';
import { getLinksByUserID } from '../db/link';
import ProfileLayout from '../components/ProfileLayout';
import styles from '../styles/user.module.css';

export default function User({ user, links }) {
  return (
    <ProfileLayout title={`@${user.username} | campfire`}>
      <div className={styles.userDetails}>
        {user.image && (
          <Image
            src={user.image}
            width={100}
            height={100}
            className={styles.avatar}
          />
        )}

        <div className={styles.name}>@{user.username}</div>
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
    </ProfileLayout>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const { db } = await connectToDB();

  const user = await getUserByUsername(db, username);
  const links = await getLinksByUserID(db, user._id);

  return {
    props: {
      user,
      links,
    },
  };
}
