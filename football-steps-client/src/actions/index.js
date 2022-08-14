export const setInnerWindowTypeAction = (currentInnerWindowType, windowWidth) => {
    let newWindowType = ''
    if (windowWidth <= 450) {
        newWindowType = 'Mobile'

    } else {
        newWindowType = 'Desktop'

    }

    if (currentInnerWindowType !== newWindowType) {
        return {
            type: 'CHANGE_INNER_WINDOW_TYPE',
            payload: newWindowType
        }
    } else {
        return {
            type: 'DO_NOTHING',
            payload: newWindowType
        }
    }


}

