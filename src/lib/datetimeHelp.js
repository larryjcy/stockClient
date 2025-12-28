export default {
    getDay(date) {       
        const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        var d = date 
        const newD = new Date(String(d))
        return weekday[newD.getDay()]   
    }
}