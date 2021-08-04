import { Provider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
