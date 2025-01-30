import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircleIcon from '@mui/icons-material/Circle';



const Terminal = () => {
    return (
        <>
            <Grid item width={'90%'} spacing={5} >


                <Grid item>
                    <Typography color='white' paddingBottom={'2.5vh'}>Response</Typography>
                </Grid>

                <Box backgroundColor="#262932" sx={{height: '60vh', width: "100%", borderRadius: '25px', border: '1px solid white'}}>
                    
                    {/*Buttons on the top left */}
                    <Grid display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Grid container display={'flex'} spacing={'.5vh'} margin={'7px 7px'}>
                            <Grid item color="#C95A61"> <CircleIcon /> </Grid>
                            <Grid item color="#ECC24B"> <CircleIcon /> </Grid>
                            <Grid item color="#6AC64B"> <CircleIcon /> </Grid>
                        </Grid>

                        <Grid container spacing={'5vh'}>
                            <Grid item border="1px solid white" sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>Terminal</Typography> 
                            </Grid>
                            
                            <Grid item border="1px solid white" sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>JSON</Typography> 
                            </Grid>
                        
                            <Grid item border="1px solid white" sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>README.md</Typography> 
                            </Grid>

                        </Grid>
                    </Grid>

                    <Divider color="white"></Divider>
                </Box>
            </Grid>

        </>
    )
}

export default Terminal;