let checkExpiration = (expiration, time) => {
    if (expiration.includes("h")) {
        time.setHours(time.getHours() + parseInt(expiration));
        return time;
    }
    if (expiration.includes("m")) {
        time.setMinutes(time.getMinutes() + parseInt(expiration));
        return time;
    }
    if (expiration.includes("s")) {
        time.setSeconds(time.getSeconds() + parseInt(expiration));
        return time;
    }
};

let makeCurrentDateByCorrectTimeZone = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};


let calculateDiffToExpiration = (startDate, endDate) => {
    return (endDate.getTime() - startDate.getTime()) / 1000; 
};


module.exports = {
    checkExpiration,
    makeCurrentDateByCorrectTimeZone,
    calculateDiffToExpiration
}