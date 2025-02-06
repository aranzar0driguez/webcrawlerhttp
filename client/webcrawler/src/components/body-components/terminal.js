import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BasicTabs from './tabs'



const Terminal = ({apiData}) => {
    return (
        <>
            <Grid item spacing={5} 
                sx={{
                    width: {xs: '70vw',
                        sm: '70vw',
                        md: '52.5vw'
                    }}}
            >

                <Grid item>
                    <Typography color='white' paddingBottom={'2.5vh'}>Response</Typography>
                </Grid>

                <Box backgroundColor="#262932" sx={{height: '60vh', width: "100%", borderRadius: '25px', overflow: 'scroll'}}>
                    
                    {/*Buttons on the top left */}
                    <Grid backgroundColor='inherit' display={'flex'} flexDirection={'row'} alignItems={'center'}
                        sx={{position: 'sticky', top: 0, zIndex: 10}} >

                        <Grid container spacing={'5vh'}>
     
                            <BasicTabs apiData={apiData}/>

                        </Grid>
                    </Grid>

                    {/**Terminal */}


                    

                    {/**README.md */}


                </Box>
            </Grid>

        </>
    )
}

export default Terminal;