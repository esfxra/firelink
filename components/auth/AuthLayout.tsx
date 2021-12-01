import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Flex } from '@chakra-ui/react';

import Header from '../Header';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/admin');
    }
  }, [router, session]);

  if (status === 'loading' || status === 'authenticated') {
    return null;
  }

  return (
    <>
      <Header title={title} />
      <Flex flex={1} align="center" justify="center">
        {children}
      </Flex>
    </>
  );
}
