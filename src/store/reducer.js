import * as actionTypes from "./actions"
import {updateObject} from "../shared/utility"

const intialState = {
    eventName: "",
    amountPeople: "",
    personId: 0,
    itemId: 0,
    currentPage: 0,
    subtotal: 0,
    taxedItemSubtotal: 0,
    items: [],
    persons: [],
    fees: [],
    total: 0
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ON_START:
            let initialPersons = [];
            let amountPeople = parseInt(action.amountPeople);
            //create person objects = to amountPeople & push to array
            for (let i = 0; i < amountPeople; i++) {
                initialPersons.push({
                    personId: i,
                    name: "Person " + i,
                    items: [],
                    splitFees: [],
                    total: 0
                });
            }
            //set persons state to created array
            return updateObject(state, {
                currentPage: state.currentPage + 1,
                persons: initialPersons,
                personId: amountPeople,
                eventName: action.eventName,
                amountPeople: amountPeople
            });
        case actionTypes.NEXT_PAGE:
            return updateObject(state, {
                currentPage: state.currentPage + 1
            });
        case actionTypes.ADD_ITEM:
            let itemNum = state.itemId;
            //updatedItems = copy of items + new item
            let updatedItems = state.items.concat({
                itemId: itemNum,
                name: action.name,
                price: parseFloat(action.price),
                persons: [],
                taxed: false,
                splitPrice: 0,
                splitFees: []
            });
            //update price
            let updatedPrice =
                state.subtotal + parseFloat(action.price);
            //update state
            return updateObject(state, {
                itemId: itemNum + 1,
                items: updatedItems,
                subtotal: updatedPrice
            });
        case actionTypes.REMOVE_ITEM:
            //update subtotal
            let updatedSubtotal = state.subtotal - state.items[action.id].price;
            //update items excluding removed item & update subtotal object
            return updateObject(state, {
                items: state.items.filter((_, i) => i !== action.id),
                subtotal: updatedSubtotal
            });
        case actionTypes.GO_BACK:
            return updateObject(state, {currentPage: state.currentPage - 1});
        case actionTypes.CHANGE_NAME:
            //update person object
            let updatedPerson = updateObject(state.persons[action.id], {
                name: action.event.target.value
            });
            //update persons array by replacing w/ new person object
            let updatedPersons = [...state.persons]
            updatedPersons[action.id] = updatedPerson;
            //set state persons to updated persons array
            return updateObject(state, {persons: updatedPersons})
        case actionTypes.ADD_PERSON:
            //add to amount of people
            let updatedAmountPeople = state.amountPeople + 1
            //get new person index
            //add person object to persons array
            let AddedToPersons = state.persons.concat({
                personId: state.personId,
                name: "Person " + state.personId,
                items: [],
                splitFees: []
            });
            //update states
            return updateObject(state, {
                personId: state.personId + 1,
                amountPeople: updatedAmountPeople,
                persons: AddedToPersons
            });
        case actionTypes.REMOVE_PERSON:
            //subtract from amount of people
            let updatedAmtPeople = state.amountPeople - 1;
            //remove person from each item.persons
            let itemsRemovedPerson = [...state.items]
            itemsRemovedPerson.forEach((item) => {
                item.persons = item.persons.filter(
                    (personId) => personId !== state.persons[action.id].personId
                )
            });
            //update persons excluding removed person
            return updateObject(state, {
                amountPeople: updatedAmtPeople,
                persons: state.persons.filter((_, i) => i !== action.id),
                items: itemsRemovedPerson
            });
        case actionTypes.CLAIM_ITEM:
            let updatePersons = [...state.persons];
            let updateItems = [...state.items];
            //if person hasn't claimed item yet, add to lists
            if (
                !state.persons[action.selectedPerson].items.includes(
                    state.items[action.selectedItem].itemId
                )
            ) {
                //add item to person.items array - persons[1].items
                let personItems = state.persons[action.selectedPerson].items.concat(
                    state.items[action.selectedItem].itemId
                );
                //update person object - persons[1]
                let updatePerson = updateObject(
                    state.persons[action.selectedPerson],
                    {items: personItems}
                );
                //update persons array by replacing w/ new person object - persons
                updatePersons[action.selectedPerson] = updatePerson;

                //add person to items.persons array - items[1].persons
                let itemClaimers = state.items[action.selectedItem].persons.concat(
                    state.persons[action.selectedPerson].personId
                );
                //update item object - items[1]
                let updateItem = updateObject(state.items[action.selectedItem], {
                    persons: itemClaimers
                });
                //update items array by replacing w/ new item object - items
                updateItems[action.selectedItem] = updateItem;
            } else {
                //remove item from person.items array
                let personItems = state.persons[action.selectedPerson].items.filter(
                    (item) => item !== state.items[action.selectedItem].itemId
                );

                //update person object
                let updatePerson = updateObject(
                    state.persons[action.selectedPerson],
                    {items: personItems}
                );
                //update persons array by replacing w/ new person object
                updatePersons[action.selectedPerson] = updatePerson;

                //remove person from items.claimers array
                let itemClaimers = state.items[action.selectedItem].persons.filter(
                    (person) => person !== state.persons[action.selectedPerson].personId
                );

                //update item object
                let updateItem = updateObject(state.items[action.selectedItem], {
                    persons: itemClaimers
                });
                //update items array by replacing w/ new item object
                updateItems[action.selectedItem] = updateItem;
            }

            //set state persons to updated persons array & items to updated items array
            return updateObject(state, {
                persons: updatePersons,
                items: updateItems
            });
        case actionTypes.TAX_ITEM:
            // Create copy of the items we currently have in state
            let currentItems = [...state.items];
            let taxedSubtotal = state.taxedItemSubtotal;
            
            //update subtotal for taxed items
            if (!currentItems[action.selectedItem].taxed === true) {
                taxedSubtotal = state.taxedItemSubtotal + currentItems[action.selectedItem].price;
            }
            else {
                taxedSubtotal = state.taxedItemSubtotal - currentItems[action.selectedItem].price;
            }
            // Updated the item with the following id, given the selectedItem (action.selectedItem)
            let updatedTaxItem = updateObject(currentItems[action.selectedItem], {
                taxed: !currentItems[action.selectedItem].taxed
            });
            // updated that in the items list
            currentItems[action.selectedItem] = updatedTaxItem;
            return updateObject(state, {
                items: currentItems,
                taxedItemSubtotal: taxedSubtotal
            });
        case actionTypes.SELECT_ALL_ITEMS:
            let currentItemsSelectAll = [...state.items];
            //set taxed to true for all items
            let itemsToTrue = currentItemsSelectAll.map((item) => {
                //mark item taxed
                return updateObject(item, {taxed: true})
            });
            return updateObject(state, {
                items: itemsToTrue,
                taxedItemSubtotal: state.subtotal
            });
        case actionTypes.ON_SPLIT:
            //calculate fee percentages
            let feePercentages = [];
            action.fees.forEach((fee) => {
                // % = fee amount / subtotal
                let currentFeePercentage =
                    parseFloat(fee.amount) / state.subtotal;
                //if fee is tax, use subtotal of taxed items instead
                if (fee.name === "tax") {
                    currentFeePercentage = parseFloat(fee.amount) / state.taxedItemSubtotal;
                }
                //push object to array
                feePercentages.push({
                    name: fee.name,
                    percentage: currentFeePercentage
                });
            })
            console.log('fee percentages', feePercentages);

            //////// CALCULATING SPLIT PRICE FOR EVERY ITEM ////////
            let itemsToSplit = [...state.items];
            // Calculates the split price per item depending on how many claimed it
            let itemsWithSplit = itemsToSplit.map(item => {
                //calculate split price = item price / # people who claimed item
                let itemSplitPrice =
                    parseFloat(item.price) / item.persons.length;
                //store item fees
                let itemFeesMap = new Map();
                //calculate fee amount for each fee
                feePercentages.forEach((fee) => {
                    //calculate fee amount = item split price * fee%
                    let feeAmount =
                        fee.percentage * itemSplitPrice;
                    //if calculating tax & item is not taxed, then set amount to 0
                    if (fee.name === "tax" && item.taxed === false) {
                        feeAmount = 0;
                    }
                    //update item fee
                    itemFeesMap.set(fee.name, feeAmount);
                });
                //update item object
                return updateObject(item, {
                    splitPrice: itemSplitPrice,
                    splitFees: itemFeesMap
                });
            })
            console.log('items w/ split', itemsWithSplit);
            //////// CALCULATING SPLIT FEES (TAX TIP) FOR EACH PERSON ////////
            let personsWithFees = state.persons.map((person) => {
                let personTotal = 0;
                //split fees for each person
                let splitFeesToUpdate = new Map();
                //for each item that the person claimed
                person.items.forEach((item) => {
                    //find item object
                    const itemInfo = itemsWithSplit.find(
                        (tempItem) => item === tempItem.itemId
                    );
                    //add item price to person total amount
                    personTotal = personTotal + itemInfo.splitPrice;
                    // For each split fee in item
                    action.fees.forEach( fee => {
                        let initialFeeAmount = 0;
                        let newFeeAmount = itemInfo.splitFees.get(fee.name);
                        personTotal = personTotal + newFeeAmount;
                        if (splitFeesToUpdate.has(fee.name)) {
                            initialFeeAmount = splitFeesToUpdate.get(fee.name);
                        }
                        //update split fee total
                        splitFeesToUpdate.set(
                            fee.name,
                            initialFeeAmount + newFeeAmount
                        );
                    });
                });

                return updateObject(person, {
                    splitFees: splitFeesToUpdate,
                    total: personTotal
                });
;
            })
            console.log("items", itemsWithSplit);
            console.log("persons", personsWithFees);
            console.log("total", action.grandTotal);
            return updateObject(state, {
                currentPage: state.currentPage + 1,
                items: itemsWithSplit,
                persons: personsWithFees,
                fees: action.fees,
                total: action.grandTotal
            });
        default:
            return state;
    }
}

export default reducer;
