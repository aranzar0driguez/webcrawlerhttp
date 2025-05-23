import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import UserInput from "./body-components/userinput";
import Grid from "@mui/material/Grid2";
import Terminal from "./body-components/terminal";
import { getData } from '../api';

const Body = () => {

    const [requestInfo, setRequestInfo] = useState("")
    const [terminalData, setData] = useState([]) 
    const [element, setElement] = useState({})

    useEffect(() => {
        
        let isMounted = true
        
        const callAPIfunc = async () => {

            const result = await getData(requestInfo.arrayOfURLs, element) //   This is what calls the crawls functio and appears to be (pending)
            if (isMounted) {
                
                setData(result)
            }
        }
        callAPIfunc()

        return () => {
            isMounted = false
        }
      }, [requestInfo, element]);

    async function getUserRequestURL(formData) {

        setData("") //  Resets the text on the terminal

        const url = formData.get("url")
        const tags = formData.getAll("tags")

        var str = url.replace(/\s/g, ''); //    Removes white spaces from the string
        const arrayOfURLs = str.split(','); // Converts it into an array 

        const allData = {
            arrayOfURLs,
            tags
        }
        
        let tagsArray = {
            titles: {
                crawl: tags.includes("titleTags")
            },
            headers: {
                crawl: tags.includes("headerTags")
            },
            metaData: {
                crawl: tags.includes("metaTags")
            }
        }
        
        setElement(tagsArray)
        setRequestInfo(allData)
  
      }

    return (
        <div style={{paddingBottom: '20vh'}}>
            {/** Top of the second section */}
            <Box display={'flex'} sx={{flexDirection: 'column', alignItems: 'center'}} textAlign={'center'} padding={'10vh 0px'}>
                <Typography variant="h3">What is Crawlz?</Typography>
                <Typography color="white" sx={{ width: {xs: '70vw', sm: '70vw', md: '40vw'}}}>Crawlz is an API aimed at providing you with crawl results you can use to 
                    train your machine-learning model. Go on, give it a try!
                </Typography>
            </Box>

            {/**Second half of the section */}
            <Grid container spacing={10} justifyContent={'center'} 
                sx={{
                    flexDirection: {xs: 'column', sm: 'column', md: 'row'},
                    alignItems: {xs: 'center', sm: 'center'}
                    }} >
                
                {/**Size was originaly 3 */}
                <Grid height='auto' sx={{size: {xs: 9, sm: 9, md: 3}}}>

                    {/**This is where the user can input the website's URL + call the api (left side) */}
                    <UserInput handleURL={getUserRequestURL}/>
                </Grid>

                <Grid display='flex' style={{justifyContent: 'right'}} sx={{size: {xs: 9, sm: 9, md: 7}}}>
                    
                    {/* <Grid item width={'90%'} spacing={5} > */}
                        <Terminal apiData={terminalData}/> {}
                    {/* </Grid> */}
                </Grid>
            </Grid >
        
        </div>
    )
};

export default Body;
