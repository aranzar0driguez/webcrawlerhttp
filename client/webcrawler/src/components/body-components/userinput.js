import React from "react";
import Grid from "@mui/material/Grid2";
import { TextField, Typography, Box, Button } from "@mui/material";


const UserInput = () => {
    return (
        <div>
            <Grid display='flex' sx={{flexDirection: 'column', gap: '2.5vh'}}>
                <Typography sx={{color: 'white', fontSize: '1.1rem'}}>Enter a website url:</Typography>
                
                <TextField placeholder="https://" sx={{"& .MuiOutlinedInput-notchedOutline": {border: 'none'}, input: { color: 'white'}, 
                    border: '1px solid white', borderRadius: '20px'}}/>
                
                 <Button variant="outlined" 
                      sx={{ 
                        color: "white", 
                        borderColor: "secondary.main", 
                        border: '2px solid #419285',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        textTransform: 'initial',
                        fontSize: '1rem',
                        width: '100%'
                        }}>Call the API</Button> 
            </Grid>
        </div>
    )
}

export default UserInput;

