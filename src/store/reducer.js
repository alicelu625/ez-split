import * as actionTypes from './actions';
import {updateObject} from '../shared/utility';

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
            return updateObject(state, {eventName: action.event.target.value});
        case actionTypes.AMOUNT_PEOPLE_CHANGED:
            return updateObject(state, {amountPeople: action.event.target.value});
        case actionTypes.READY_TO_START:
            return updateObject(state, {
                eventName: state.eventName,
                amountPeople: state.amountPeople,
                currentPage: state.currentPage + 1
            });
        case actionTypes.ADD_ITEM:
            let updateItems = state.items.push({
                name: action.name,
                price: action.price,
                claimers: []
            });
            let updatedItems = updateObject(state.items, updateItems);
            return updateObject(state, updatedItems);
        case actionTypes.GO_BACK:
            return updateObject(state, {currentPage: state.currentPage - 1});
        default:
            return state;
    }
};

export default reducer;
