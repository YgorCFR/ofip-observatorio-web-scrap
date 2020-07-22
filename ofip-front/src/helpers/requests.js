export const makeQueryString = (filter) => {
    // Inicializando query string
    let queryString = "";
    // Construindo query string a partir dos filtros
    Object.keys(filter).forEach((key, index) => {
        if (queryString.length === 0) {
            if (filter[key]) {
                queryString += `?${key}=${filter[key]}`;
            }
        }
        else {
            if (filter[key]) {
                queryString += `&${key}=${filter[key]}`;
            }
        }
    });
    return queryString;
}