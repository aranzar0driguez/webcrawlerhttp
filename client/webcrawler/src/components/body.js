import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";



const Body = () => {
  return (
    <div>
        {/** Top of the second section */}
        <Box display={'flex'} sx={{flexDirection: 'column', alignItems: 'center', gap: '20px'}} textAlign={'center'} padding={'10vh 0px'}>
            <Typography variant="h3">What is Crawlz?</Typography>
            <Typography color="white" style={{width: '40vw'}}>Crawlz is an API aimed at providing you with crawl results you can use to 
                train your machine-learning model. Go on, give it a try!
            </Typography>
        </Box>

        <Grid container spacing={2} justifyContent={'center'} >
            <Grid size={3} height="300px" sx={{border: '1px solid white'}}>
                hey
            </Grid>
            <Grid size={8} height="300px" sx={{border: '1px solid white'}}>
                hey
            </Grid>
        </Grid >
       
    </div>
  )
};

export default Body;
