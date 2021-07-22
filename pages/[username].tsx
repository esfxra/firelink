import Image from 'next/image';
import { connectToDB } from '../db/connect';
import { getUserByUsername } from '../db/user';
import { getLinksByUserID } from '../db/link';
import ProfileLayout from '../components/ProfileLayout';
import styles from '../styles/user.module.css';

export default function User({ user, links }) {
  return (
    <ProfileLayout title={`@${user.username} | campfire`}>
      {/* Profile details */}
      <div className={styles.userDetails}>
        {user.image && (
          <Image
            src={user.image}
            width={100}
            height={100}
            className={styles.avatar}
            alt="User profile picture"
          />
        )}
        <div className={styles.name}>@{user.username}</div>
      </div>

      {/* Links */}
      <div className={styles.links}>
        {!links.length ? (
          <p>No links to see yet</p>
        ) : (
          links.map((link) => {
            if (!link.published) {
              return;
            }

            return (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={link._id}
              >
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

  const result = await getUserByUsername(db, username);

  // Handle the case for which the user doesn't exist
  if (!result.success) {
    return {
      notFound: true,
    };
  }

  const user = result.data;
  const links = await getLinksByUserID(db, user._id);

  return {
    props: {
      user,
      links,
    },
  };
}
