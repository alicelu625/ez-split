import * as actionTypes from './actions';

const intialState = {
    eventName: '',
    amountPeople: 0
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EVENT_NAME:
            return {
                ...state,
                eventName: action.eventName
            }
    }
    return state;
};

export default reducer;
