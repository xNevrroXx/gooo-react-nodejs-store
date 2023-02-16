export interface IProductCreation {
    name: string,
    price: number,
    weight: number,
    weightUnits: string,
    shortDescription: string,
    longDescription: string,
    image: string,
    thumb: string,
    categoryId: number,
    stock: number,
}

export interface IProduct extends IProductCreation {
    id: number,
    createdAt: string
}