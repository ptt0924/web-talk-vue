//得到好友的接口
export default interface DataItem {
    //备注 title-->remark
    title: string
    icon?: string
    description?: string
    friendAccount: string
    userAccount: string
    readTime: string    //最后一次读取的时间
    time: string //成为好友的时间
    id:string
}

