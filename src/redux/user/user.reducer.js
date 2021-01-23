import USER_ACTIONS from "./user.action-types";

const INITIAL_STATE = {
    currentUser: null,
    token: null,
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_ACTIONS.SUCCESS_LOGIN:
            return {...state,
                userType: action.payload.user ? 'user' : 'company',
                currentUser: action.payload.user ? action.payload.user : action.payload.company,
                token: action.payload.token
            }

        case USER_ACTIONS.LOG_OUT:
            return {...state, currentUser: null, token: null }

        default:
            return state;
    }

}

export default userReducer;