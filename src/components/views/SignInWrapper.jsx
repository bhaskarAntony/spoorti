import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { HeaderSignIn, HeaderNavSignIn } from '../organisms';

export const SignInWrapper = ({children, pagename, pagedesc="", bannerImages, ...props}) => {
    return <Box sx={{ flexGrow: 1 }}>
        <Grid className={`overall_container ${props.customContClass}`} container spacing={2}>
            <Grid item xs={12} md={12}>
                <HeaderSignIn />
                <HeaderNavSignIn />
                {children}
            </Grid>
        </Grid>
    </Box>;
};

SignInWrapper.defaultProps = {};
  
export default SignInWrapper;
