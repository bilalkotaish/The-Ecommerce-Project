import { CartItem } from "./cartItem"

export interface Order{
    _id?:string
    date:Date
    items:CartItem[]
    paymentMethod:string
    address:any
    total:number
    status:string
}