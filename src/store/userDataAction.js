export const setUserData = (fullName, Email, url) => ({
    type: 'SET_USER_DATA',
    payload: { fullName, Email, url},
});

const InitialState = {
    fullName: '',
    Email: '',
    imageUrl: null,
};

const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
        return {
            ...state,
            fullName: action.payload.fullName,
            Email: action.payload.Email,
            imageUrl: action.payload.imageUrl,
        };
        default:
            return state;
    }
};

export default userReducer;