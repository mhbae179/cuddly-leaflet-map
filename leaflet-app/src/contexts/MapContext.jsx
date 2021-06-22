import React, { createContext, useReducer, useContext } from 'react'

const initialState = {
    pos: {
        lat: 37.6542584,
        lng: 127.0419499,
    },
    loaded: false,
}

function mapReducer(state, action) {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                pos: action.pos,
                loaded: !state.loaded
            };
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
