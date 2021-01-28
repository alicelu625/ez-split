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
                eventName: state.eventName
            }
        case actionTypes.EVENT_NAME_CHANGED:
            return {
                ...state,
                eventName: action.event.target.value
            }
        case actionTypes.AMOUNT_PEOPLE_CHANGED:
            return {
                ...state,
                amountPeople: action.event.target.value
            }
    }
    return state;
};

export default reducer;
