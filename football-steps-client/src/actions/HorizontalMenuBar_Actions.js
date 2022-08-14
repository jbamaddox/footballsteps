
//Determine whether to show or hide the menu bar
export const showHideHorizontalMenuBarAction = (showHide) => {
    if (showHide === "Open") {
        return {
            type: 'SHOW_HORIZONTAL_MENU',
            payload: showHide
        }
    } else if (showHide === "Closed") {
        return {
            type: 'HIDE_HORIZONTAL_MENU',
            payload: showHide
        }
    }
}

export const changeMenuButtonAction = (currentButton, newlySelectedButton) => {
    if (currentButton !== newlySelectedButton) {
        return {
            type: 'CHANGE_HORIZONTAL_MENU_BUTTON',
            payload: newlySelectedButton
        }
    }
}

