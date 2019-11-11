export default {
    set (item, value) {
        if(localStorage.getItem(item)) {
            localStorage.removeItem(item)
        }
        localStorage.setItem(item, value)
    },
    get (item) {
        var data = localStorage.getItem(item);
        data = JSON.parse(data) ? JSON.parse(data) : data
        return data
    },
    remove (item) {
        localStorage.getItem(item) && localStorage.removeItem(item)
    }
}