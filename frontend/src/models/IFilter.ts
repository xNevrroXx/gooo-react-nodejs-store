import {ICategory} from "./ICategory";

export interface IFilter {
    nameQuery: string,
    categoryId: ICategory["id"] | null,
    price: { min: number, max: number },
    weight: { min: number, max: number }
}

export type TSorting = {label: "По возрастанию цены", filterParam: "price", startFrom: "min"} | {label: "По убыванию цены", filterParam: "price", startFrom: "max"} | {label: "По умолчанию", filterParam: "none"};

export type TFilterSearchLinkAll = { category?: ICategory["id"], minPrice?: number, maxPrice?: number, minWeight?: number, maxWeight?: number, nameQuery?: string };
export type TFilterSearchLinkAllString = { category?: string, minprice?: string, maxprice?: string, minweight?: string, maxweight?: string, namequery?: string };
export type TFilterSearchLinkCategory = { category: ICategory["id"] };
export type TFilterSearchLinkName = { nameQuery: string };

export type TFilterField<T extends keyof IFilter> = {filterType: T, value: IFilter[T]};
