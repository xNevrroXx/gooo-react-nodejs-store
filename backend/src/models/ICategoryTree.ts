import {ICategory} from "./ICategory";

export interface ICategoryTree extends ICategory {
    children: ICategoryTree[]
}