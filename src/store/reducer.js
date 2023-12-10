import { TYPES } from "./types";

const iniialState = 0;


const muReducer = (state = iniialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case TYPES.ADD:
            return state + payload

        case TYPES.MINUS:

            return state - payload

        case TYPES.RESET:
            return 0

        default:
            return state;
    }

}

export default muReducer;