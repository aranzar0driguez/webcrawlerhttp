import  React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { TextField, Typography, Button, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

const UserInput = (props) => {

    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const [status, setStatus] = useState({
        externalLinks: true,
        metatags: true,
        headerTags: true,
        titleTags: true
    })

    function resetCheckboxes() {
        setStatus({
            externalLinks: false,
            metatags: false,
            headerTags: false,
            titleTags: false
        })
    }

    useEffect(() => {
        const allUnchecked = Object.values(status).every((value) => !value)
        setButtonDisabled(allUnchecked)
    }, [status])

    return (
        <form action={props.handleURL} onSubmit={resetCheckboxes}>
            <Grid display='flex' 
                sx={{
                    flexDirection: 'column', 
                    width: {xs: '70vw', sm: '70vw', md: '100%'},
                    gap: '2.5vh'}}>
                <Typography sx={{color: 'white', fontSize: '1.1rem'}}>Enter a website url:</Typography>
                
                <TextField placeholder="https://" name="url" sx={{"& .MuiOutlinedInput-notchedOutline": {border: 'none'}, input: { color: 'white'}, 
                    border: '1px solid white', borderRadius: '20px'}} required/>

                <Divider style={{margin: '5px 0px', height: '0px'}}></Divider>

                <Typography sx={{color: 'white', fontSize: '1.1rem'}}>What would you like to scrape?</Typography>

                <FormGroup>

                    <FormControlLabel control={<Checkbox
                        checked={status.externalLinks}
                        onChange={(event) => 
                            setStatus({...status, externalLinks: event.target.checked})
                        }
                        label="External Links" 
                        name="tags" 
                        value="externalLinks" 
                        color="secondary" 
                        sx={{color: 'white'}}  />} 

                        label={<Typography color="white">External Links</Typography>}/>

                    <FormControlLabel control={<Checkbox 
                        checked={status.metatags} 
                        onChange={(event) => 
                            setStatus({...status, metatags: event.target.checked})
                        }
                        label="Meta Tags" 
                        name="tags" 
                        value="metaTags" 
                        color="secondary" 
                        sx={{color: 'white'}} />} 

                        label={<Typography color="white">Meta tags</Typography>}/>

                    <FormControlLabel control={<Checkbox 
                        checked={status.headerTags} 
                        onChange={(event) => 
                            setStatus({...status, headerTags: event.target.checked})
                        }
                        label="Header Tags" 
                        name="tags" 
                        value="headerTags" 
                        color="secondary" 
                        sx={{color: 'white'}} />} 

                        label={<Typography color="white">Header tags</Typography>}/>

                    <FormControlLabel control={<Checkbox 
                        checked={status.titleTags} 
                        onChange={(event) => 
                            setStatus({...status, titleTags: event.target.checked})
                        }
                        label="Title tags" 
                        name="tags" 
                        value="titleTags" 
                        color="secondary" 
                        sx={{color: 'white'}} />} 

                        label={<Typography color="white">Title tags</Typography>}/>

                </FormGroup> 

                <Divider style={{margin: '5px 0px', height: '0px'}}></Divider>

                <Button disabled={isButtonDisabled} type="submit" variant="outlined"
                    sx={{ 
                        color: "white", 
                        borderColor: "secondary.main", 
                        border: '2px solid #419285',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        textTransform: 'initial',
                        fontSize: '1rem',
                        width: '100%',
                        maxWidth: '300px',
                        "&:disabled": {  // Override disabled styles
                            color: "gray",
                            border: "2px solid gray",
                          }
                        }}>Call the API</Button> 

            </Grid>
        </form>
    )
}

export default UserInput;

