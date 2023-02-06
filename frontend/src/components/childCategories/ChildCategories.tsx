import React, {FC, useMemo} from 'react';
import {Stack} from "@mui/material";
import LinkTypography from "../styledComponents/LinkTypography";
// types
import {ICategoryTree} from "../../models/ICategoryTree";

interface IChildCategoriesProps {
    categories: ICategoryTree[],
    parentId: ICategoryTree["id"],
    onClick: (categoryTree: ICategoryTree) => void
}
const ChildCategories: FC<IChildCategoriesProps> = ({categories, parentId, onClick}) => {
    const parentCategory = useMemo(() => categories.filter(category => category.id === parentId)[0], [parentId, categories]);

    const listCategories = useMemo(() => {
        return parentCategory.children.map(({id, parentId, label, name, children, createdAt}) => (
            <Stack key={name+id+"child"} direction="column" spacing={0.2}>
                    <LinkTypography
                        variant="body1"
                        fontWeight="bold"
                        data-category-name={name}
                        data-category-id={id}
                        data-category-parent-id={parentId}
                        onClick={() => onClick({id, parentId, label, name, children, createdAt})}
                    >
                        {label}
                    </LinkTypography>
                    {
                        children.map(({id, parentId, label, name, children, createdAt}) => (
                            <LinkTypography
                                variant="body1"
                                key={name+id}
                                data-category-name={name}
                                data-category-id={id}
                                data-category-parent-id={parentId}
                                onClick={() => onClick({id, parentId, label, name, children, createdAt})}
                            >
                                {label}
                            </LinkTypography>
                        ))
                    }
                </Stack>
            )
        )
    }, [parentCategory, onClick])

    return (
        <>
            <LinkTypography
                mb={3}
                onClick={() => onClick(parentCategory)}
                variant="h5"
                fontWeight="bold"
            >
                {parentCategory.label}
            </LinkTypography>
            <Stack direction="row" spacing={4}>
                {listCategories}
            </Stack>
        </>
    );
};

export default ChildCategories;