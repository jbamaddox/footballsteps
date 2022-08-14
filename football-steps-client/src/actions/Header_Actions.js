export const showHideAccountMenuAction = (showOrHide) => {
    if (showOrHide === 1) {
        return {
            type: 'SHOW_ACCOUNT_MENU',
            payload: showOrHide
        }
    } else if (showOrHide === 0) {
        return {
            type: 'HIDE_ACCOUNT_MENU',
            payload: showOrHide
        }
    }
}

export const showLogInOutComponentAction = (showComponent) => {
    if (showComponent === 1) {
        return {
            type: 'SHOW_LOGINOUT_COMPONENT',
            payload: showComponent
        }
    } else if (showComponent === 0) {
        return {
            type: 'HIDE_LOGINOUT_COMPONENT',
            payload: showComponent
        }
    }
}