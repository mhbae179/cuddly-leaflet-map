import React, { createContext, useReducer, useContext } from 'react'

const initialState = {
    pos: {
        lat: 37.6542584,
        lng: 127.0419499,
    },
    loaded: false,
    markingMode: false,
    placeDrawerOpen: false,
    markerPos: {
        lat: null,
        lng: null,
    },
    markerPlaces: [

    ]
    // position, placeName, description, seeMoreLink
}

function mapReducer(state, action) {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                pos: action.pos,
                loaded: !state.loaded
            };
        case 'ADD_MARKER':
            return {
                ...state,
                markerPlaces: state.markerPlaces.concat({
                    ...action.placeInfo,
                    lat: state.markerPos.lat,
                    lng: state.markerPos.lng
                })
            };
        case 'CHANGE_MODE':
            return {
                ...state,
                markingMode: !state.markingMode
            };
        case 'DRAWER_OPEN':
            return {
                ...state,
                placeDrawerOpen: !state.placeDrawerOpen
            };
        case 'SET_MARKER_POS':
            return {
                ...state,
                markerPos: action.markerPos
            }
        default:
            return state;
    }
}

const MapStateContext = createContext(null);
const MapDispatchContext = createContext(null);

export function MapProvider({ children }) {
    const [state, dispatch] = useReducer(mapReducer, initialState);

    return (
        <MapDispatchContext.Provider value={dispatch}>
            <MapStateContext.Provider value={state}>
                {children}
            </MapStateContext.Provider>
        </MapDispatchContext.Provider>
    );
}

export function MapState() {
    const state = useContext(MapStateContext);
    if(!state) {
        throw new Error('');
    }
    return state;
}

export function MapDispatch() {
    const dispatch = useContext(MapDispatchContext);
    if(!dispatch) {
        throw new Error('');
    }
    return dispatch;
}
