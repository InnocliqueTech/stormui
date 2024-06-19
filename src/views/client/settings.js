import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Settings = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Terms & Conditions
      </Typography>

      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          1. ACCEPTANCE THE USE OF LOREM IPSUM TERMS AND CONDITIONS
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your access to and use of Lorem Ipsum (the app) is subject exclusively to these Terms and Conditions. You will not use the app for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the app you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the app.
        </Typography>
      </Box>

      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          2. CREDIT CARD DETAILS
        </Typography>
        <Typography variant="body1" gutterBottom>
          All Lorem Ipsum purchases are managed by the individual App Stores (Apple, Google Windows) and Lorem Ipsum will never store your credit card information or make it available to any third parties. Any purchasing information provided will be provided directly from you to the respective App Store and you will be subject to their credit card policies.
        </Typography>
      </Box>

      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          3. LEGAL ADVICE
        </Typography>
        <Typography variant="body1" gutterBottom>
          The contents of Lorem Ipsum app do not constitute advice and should not be relied upon in making or refraining from making, any decision. All material contained on Lorem Ipsum is provided without any or warranty of any kind. You use the material on Lorem Ipsum at your own discretion.
        </Typography>
      </Box>
\
      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          4. CHANGE OF USE
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="4.1 change or remove (temporarily or permanently) the app or any part of it without notice and you confirm that Lorem Ipsum shall not be liable to you for any such change or removal and."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="4.2 change these Terms and Conditions at any time, and your continued use of the app following any changes shall be deemed to be your acceptance of such change."
            />
          </ListItem>
        </List>
      </Box>

      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          5. LINKS TO THIRD PARTY APPS AND WEBSITES
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem Ipsum app may include links to third party apps and websites that are controlled and maintained by others. Any link to other apps or websites is not an endorsement of such and you acknowledge and agree that we are not responsible for the content or availability of any such sites.
        </Typography>
      </Box>
    </Container>
  );
};
export default Settings;
