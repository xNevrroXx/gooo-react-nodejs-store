import {useLocation, useNavigate} from "react-router-dom";
import React, {FC, MouseEvent, useCallback, useEffect, useMemo, useState} from "react";
import {Button, Divider, Grid, Menu, MenuItem, Stack, SxProps} from "@mui/material";
import {KeyboardArrowRight as KeyboardArrowRightIcon, Menu as MenuIcon} from "@mui/icons-material";
// own modules
import ChildCategories from "../childCategories/ChildCategories";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
import {addFilter} from "../../store/actions/filters";
// types
import {ICategoryTree} from "../../models/ICategoryTree";

interface ICatalogProps {
    sx?: SxProps
    onClickOverride?: (id: number) => void,
    variant?: "contained" | "text" | "outlined" | undefined
}

const Catalog: FC<ICatalogProps> = ({onClickOverride, sx, variant = "contained"}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const categories = useAppSelector(state => state.categories.categories) as ICategoryTree[];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [parentId, setParentId] = useState<ICategoryTree["id"] | null>();
    const onOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
    const onClose = useCallback(() => setAnchorEl(null), []);
    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        if(categories && categories[0]) {
            setParentId(categories[0].id);
        }
    }, [categories])

    const onChangeChildCategories = useCallback((event: MouseEvent<HTMLElement>) => {
        const targetEl = event.target;
        if(targetEl instanceof HTMLElement) {
            const id = targetEl.getAttribute("data-category-id");
            setParentId(id ? +id : 0);
        }
    }, [])

    const onClick = (categoryTree: ICategoryTree) => {
        onClose();
        if(onClickOverride) {
            onClickOverride(categoryTree.id);
        }
        else {
            dispatch(addFilter({ filterType: "categoryId", value: categoryTree.id }))
            if (location.pathname !== ROUTE.FILTERING) {
                navigate(createPath({ path: ROUTE.FILTERING_CATEGORY, params: {category: categoryTree.id} }))
            }
        }
    }

    const categoryElements = useMemo(() => {
        return categories.map(({id, label, name, parentId, children, createdAt}) => (
            <MenuItem
                onMouseEnter={onChangeChildCategories}
                onClick={() => onClick({id, label, name, parentId, children, createdAt})}

                key={name+id}
                data-category-name={name}
                data-category-id={id}
                data-category-parent-id={parentId}
            >
                <Stack direction="row" justifyContent="space-between" width="100%">
                    {label}
                    <KeyboardArrowRightIcon/>
                </Stack>
            </MenuItem>
        ))
    }, [categories])

    return (
        <>
            <Button
                id="catalog-menu-button"
                variant={variant}
                startIcon={<MenuIcon/>}
                sx={{display: {xs: "none", sm: "flex"}, minWidth: "auto", padding: ".5rem  1.5rem", ...sx}}
                onClick={onOpen}
                aria-controls={isOpen ? "catalog-dropdown-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
            >
                Каталог
            </Button>
            <Menu
                id="catalog-dropdown-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={isOpen}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'catalog-menu-button',
                }}
            >
                <Grid container sx={{width: "80vw", height: "max-content", minHeight: "50vh"}} spacing={5}>
                    <Grid item xs={2}>
                        <Stack height="100%" direction="row" justifyContent="space-between">
                            <Stack direction="column">
                                {categoryElements}
                            </Stack>
                            <Divider orientation="vertical" flexItem/>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        {parentId ? <ChildCategories categories={categories} parentId={parentId} onClick={(categoryTree) => onClick(categoryTree)}/> : null}
                    </Grid>
                </Grid>
            </Menu>
        </>
    )
}

export default Catalog;