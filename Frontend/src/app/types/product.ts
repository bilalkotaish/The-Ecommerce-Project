export interface Product{
    _id?:string,
    name:string,
    shortDescription:string,
    description:string,
    purchasePrice:number,
    discount:number,
    images:string[],
    categoryId:string,
    isfeatured:boolean,
    isNew:boolean,
}