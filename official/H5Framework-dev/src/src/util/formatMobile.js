import moment from 'moment'
export const formatDate = (date, formater) => {
    if (date === undefined || date === null || date === '') {
        return date
    } else {
        return moment(date).format(formater)
    }
}
export const formatMobile = (item) => item.replace(/(\d{3})(\d{4})(\d{4})/g, '$1****$3')