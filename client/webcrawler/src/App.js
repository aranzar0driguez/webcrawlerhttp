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
      {/* <div>{data.map((url) => {
        return (
          <>
            <h1 style={{color: 'black'}}>{url.rootURL}</h1>
            
          </>
        )
      })}</div>  */}
    </ThemeProvider>
  );
}

export default App;
