import React from "react";
import { Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';



const Header = () => {
  return (
    <div className="header" >
        <Container  sx={{display: 'flex', flexDirection: 'row', paddingTop: '20vh'}}>
            
            <Container sx={{width: '70vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                
                <p style={{ fontSize: '130px', fontWeight: 'bold', lineHeight: 1, display: 'block', width: 'fit-content'}}>Crawlz</p>
                
                <div className="wrapper">
                    <div variant="h4" className="static-txt">You can crawl</div>
                    <ul className="dynamic-txts">
                        <li><span>meta tags</span></li>
                        <li><span>header tags</span></li>
                        <li><span>external links</span></li>
                        <li><span>title tags</span></li>

                    </ul>
                </div>

                <Button variant="outlined"  
                    sx={{ 
                        marginLeft: '15px', 
                        color: "white", 
                        borderColor: "secondary.main", 
                        border: '2px solid #419285',
                        borderRadius: '20px',
                        padding: '10px 10px',
                        textTransform: 'capitalize'
                        }}>
                    Try it!</Button>
              
                
            </Container>

            <Container sx={{width: '10vw'}}>
            {/*Empty container */}
            </Container>
        </Container>
    </div>
  );
};

export default Header;
