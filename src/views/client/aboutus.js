import React from 'react';
import { Typography } from '@mui/material';
import { Box, List, ListItem, Grid, Divider, TextField, Container, Paper } from '@mui/material';

function aboutUs() {
  return (
    <Container maxWidth="lm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ padding: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="body2">
              While clean water is the primary concern, Water and Wastewater organizations must prioritize meeting regulations and reducing costs. With solutions coming from Storm&apos;s basket like Centralized monitoring, controlling and reporting, Storm provides a crystal clear view resulting in greater safety and efficiency.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Our solutions cater to:
            </Typography>
            <Typography variant="body2" component="ul">
              <li>Desalination</li>
              <li>Water Pumping Stations</li>
              <li>Water Distribution &amp; Irrigation</li>
              <li>Water Treatment Plants</li>
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              We offer a comprehensive range of solutions for W&amp;WW industry viz:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ marginBottom: 2 }}>
              <li>Turnkey Water Solutions</li>
              <li>Automation &amp; SCADA</li>
              <li>Water Plant Optimization</li>
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Storm offers a comprehensive portfolio of life cycle management and service solutions for the water industry - a portfolio based on extensive process and application know-how.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Our philosophy is simple: we protect your investment through the stepwise evolution and upgrading of your electrical, control, and instrumentation systems to minimize the consumption of energy, prolong asset operating life, and minimize the cost of ownership.
            </Typography>
            <Typography variant="body2">
              Ranging from simple SCADA and control applications, our suite of solutions and services ranges to advanced applications like optimization, energy efficiency application, etc.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box>
        <List sx={{ p: 0, width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', marginTop: '25px' }} aria-label="mailbox folders">
          <ListItem>
            <Typography paddingLeft={1} display="flex" flexDirection="column" alignItems="flex-start" variant="h6" gutterBottom>Contact Us</Typography>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <Box sx={{ borderRadius: "7px", borderWidth: "1px", padding: "10px", width: "100%" }}>
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                  <Typography>Contact</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="+91 9000000001"
                    margin="normal"
                    InputProps={{
                      sx: {
                        height: '36px', // Adjust the height as per your requirement
                        color: 'grey'
                      }
                    }}
                  />
                </Box>

                <Box display="flex" flexDirection="column" alignItems="flex-start" width="45%">
                  <Typography>G-mail</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="srinivasalwala22@gmail.com"
                    margin="normal"
                    InputProps={{
                      sx: {
                        height: '36px', // Adjust the height as per your requirement
                        color: 'grey'
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
                <Box display="flex" flexDirection="column" alignItems="flex-start" marginRight={2} width="45%">
                  <Typography>Address</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="12-39302-28192,Hitech-city"
                    margin="normal"
                    InputProps={{
                      sx: {
                        height: '36px', // Adjust the height as per your requirement
                        color: 'grey'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </ListItem>
          <Divider component="li" />
        </List>
      </Box>

    </Container>
  );
}

export default aboutUs;
