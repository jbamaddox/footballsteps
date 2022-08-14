export const setTokenAction = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const setUserNameAction = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username
    }
}