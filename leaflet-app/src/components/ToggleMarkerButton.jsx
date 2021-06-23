import React from 'react';
import { Button } from '@material-ui/core';

function ToggleMarkerButton({ changeMode }) {

    return (
        <Button style={{ marginLeft: '4px' }} color='primary' variant='outlined' onClick={changeMode}>
            Change Marking Mode
        </Button>
    );
}

export default ToggleMarkerButton;
