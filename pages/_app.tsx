import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
