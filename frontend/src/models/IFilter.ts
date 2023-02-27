import {ICategory} from "./ICategory";

export interface IFilter {
    nameQuery: string,
    categoryId: ICategory["id"] | null,
    price: { min: number, max: number },
    weight: { min: number, max: number }
}


export type TFilterField<T extends keyof IFilter> = {filterType: T, value: IFilter[T]};
