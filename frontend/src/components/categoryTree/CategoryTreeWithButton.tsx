import React, {FC, useCallback, useState} from 'react';
import {Menu} from "@mui/material";
import {TreeItem, TreeView} from "@mui/lab";
import {ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
// own modules
import {useAppSelector} from "../../hooks/store.hook";
import MainStyledButton from "../styledComponents/MainStyledButton";
// types
import {ICategoryTree} from "../../models/ICategoryTree";
import CategoryTree from "./CategoryTree";

interface ICategoryProps {
    onSelectCategory: (category: ICategoryTree) => void
}
const CategoryTreeWithButton: FC<ICategoryProps> = ({onSelectCategory}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);
    const categories = useAppSelector(state => state.categories.categories);

    const renderCategoryBranch = useCallback((category: ICategoryTree) => {
        return category.children.map((category: ICategoryTree, id: number) => (
            <TreeItem
                key={id}
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
                key={id}
                onClick={() => onSelectCategory(category)}
                nodeId={category.id.toString()}
                label={category.label}
            >
                {category.children.length > 0 ? renderCategoryBranch(category) : null}
            </TreeItem>
        ))
    }, [categories])
    return (
        <>
            <MainStyledButton
                id="category-menu-btn"
                aria-controls={isOpen ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{height: "100%", width: "7rem"}}>
                Каталог
            </MainStyledButton>
            <Menu
                id="category-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'category-menu-btn',
                }}
            >
                <CategoryTree onSelectCategory={onSelectCategory} />
            </Menu>
        </>
    );
};

export default CategoryTreeWithButton;