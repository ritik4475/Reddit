
/**@description */
/**use to access the data of logged in user for entire app */
export const useUser = () => {
    const user = JSON.parse(window.localStorage.getItem('userData'));

    return { user };
}