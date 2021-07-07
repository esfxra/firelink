import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import styles from '../styles/index.module.css';

export default function Home({ data }) {
  return (
    <Layout title="campfire">
      <h1 className={styles.headline}>discover profiles</h1>
      <div className={styles.profiles}>
        {data.map((user) => (
          <Link href={`/${user.username}`} key={user._id}>
            <a className={styles.profile}>@{user.username}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/users');
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
