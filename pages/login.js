import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Layout from '../components/Layout/Layout';

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

  function login() {
    signIn('github');
  }

  return (
    <div>
      <Layout title="campfire - login">
        <h1>login</h1>
        <button onClick={login}>Continue with GitHub</button>
      </Layout>
    </div>
  );
}
