import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircleIcon from '@mui/icons-material/Circle';



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
                        sx={{borderBottom: '1px solid white', position: 'sticky', top: 0, zIndex: 10}} >

                        <Grid container display={'flex'} spacing={'.5vh'} margin={'7px 7px'}>
                            <Grid item color="#C95A61"> <CircleIcon /> </Grid>
                            <Grid item color="#ECC24B"> <CircleIcon /> </Grid>
                            <Grid item color="#6AC64B"> <CircleIcon /> </Grid>
                        </Grid>

                        <Grid container spacing={'5vh'}>
                            <Grid item  sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>Terminal</Typography> 
                            </Grid>
                            
                            <Grid item sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>JSON</Typography> 
                            </Grid>
                        
                            <Grid item sx={{padding: '4px 4px'}}> 
                                <Typography color='white'>README.md</Typography> 
                            </Grid>

                        </Grid>
                    </Grid>

                    {/**Terminal */}


                    {/**JSON Data */}
                    {apiData && apiData.length > 0 ? (
                        <pre style={{
                            color: 'white',
                            padding: '20px',
                            margin: '0',
                            fontFamily: 'monospace',
                            fontSize: '12px'
                        }}>
                            {JSON.stringify(apiData, null, 2)}
                        </pre>
                        ) : (
                        <Typography color="white" sx={{ p: 2 }}>
                            No data available
                        </Typography>
                        )}

                    {/**README.md */}


                </Box>
            </Grid>

        </>
    )
}

export default Terminal;