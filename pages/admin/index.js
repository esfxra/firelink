import Layout from '../../components/Layout/Layout';
import styles from '../../styles/admin.module.css';

export default function Admin() {
  return (
    <Layout title="campfire">
      <h1 className={styles.headline}>admin</h1>

      <section>
        <h2 className={styles.subheadline}>links</h2>
      </section>

      <section>
        <h2 className={styles.subheadline}>appearance</h2>
      </section>

      <section>
        <h2 className={styles.subheadline}>account settings</h2>
      </section>
    </Layout>
  );
}

// export async function getStaticProps(context) {
//   const res = await fetch('http://localhost:3000/api/users/');
//   const data = await res.json();

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
