import {createSelector} from "@reduxjs/toolkit";
// types
import {RootState} from "../index";
import {ICategories} from "../../models/IStore";
import {ICategoryTree} from "../../models/ICategoryTree";

export const hierarchyCategoriesArrSelector = createSelector(
    [
        (state: RootState) => state.categories.categories as ICategories["categories"],
        (state: RootState, targetCategoryId: number) => targetCategoryId
    ],
    (categories, targetCategoryId) => {
        let hierarchyCategories: ICategoryTree[];
        function createHierarchyCategories (categoryTree: ICategoryTree, arrCategories: ICategoryTree[]) {
            const currentArrIds = [...arrCategories, categoryTree];

            if (categoryTree.id === targetCategoryId) {
                hierarchyCategories = currentArrIds;
                return;
            }

            for (const childCategoryTree of categoryTree.children) {
                createHierarchyCategories(childCategoryTree, currentArrIds);
            }
        }
        for (const category of categories) {
            createHierarchyCategories(category, []);
        }

        return hierarchyCategories!;
    }
)