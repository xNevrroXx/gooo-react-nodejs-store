import React, {FC, useCallback} from 'react';
import {TreeItem, TreeView} from "@mui/lab";
import {ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
// own modules
import {useAppSelector} from "../../hooks/store.hook";
// types
import {ICategoryTree} from "../../models/ICategoryTree";


interface ICategoryTreeWithButtonProps {
    onSelectCategory: (category: ICategoryTree) => void
}
const CategoryTree: FC<ICategoryTreeWithButtonProps> = ({onSelectCategory}) => {
    const categories = useAppSelector(state => state.categories.categories);

    const renderCategoryBranch = useCallback((category: ICategoryTree) => {
        return category.children.map((category: ICategoryTree, id: number) => (
            <TreeItem
                sx={{width: "max-content"}}
                key={id + "inner branch"}
                onClick={() => onSelectCategory(category)}
                nodeId={category.id.toString()}
                label={category.label}
            >
                {category.children.length > 0 ? renderCategoryBranch(category) : null}
            </TreeItem>
        ))
    }, [])

    const renderCategoryTree = useCallback(() => {
        return categories.map((category: ICategoryTree, id: number) => (
            <TreeItem
                sx={{width: "max-content"}}
                key={id + "inner tree"}
                onClick={() => onSelectCategory(category)}
                nodeId={category.id.toString()}
                label={category.label}
            >
                {category.children.length > 0 ? renderCategoryBranch(category) : null}
            </TreeItem>
        ))
    }, [categories])

    return (
        <TreeView
            aria-label="category navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ minHeight: 240, flexGrow: 1, maxWidth: "100%", overflowY: 'auto' }}
        >
            {renderCategoryTree()}
        </TreeView>
    );
};

export default CategoryTree;