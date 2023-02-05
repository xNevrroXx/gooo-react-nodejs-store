import React, {FC, useCallback, useMemo} from 'react';
import {Stack, Typography} from "@mui/material";
import LinkTypography from "../styledComponents/LinkTypography";
import {useNavigate} from "react-router-dom";
// types
import {ICategoryTree} from "../../models/ICategoryTree";

interface IChildCategoriesProps {
    categories: ICategoryTree[],
    parentId: ICategoryTree["id"],
    onClick: (id: ICategoryTree["id"]) => void
}
const ChildCategories: FC<IChildCategoriesProps> = ({categories, parentId, onClick}) => {
    const parentCategory = useMemo(() => categories.filter(category => category.id === parentId)[0], [parentId, categories]);


    const listCategories = useMemo(() => {
        return parentCategory.children.map(({id, parentId, label, name, children}) => (
            <Stack direction="column" spacing={1}>
                    <LinkTypography
                        variant="body1"
                        fontWeight="bold"
                        key={name+id}
                        data-category-name={name}
                        data-category-id={id}
                        data-category-parent-id={parentId}
                        onClick={() => onClick(id)}
                    >
                        {label}
                    </LinkTypography>
                    {
                        children.map(({id, parentId, label, name, children}) => (
                            <LinkTypography
                                variant="body1"
                                key={name+id}
                                data-category-name={name}
                                data-category-id={id}
                                data-category-parent-id={parentId}
                                onClick={() => onClick(id)}
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
                onClick={() => onClick(parentCategory.id)}
                variant="h5"
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