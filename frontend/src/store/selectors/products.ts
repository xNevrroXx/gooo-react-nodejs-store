import {createSelector} from "@reduxjs/toolkit";
// types
import {RootState} from "../index";
import {IFilter} from "../../models/IFilter";
import {IProduct} from "../../models/IProduct";
import {ICategoryTree} from "../../models/ICategoryTree";
import {ICategory} from "../../models/ICategory";

export const filteredProductsSelector = createSelector(
    (state: RootState) => state.filters.filters,
    (state: RootState) => state.products.products,
    (state: RootState) => state.categories.categories,
    (filters: IFilter, products: IProduct[], categories: ICategoryTree[]) => {
        let filteredProducts: IProduct[] = products;

        if (filters.nameQuery) {
            filteredProducts = filteredProducts.filter( product => product.name.toLowerCase().includes(filters.nameQuery!.toLowerCase()) )
        }
        if (filters.price) {
            if (filters.price.min) {
                filteredProducts = filteredProducts.filter( product => product.price >= filters.price!.min! );
            }

            if (filters.price.max) {
                filteredProducts = filteredProducts.filter( product => product.price <= filters.price!.max! );
            }
        }
        if (filters.weight) {
            if (filters.weight.min) {
                filteredProducts = filteredProducts.filter( product => product.weight >= filters.weight!.min! );
            }

            if (filters.weight.max) {
                filteredProducts = filteredProducts.filter( product => product.weight <= filters.weight!.max! );
            }
        }
        if (filters.categoryId) {
            // search child categories for filtering
            const childrenCategoryIds: ICategory["id"][] = [];

            const deepSearch = function (categoryTree: ICategoryTree, isChildTargetCategory: boolean) {
                if(categoryTree.id === filters.categoryId || isChildTargetCategory) {
                    childrenCategoryIds.push(categoryTree.id);
                    categoryTree.children.forEach(categoryTreeChild => deepSearch(categoryTreeChild, true));
                }
                else {
                    categoryTree.children.forEach(categoryTreeChild => deepSearch(categoryTreeChild, false));
                }
            }
            categories.forEach(category => {
                deepSearch(category, false);
            })

            filteredProducts = filteredProducts.filter(product => childrenCategoryIds.includes(product.categoryId));
        }

        return filteredProducts;
    }
);