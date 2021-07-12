import Link from 'next/link';
import { connectToDB } from '../db/connect';
import { getUsers } from '../db/user';
import Layout from '../components/Layout/Layout';
import styles from '../styles/index.module.css';

export default function Home({ users }) {
  return (
    <Layout title="campfire">
      <h1 className={styles.headline}>discover profiles</h1>
      <div className={styles.profiles}>
        {users.map((user) => {
          return (
            <Link href={`/${user._id}`} key={user._id}>
              <a className={styles.profile}>@{user._id}</a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDB();
  const users = await getUsers(db);

  return {
    props: { users }, // will be passed to the page component as props
  };
}
