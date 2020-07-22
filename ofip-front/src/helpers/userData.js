
const userDataParsed  = (item) => {
    return JSON.parse(localStorage.getItem(item));
}


export const userData = {
    userDataParsed
}