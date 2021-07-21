import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Layout from '../../components/Layout';
import styles from '../../styles/access.module.css';
import Button from '../../components/Button';

/**
 * @todo Add at least one more auth provider
 * @todo Consider login with email+username credentials
 */
export default function Access() {
  const [session, _] = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect users to admin if an active session exists
    if (session) {
      router.push('/admin');
    }
  });

  const handleGitHub = () => {
    signIn('github');
  };

  return (
    <Layout title="campfire | access">
      <div className={styles.access}>
        <h1>login or register</h1>
        <Button palette="carbon" onClick={handleGitHub}>
          Continue with GitHub
        </Button>
      </div>
    </Layout>
  );
}
