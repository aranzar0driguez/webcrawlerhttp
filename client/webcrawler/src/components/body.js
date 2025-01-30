import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import UserInput from "./body-components/userinput";
import Grid from "@mui/material/Grid2";
import Terminal from "./body-components/terminal";



const Body = () => {
  return (
    <div style={{paddingBottom: '20vh'}}>
        {/** Top of the second section */}
        <Box display={'flex'} sx={{flexDirection: 'column', alignItems: 'center', gap: '20px'}} textAlign={'center'} padding={'10vh 0px'}>
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
            <Grid 
                size={7} 
                display='flex' 
                flexDirection='column' 
                gap='2.5vh' 
                style={{ border: '1px solid white' }}
                >
                    {/* <div style={{ width: '100%', display: 'flex' }}>
                        <Grid item>
                            <Typography color='white'>Response</Typography>
                        </Grid>
                    </div> */}

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Terminal />
                    </div>
                </Grid>
        </Grid >
       
    </div>
  )
};

export default Body;
