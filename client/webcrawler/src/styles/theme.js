import { createTheme } from '@mui/material/styles';

const webCrawlerTheme = createTheme({
    palette: {
        primary: {
          main: "#1F2000" // Very dark blue
        },
        secondary: {
          main: "#419285", // Teal blue
        },
        
        background: {
          default: "#1F2000", // Very dark blue
        },
        text: {
          primary: "#419285", // White
        },
      },
      typography: {
        fontFamily: 'Comfortaa',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 470,

      }
})

export default webCrawlerTheme;