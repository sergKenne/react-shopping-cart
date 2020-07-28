const { FETCH_PRODUCTS } = require("../types");

export const productReducer = (state={}, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS : 
        return {
            items: action.payload
        };
        default:
            return state;
    }
};