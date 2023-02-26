import {ICategory} from "./ICategory";

export interface IFilter {
    nameQuery: string | null,
    categoryId: ICategory["id"] | null,
    price: { min: number, max?: never } | { min?: never, max: number } | { min: number, max: number } | null,
    weight: { min: number, max?: never } | { min?: never, max: number } | { min: number, max: number } | null
}

export type TFilterField<T extends keyof IFilter> = {filterType: T, value: IFilter[T]};
