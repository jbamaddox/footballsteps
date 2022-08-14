export const showHideAccountMenu = (showOrHide = 0, action) => {
    if (action.type === 'SHOW_ACCOUNT_MENU') {
        return action.payload
    } else if (action.type === 'HIDE_ACCOUNT_MENU') {
        return action.payload
    }

    return showOrHide

}

export const showLogInOutComponent = (showComponent = 0, action) => {
    if (action.type === 'SHOW_LOGINOUT_COMPONENT') {
        return action.payload
    } else if (action.type === 'HIDE_LOGINOUT_COMPONENT') {
        return action.payload
    }

    return showComponent

}