export interface IProductRequest {
    name: string,
    price: number,
    weight: number,
    weightUnits: "грамм" | "килограмм",
    shortDescription: string,
    longDescription: string,
    images: string[],
    categoryId: number,
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
    category_id: number,
    stock: number,
    created_at: string
}
export interface IProductWithImagesDB extends IProductDB {
    images: IProductImages[]
}
export interface IProductImages {
    id: number,
    product_id: IProductDB["id"],
    link: string
}