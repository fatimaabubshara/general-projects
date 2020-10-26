import { GET_PRODUCTS } from "../actions/productsAction"

const initState = {
    data: []
}

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            debugger
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default productsReducer