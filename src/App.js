// routes
import CustomRouter from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AppThemeProvider } from './hooks/useContext';


// ----------------------------------------------------------------------

export default function App() {
  const direction = 'ltr';

  return (
    <AppThemeProvider
      value={{
        direction
      }}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />

        <CustomRouter />

      </ThemeProvider>
    </AppThemeProvider>
  );
}


