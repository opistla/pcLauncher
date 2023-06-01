import React, { createContext, useRef } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '@/util/createEmotionCache';
import lightThemeOptions from '@/styles/theme/lightThemeOptions';
import { Modal } from '@/components/elements';
import '@/styles/globals.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface IModalContext {
  [x: string]: any;
  show: () => void
  close: () => void
}

export const ModalContext = createContext<IModalContext>({
  show: () => {},
  close: () => {}
});

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const modalRef = useRef<null | HTMLDivElement>(null) as any;

  return (
    <ModalContext.Provider value={modalRef}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Modal ref={modalRef} />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ModalContext.Provider>
  );
};

export default MyApp;