export const showHideHorizontalMenuBarReducer = (currentStatus = "Open", action) => {
    if (action.type === 'SHOW_HORIZONTAL_MENU') {
        return action.payload
    } else if (action.type === 'HIDE_HORIZONTAL_MENU') {
        return action.payload
    }

    return currentStatus

}

export const selectedHorizontalMenuButton = (currentButton = "Simulations", action) => {
    if (action.type === 'CHANGE_HORIZONTAL_MENU_BUTTON') {
        return action.payload
    }

    return currentButton

}