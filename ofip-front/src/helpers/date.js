const formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = zeroPadding(date.getDate());
    let month = zeroPadding(date.getMonth()+1);
    let year = date.getFullYear().toString();
    let hours = zeroPadding(date.getHours());
    let minutes = zeroPadding(date.getMinutes());
    let seconds = zeroPadding(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const zeroPadding = (timeParam) => {
    return timeParam.toString().padStart(2,'0');
}

const formatDateYYMMDD = (dateString) => {
    if (dateString !== undefined || dateString.length > 0) {
        let date = new Date(dateString);
        let day = zeroPadding(date.getDate());
        let month = zeroPadding(date.getMonth()+1);
        let year = date.getFullYear().toString();
        let hours = zeroPadding(date.getHours());
        let minutes = zeroPadding(date.getMinutes());
        let seconds = zeroPadding(date.getSeconds());

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }
    else {
        return null;
    }
}




export const dateHelper = {
    formatDate,
    formatDateYYMMDD
}