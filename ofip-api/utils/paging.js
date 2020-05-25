const pageHandler = (params) => {
    let pagination = {};
    let page = 0;
    let size = 10;

    if (params != undefined && params != null) {
        page = parseInt(params.page) == undefined ? page : parseInt(params.page);
        size = parseInt(params.size) == undefined ? size : parseInt(params.size);
    }

    pagination.offset = page * size;
    pagination.limit = size;

    return pagination;
}


module.exports = {
    pageHandler
}