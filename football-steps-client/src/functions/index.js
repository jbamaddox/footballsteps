//Determine if the user is logged in by verifying if they have a token
export const getTokenFromCookie = () => {
    const app_cookies = window.document.cookie.split('; ')
    let token = null

    for (var item of app_cookies) {
        var currentCookie = item.split('=')

        if (currentCookie[0] === 'x-auth-token') {
            token = currentCookie[1]
            break;
        }

    }

    return token
}

//Determine if there is a 'username' object in the cookie
export const getUserNameFromCookie = () => {
    const app_cookies = window.document.cookie.split('; ')
    let username = null

    for (var item of app_cookies) {
        var currentCookie = item.split('=')

        if (currentCookie[0] === 'username') {
            username = currentCookie[1]
            break;
        }

    }

    return username
}