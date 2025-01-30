import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import UserInput from "./body-components/userinput";
import Grid from "@mui/material/Grid2";
import Terminal from "./body-components/terminal";



const Body = () => {
  return (
    <div style={{paddingBottom: '20vh'}}>
        {/** Top of the second section */}
        <Box display={'flex'} sx={{flexDirection: 'column', alignItems: 'center'}} textAlign={'center'} padding={'10vh 0px'}>
            <Typography variant="h3">What is Crawlz?</Typography>
            <Typography color="white" style={{width: '40vw'}}>Crawlz is an API aimed at providing you with crawl results you can use to 
                train your machine-learning model. Go on, give it a try!
            </Typography>
        </Box>

        {/**Second half of the section */}
        <Grid container spacing={5} justifyContent={'center'} >
            
            <Grid size={3} height="300px" >

                {/**This is where the user can input the website's URL + call the api (left side) */}
                <UserInput />
            </Grid>

            <Grid size={7} display='flex' style={{justifyContent: 'right'}}>
                
                {/* <Grid item width={'90%'} spacing={5} > */}
                    <Terminal />
                {/* </Grid> */}
            </Grid>
        </Grid >
       
    </div>
  )
};

export default Body;
