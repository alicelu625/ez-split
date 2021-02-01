import * as actionTypes from './actions';

const intialState = {
    eventName: '',
    amountPeople: '',
    currentPage: 0,
    subtotal: 0,
    items: []
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
            return {
                ...state,
                eventName: state.eventName,
                amountPeople: state.amountPeople,
                currentPage: state.currentPage + 1
            }
        case actionTypes.ADD_ITEM:
            console.log(state.items);
            return {
                ...state,
                items: state.items.push({
                    name: action.name,
                    price: action.price,
                    claimers: []
                })
            }
        default:
            return state;
    }
};

export default reducer;
