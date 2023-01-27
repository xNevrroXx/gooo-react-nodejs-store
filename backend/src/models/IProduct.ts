export interface IProductRequest {
    name: string,
    price: number,
    weight: number,
    weightUnits: "грамм" | "килограмм",
    shortDescription: string,
    longDescription: string,
    image: string,
    thumb: string,
    categoryId: number,
    location: string,
    stock: number,
}

export interface IProductCreation extends IProductRequest{
    createdAt: string
}
export interface IProduct extends IProductCreation{
    id: number,
}

export interface IProductDB {
    id: number,
    name: string,
    price: number,
    weight: number,
    weight_units: "грамм" | "килограмм",
    short_description: string,
    long_description: string,
    image: string,
    thumb: string,
    category_id: number,
    location: string,
    stock: number,
    created_at: string
}