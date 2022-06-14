import GetNowTime from './date.js'
export default class Mes {
    constructor(code, mes, fromAccount, toAccount) {
        this.code = code
        this.mes = mes
        this.fromAccount = fromAccount
        this.toAccount = toAccount
        this.date = new GetNowTime().Date
    }
} 