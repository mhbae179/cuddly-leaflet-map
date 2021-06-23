import React, { useState } from 'react';
import { Drawer, Button, Typography, makeStyles } from '@material-ui/core';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        display: 'flex',
        alignItems: 'center',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        backgroundColor: '#1976d2',
        marginBottom: '8px',
    },
    input: {
        width: '97%',
    },
    inputContent: {
        marginBottom: '16px',
    }
}));

function PlaceDrawer({ open, addMarkingPlace, setDrawerOpen }) {
    const [placeInfo, setPlaceInfo] = useState({
        placeName: '',
        description: '',
        seeMoreLink: '',
    });
    const classes = useStyles();

    
    const handleClick = e => {
        e.preventDefault();
        addMarkingPlace(placeInfo)
        setDrawerOpen()
        setPlaceInfo({
            placeName: '',
            description: '',
            seeMoreLink: '',
        })
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography variant='h6'>
                    Add New Place
                </Typography>
            </div>
            <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className={classes.inputContent}>
                    <Typography variant='h6'>
                        Place Name
                    </Typography>
                    <input className={classes.input} value={placeInfo.placeName} onChange={e => setPlaceInfo({
                        ...placeInfo,
                        placeName: e.target.value
                    })}
                    />
                </div>
                <div className={classes.inputContent}>
                    <Typography variant='h6'>
                        Description
                    </Typography>
                    <input className={classes.input} value={placeInfo.description} onChange={e => setPlaceInfo({
                        ...placeInfo,
                        description: e.target.value
                    })}
                    />
                </div>
                <div className={classes.inputContent}>
                    <Typography variant='h6'>
                        See More Link
                    </Typography>
                    <input className={classes.input} value={placeInfo.seeMoreLink} onChange={e => setPlaceInfo({
                        ...placeInfo,
                        seeMoreLink: e.target.value
                    })}
                    />
                </div>
            </div>
            <Button color='primary' variant='outlined' onClick={e => handleClick(e)}>
                SAVE
            </Button>
        </Drawer>
    );
}

export default PlaceDrawer;
