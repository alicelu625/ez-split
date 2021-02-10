import * as actionTypes from './actions';
import {updateObject} from '../shared/utility';

const intialState = {
    eventName: '',
    amountPeople: '',
    currentPage: 0,
    subtotal: 0,
    items: [],
    persons: []
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.EVENT_NAME_CHANGED:
            return updateObject(state, {eventName: action.event.target.value});
        case actionTypes.AMOUNT_PEOPLE_CHANGED:
            return updateObject(state, {amountPeople: action.event.target.value});
        case actionTypes.ON_START:
            let initialPersons = []
            for (let i = 0; i < state.amountPeople; i++) {
                initialPersons.push({
                    name: 'Person ' + i,
                    items: []
                });
            }
            return updateObject(state, {
                currentPage: state.currentPage + 1,
                persons: initialPersons
            });
        case actionTypes.NEXT_PAGE:
            return updateObject(state, {
                currentPage: state.currentPage + 1
            });
        case actionTypes.ADD_ITEM:
            //updatedItems = copy of items + new item
            let updatedItems = state.items.concat({
                name: action.name,
                price: action.price,
                claimers: []
            });
            let updatedPrice = state.subtotal + parseFloat(action.price);
            //update state
            return updateObject(state, {
                items: updatedItems,
                subtotal: updatedPrice
            });
        case actionTypes.REMOVE_ITEM:
            let updatedSubtotal = state.subtotal - state.items[action.id].price
            return updateObject(state, {
                items: state.items.filter((_, i) => i !== action.id),
                subtotal: updatedSubtotal
            });
        case actionTypes.GO_BACK:
            return updateObject(state, {currentPage: state.currentPage - 1});
        case actionTypes.CHANGE_NAME:
            let updatedPersons = updateObject(state.persons[action.id], {name: action.event.target.value});
            return updateObject(state, {persons: updatedPersons});
        default:
            return state;
    }
};

export default reducer;