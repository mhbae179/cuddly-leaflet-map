import React, { createContext, useReducer, useContext } from 'react'

const initialState = {
    multiPos: [
    ],
    mousePos: {
        lat: null,
        lng: null
    },
    distance: 0,
    searchPos: {
        name: '',
        lat: null,
        lng: null
    }
}

function polyLineReducer(state, action) {
    switch (action.type) {
        case 'DRAW_MULTILINE':
            return {
                ...state,
                multiPos: state.multiPos.concat({
                    lat: action.pos.lat,
                    lng: action.pos.lng
                })
            }
        case 'CLEAR_MULTILINE':
            return {
                ...state,
                multiPos: []
            }
        case 'GET_DISTANCE':
            return {
                ...state,
                distance: action.distance
            }
        case 'GET_MOUSE_POS':
            return {
                ...state,
                mousePos: action.pos
            }
        case 'GET_SEARCH_POS':
            return {
                ...state,
                searchPos: action.pos,
            }
        default:
            return state;
    }
}

const PolyLineStateContext = createContext(null);
const PolyLineDispatchContext = createContext(null);

export function PolyLineProvider({ children }) {
    const [state, dispatch] = useReducer(polyLineReducer, initialState);

    return (
        <PolyLineDispatchContext.Provider value={dispatch}>
            <PolyLineStateContext.Provider value={state}>
                {children}
            </PolyLineStateContext.Provider>
        </PolyLineDispatchContext.Provider>
    );
}

export function PolyLineState() {
    const state = useContext(PolyLineStateContext);
    if (!state) {
        throw new Error('PolyLineProvider not found');
    }
    return state;
}

export function PolyLineDispatch() {
    const dispatch = useContext(PolyLineDispatchContext);
    if (!dispatch) {
        throw new Error('PolyLineProvider not found');
    }
    return dispatch;
}
