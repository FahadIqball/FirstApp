import { TYPES } from "./types"

export const AddAction = (payload) => {
    return {
        type: TYPES.ADD,
        payload: payload
    }
}

export const SubAction = (payload) => {
    return {
        type: TYPES.MINUS,
        payload: payload
    }
}

export const ResetAction = (payload) => {
    return {
        type: TYPES.RESET,
        payload: payload
    }
}