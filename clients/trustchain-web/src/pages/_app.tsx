import React, { useEffect } from 'react';
import type { FC } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import nProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RTL } from '@tymlez/devias-material-kit/dist/components/rtl';
import {
  SettingsConsumer,
  SettingsProvider,
} from '@tymlez/devias-material-kit/dist/contexts/settings-context';

import { gtmConfig } from '@tymlez/devias-material-kit/dist/config';
import { gtm } from '@tymlez/devias-material-kit/dist/lib/gtm';
import { store } from '@tymlez/devias-material-kit/dist/store';
import { createTheme } from '@tymlez/devias-material-kit/dist/theme';
import { createEmotionCache } from '@tymlez/devias-material-kit/dist/utils/create-emotion-cache';
import '@tymlez/devias-material-kit/dist/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  AuthConsumer,
  AuthProvider,
  LoadingSquare,
  initAxiosAuth,
} from '@tymlez/frontend-libs';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
initAxiosAuth();

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Platform Trustchain Viewer</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/trustchain/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="images/png"
          sizes="32x32"
          href="/trustchain/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="images/png"
          sizes="16x16"
          href="/trustchain/favicons/favicon-16x16.png"
        />
        <meta httpEquiv="refresh" content="3600" />
      </Head>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => (
                    <ThemeProvider
                      theme={createTheme({
                        direction: settings.direction,
                        responsiveFontSizes: settings.responsiveFontSizes,
                        mode: settings.theme,
                      })}
                    >
                      <RTL direction={settings.direction ?? 'ltr'}>
                        <CssBaseline />
                        <Toaster position="top-center" />
                        {/* TODO: Uncomment this button after client demo */}
                        {/* <SettingsButton /> */}
                        <AuthConsumer>
                          {(auth) =>
                            !auth.isInitialized ? (
                              <LoadingSquare title="Loading from blockchain..." />
                            ) : (
                              getLayout(<Component {...pageProps} />)
                            )
                          }
                        </AuthConsumer>
                      </RTL>
                    </ThemeProvider>
                  )}
                </SettingsConsumer>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
