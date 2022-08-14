export const setTokenReducer = (token = null, action) => {
    if (action.type === 'SET_TOKEN') {
        return action.payload
    }

    return token
}

export const setUserNameReducer = (userName = null, action) => {
    if (action.type === 'SET_USERNAME') {
        return action.payload
    }

    return userName
}
