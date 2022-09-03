export const mainEndpoint  = 'https://equipoyosh.com/';
export const getFechaForQuery = (fecha: Date)=> {
    const month = (fecha.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const date = (fecha.getDate() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const fechaQuery:string = fecha.getFullYear() + month + date;
    return fechaQuery;
}