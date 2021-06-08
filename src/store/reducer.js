import * as actionTypes from "./actions"
import {updateObject} from "../shared/utility"

const intialState = {
    eventName: "",
    amountPeople: "",
    personIndex: 0,
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
            let initialPersons = []
            //create person objects = to amountPeople & push to array
            for (let i = 0; i < state.amountPeople; i++) {
                initialPersons.push({
                    name: i,
                    items: [],
                    splitFees: [],
                    total: 0
                });
            }
            //set persons state to created array
            return updateObject(state, {
                currentPage: state.currentPage + 1,
                persons: initialPersons,
                eventName: action.eventName,
                amountPeople: parseInt(action.amountPeople)
            })
        case actionTypes.NEXT_PAGE:
            return updateObject(state, {
                currentPage: state.currentPage + 1
            })
        case actionTypes.ADD_ITEM:
            //updatedItems = copy of items + new item
            let updatedItems = state.items.concat({
                name: action.name,
                price: parseFloat(action.price),
                persons: [],
                taxed: false,
                splitPrice: 0,
                splitFees: []
            })
            //update price
            let updatedPrice =
                state.subtotal + parseFloat(action.price)
            //update state
            return updateObject(state, {
                items: updatedItems,
                subtotal: updatedPrice
            })
        case actionTypes.REMOVE_ITEM:
            //update subtotal
            let updatedSubtotal = state.subtotal - state.items[action.id].price
            //update items excluding removed item & update subtotal object
            return updateObject(state, {
                items: state.items.filter((_, i) => i !== action.id),
                subtotal: updatedSubtotal
            })
        case actionTypes.GO_BACK:
            return updateObject(state, {currentPage: state.currentPage - 1})
        case actionTypes.CHANGE_NAME:
            //update person object
            let updatedPerson = updateObject(state.persons[action.id], {
                name: action.event.target.value
            })
            //update persons array by replacing w/ new person object
            let updatedPersons = [...state.persons]
            updatedPersons[action.id] = updatedPerson
            //set state persons to updated persons array
            return updateObject(state, {persons: updatedPersons})
        case actionTypes.ADD_PERSON:
            //add to amount of people
            let updatedAmountPeople = state.amountPeople + 1
            //add person object to persons array
            let AddedToPersons = state.persons.concat({
                name: state.amountPeople,
                items: [],
                splitFees: []
            })
            //update states
            return updateObject(state, {
                amountPeople: updatedAmountPeople,
                persons: AddedToPersons
            })
        case actionTypes.REMOVE_PERSON:
            //subtract from amount of people
            let updatedAmtPeople = state.amountPeople - 1
            //remove person from each item.persons
            let itemsRemovedPerson = [...state.items]
            itemsRemovedPerson.forEach((item) => {
                item.persons = item.persons.filter(
                    (itemName) => itemName !== state.persons[action.id].name
                )
            })
            //update persons excluding removed person
            return updateObject(state, {
                amountPeople: updatedAmtPeople,
                persons: state.persons.filter((_, i) => i !== action.id),
                items: itemsRemovedPerson
            })
        case actionTypes.CLAIM_ITEM:
            let updatePersons = [...state.persons]
            let updateItems = [...state.items]
            //if person hasn't claimed item yet, add to lists
            if (
                !state.persons[action.personId].items.includes(
                    state.items[action.itemId].name
                )
            ) {
                //add item to person.items array - persons[1].items
                let personItems = state.persons[action.personId].items.concat(
                    state.items[action.itemId].name
                )
                //update person object - persons[1]
                let updatePerson = updateObject(
                    state.persons[action.personId],
                    {items: personItems}
                )
                //update persons array by replacing w/ new person object - persons
                updatePersons[action.personId] = updatePerson

                //add person to items.persons array - items[1].persons
                let itemClaimers = state.items[action.itemId].persons.concat(
                    state.persons[action.personId].name
                )
                //update item object - items[1]
                let updateItem = updateObject(state.items[action.itemId], {
                    persons: itemClaimers
                })
                //update items array by replacing w/ new item object - items
                updateItems[action.itemId] = updateItem
            } else {
                //remove item from person.items array
                let personItems = state.persons[action.personId].items.filter(
                    (item) => item !== state.items[action.itemId].name
                )
                //update person object
                let updatePerson = updateObject(
                    state.persons[action.personId],
                    {items: personItems}
                )
                //update persons array by replacing w/ new person object
                let updatePersons = [...state.persons]
                updatePersons[action.personId] = updatePerson

                //remove person from items.claimers array
                let itemClaimers = state.items[action.itemId].persons.filter(
                    (person) => person !== state.persons[action.personId].name
                )
                //update item object
                let updateItem = updateObject(state.items[action.itemId], {
                    persons: itemClaimers
                })
                //update items array by replacing w/ new item object
                let updateItems = [...state.items]
                updateItems[action.itemId] = updateItem
            }

            //set state persons to updated persons array & items to updated items array
            return updateObject(state, {
                persons: updatePersons,
                items: updateItems
            })
        case actionTypes.TAX_ITEM:
            // Create copy of the items we currently have in state
            let currentItems = [...state.items]
            let taxedSubtotal = state.taxedItemSubtotal;
            
            //update subtotal for taxed items
            if (!currentItems[action.itemId].taxed === true) {
                taxedSubtotal = state.taxedItemSubtotal + currentItems[action.itemId].price
            }
            else {
                taxedSubtotal = state.taxedItemSubtotal - currentItems[action.itemId].price
            }
            // Updated the item with the following id, given the itemId (action.itemId)
            let updatedTaxItem = updateObject(currentItems[action.itemId], {
                taxed: !currentItems[action.itemId].taxed
            })
            // updated that in the items list
            currentItems[action.itemId] = updatedTaxItem
            return updateObject(state, {
                items: currentItems,
                taxedItemSubtotal: taxedSubtotal
            })
        case actionTypes.SELECT_ALL_ITEMS:
            let currentItemsSelectAll = [...state.items]
            //set taxed to true for all items
            let itemsToTrue = currentItemsSelectAll.map((item) => {
                //mark item taxed
                return updateObject(item, {taxed: true})
            })
            return updateObject(state, {
                items: itemsToTrue,
                taxedItemSubtotal: state.subtotal
            })
        case actionTypes.ON_SPLIT:
            //calculate fee percentages
            let feePercentages = []
            action.fees.forEach((fee) => {
                // % = fee amount / subtotal
                let currentFeePercentage =
                    parseFloat(fee.amount) / state.subtotal
                //if fee is tax, use subtotal of taxed items instead
                if (fee.name === "tax") {
                    currentFeePercentage = parseFloat(fee.amount) / state.taxedItemSubtotal
                }
                //push object to array
                feePercentages.push({
                    name: fee.name,
                    percentage: currentFeePercentage
                })
            })
            console.log('fee percentages', feePercentages);

            //////// CALCULATING SPLIT PRICE FOR EVERY ITEM ////////
            let itemsToSplit = [...state.items]
            // Calculates the split price per item depending on how many claimed it
            let itemsWithSplit = itemsToSplit.map(item => {
                //calculate split price = item price / # people who claimed item
                let itemSplitPrice =
                    parseFloat(item.price) / item.persons.length
                //store item fees
                let itemFeesMap = new Map()
                //calculate fee amount for each fee
                feePercentages.forEach((fee) => {
                    //calculate fee amount = item split price * fee%
                    let feeAmount =
                        fee.percentage * itemSplitPrice
                    //if calculating tax & item is not taxed, then set amount to 0
                    if (fee.name === "tax" && item.taxed === false) {
                        feeAmount = 0;
                    }
                    //update item fee
                    itemFeesMap.set(fee.name, feeAmount)
                })
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
                let splitFeesToUpdate = new Map()
                //for each item that the person claimed
                person.items.forEach((item) => {
                    //find item object
                    const itemInfo = itemsWithSplit.find(
                        (tempItem) => item === tempItem.name
                    )
                    //add item price to person total amount
                    personTotal = personTotal + itemInfo.splitPrice;
                    // For each split fee in item
                    action.fees.forEach( fee => {
                        let initialFeeAmount = 0
                        let newFeeAmount = itemInfo.splitFees.get(fee.name)
                        personTotal = personTotal + newFeeAmount
                        if (splitFeesToUpdate.has(fee.name)) {
                            initialFeeAmount = splitFeesToUpdate.get(fee.name)
                        }
                        //update split fee total
                        splitFeesToUpdate.set(
                            fee.name,
                            initialFeeAmount + newFeeAmount
                        )
                    })
                })
                // Update splitfees for that particular person
                // console.log(
                //     "pre update: ",
                //     person.splitFees,
                //     typeof person,
                //     typeof person.splitFees,
                //     person
                // )
                return updateObject(person, {
                    splitFees: splitFeesToUpdate,
                    total: personTotal
                })
                // console.log("post update: ", person.splitFees)
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
            })
        default:
            return state
    }
}

export default reducer
