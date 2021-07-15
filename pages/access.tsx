import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Layout from '../components/Layout';
import styles from '../styles/access.module.css';

/**
 * @todo Add at least one more auth provider
 * @todo Consider login with email+username credentials
 */
export default function Login() {
  const [session, _] = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect users to admin if an active session exists
    if (session) {
      router.push('/admin');
    }
  });

  function handleGitHub() {
    signIn('github');
  }

  return (
    <Layout title="campfire - login">
      <h1>login or register</h1>
      <button className={styles.gitHubButton} onClick={handleGitHub}>
        Continue with GitHub
      </button>
    </Layout>
  );
}
