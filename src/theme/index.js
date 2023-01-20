import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useContext } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { AppThemeContext } from '../hooks/useContext';

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';


// ----------------------------------------------------------------------



const ThemeProvider = ({ children }) => {
  const context = useContext(AppThemeContext);
  const [dir, setDir] = useState('ltr');


  useEffect(() => {
    if (context && context.direction) {
      setDir(context.direction)
    }
  }, [context]);


  const cacheRtl = useMemo(() => {
    if (dir === 'rtl') {
      return createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });
    }
    return createCache({ key: 'css' });

  }, [dir]);



  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cacheRtl}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}


ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;

