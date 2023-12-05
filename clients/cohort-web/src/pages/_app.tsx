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
import { SplashScreen } from '@tymlez/devias-material-kit/dist/components/splash-screen';
import {
  SettingsConsumer,
  SettingsProvider,
} from '@tymlez/devias-material-kit/dist/contexts/settings-context';
import { LicenseInfo } from '@mui/x-license-pro';

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
  initAxiosAuth,
  SiteProvider,
} from '@tymlez/frontend-libs';

LicenseInfo.setLicenseKey(
  'c04a656bebdf77826e21f743745cf663Tz00NDc0NyxFPTE2ODU1MjY4OTA2NTQsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

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
        <title>Cohort Dashboard</title>
        <meta httpEquiv="refresh" content="3600" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <SiteProvider>
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
                                <SplashScreen />
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
              </SiteProvider>
            </AuthProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
