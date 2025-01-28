import './App.css';
import webCrawlerTheme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from './pages/home';


function App() {
  return (
    <ThemeProvider theme={webCrawlerTheme} >
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
