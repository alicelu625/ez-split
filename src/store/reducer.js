import * as actionTypes from './actions';

const intialState = {
    eventName: '',
    amountPeople: '',
    currentPage: 0
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
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
        case actionTypes.READY_TO_START:
            console.log(state.currentPage);
            return {
                ...state,
                eventName: state.eventName,
                amountPeople: state.amountPeople,
                currentPage: state.currentPage + 1
            }
    }
    return state;
};

export default reducer;
