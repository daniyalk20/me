import React from 'react';
import HeroImage from './SubComponents/HeroImage';
import HeroIntroduction from './SubComponents/HeroIntroduction';
import { Box, Stack } from '@mui/material';

function BodyComponent() {
    return (
        <Stack direction="row" justifyContent="space-evenly" alignItems={'center'} className="App-body">
            <HeroIntroduction />
            <HeroImage />
        </Stack>
    );
}

export default BodyComponent;