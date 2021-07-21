import Link from 'next/link';
import { connectToDB } from '../db/connect';
import { getUsers } from '../db/user';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from '../styles/index.module.css';

export default function Home({ users }) {
  return (
    <Layout title="campfire">
      <h1 className={styles.headline}>discover profiles</h1>
      <div className={styles.profiles}>
        {users.map((user: any) => {
          if (user.username) {
            return (
              <Link href={`/${user.username}`} key={user.username}>
                <a>
                  <Button>@{user.username}</Button>
                </a>
              </Link>
            );
          }
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDB();
  const users = await getUsers(db);

  return {
    props: { users },
  };
}
