import dayjs from "dayjs"
export default class Mes {
    constructor(code, mes, fromAccount, toAccount) {
        this.code = code
        this.mes = mes
        this.fromAccount = fromAccount
        this.toAccount = toAccount
        this.date = dayjs(new Date()).format('YYYY:MM:DD HH:mm:ss')
    }
} 