export interface IProduct {
    id?: number,
    name: string,
    price: string,
    weight: string,
    shortDescription: string,
    longDescription: string,
    image: string,
    thumb: string,
    categoryId: number,
    location: string,
    stock: number,
    createdAt?: string
}