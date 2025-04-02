import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid2";
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({apiData}) {
  const [consoleData, setData] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
//  THis is one the one we're KEEPING   
useEffect(() => {
    const eventSource = new EventSource("http://localhost:3300/currenttime");

    //  Listens for incoming messages from the SSE server 
    eventSource.onmessage = (event) => {

      if (event.data.includes("actively crawling") || event.data.includes("Hooray")) {
        setData((prev) => prev + "\n" + event.data);
      } else {
        setData('Connection Established')
      }

      console.log("SSE Update:", event.data);
    };

    return () => {
        eventSource.close();
    };
}, []);



  return (
    <Box sx={{ width: '100%' }}>
      <Box >

      <Grid container display={'flex'} spacing={'.5vh'} margin={'7px 7px'} sx={{flexDirection: 'row', alignItems: 'center' }}>
        
        <Grid item color="#C95A61"> <CircleIcon /> </Grid>
        <Grid item color="#ECC24B"> <CircleIcon /> </Grid>
        <Grid item color="#6AC64B"> <CircleIcon /> </Grid>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary">
          <Tab label="Terminal" {...a11yProps(0)} sx={{color: 'white !important'}}/>
          <Tab label="JSON" {...a11yProps(1)} sx={{color: 'white !important'}}/>
          <Tab label="README.md" sx={{color: 'white !important'}}{...a11yProps(2)} />
        </Tabs>

      </Grid>
       
      </Box>

        {/**Real-time console terminal */}
        <CustomTabPanel value={value} index={0}>
            {consoleData  ? (
                 <pre style={{
                    color: 'white',
                    margin: '0',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                 }}>{consoleData}</pre>

            ) : (
              <Typography color="white" id="log">
                Connection Established
              </Typography>
            )
            }

           
        </CustomTabPanel>

        {/**JSON Data */}
        <CustomTabPanel value={value} index={1}>

            {apiData && apiData.length > 0 ? (
                <pre style={{
                    color: 'white',
                    margin: '0',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                }}>
                    {JSON.stringify(apiData, null, 2)}
                </pre>
                ) : (
                <Typography color="white">
                    No data available
                </Typography>
                )}

        </CustomTabPanel>

        {/**README.md file */}
        <CustomTabPanel value={value} index={2}>
        Readme.md stuff
        </CustomTabPanel>

      </Box>
  );
}
