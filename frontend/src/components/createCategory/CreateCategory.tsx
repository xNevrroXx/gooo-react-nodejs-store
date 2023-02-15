import React, {FC, useMemo} from "react";
import {Box, Button, Stack, SxProps, TextField} from "@mui/material";
import {ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon} from "@mui/icons-material";
import {TreeView, TreeItem} from "@mui/lab";
import {useFormik} from "formik";
import * as Yup from "yup";
// own modules
import MainStyledButton from "../styledComponents/MainStyledButton";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {categoryIdValidation, labelCategoryValidation, technicalNameCategoryValidation} from "../../validation/validation";
// actions
import {categoryCreateServer} from "../../store/thunks/categories";

const CreateCategory: FC = (sx?: SxProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categories.categories) ;

    const formik = useFormik({
        initialValues: {
            name: "",
            label: "",
            parentId: 0
        },
        validationSchema: Yup.object({
            parentId: categoryIdValidation,
            name: technicalNameCategoryValidation,
            label: labelCategoryValidation
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(categoryCreateServer(values));
            setSubmitting(false);
        }
    });

    // const categoryTree = useMemo(() => {
    //     return categories.map(category => {
    //         <TreeItem nodeId="1" label="Applications">
    //             <TreeItem nodeId="2" label="Calendar" />
    //         </TreeItem>
    //     })
    // }, [categories])

    return (
        <Box
            sx={{
                display: "grid",
                justifyContent: "flex-start",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "2rem",
                "> *": {
                    gridColumn: "span 2"
                },
                ...sx
            }}
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <TextField
                error={!!(formik.errors.name && formik.touched.name)}
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Название(техническое - на латинице)"
                variant="outlined"
                helperText={formik.errors.name}
            />
            <TextField
                error={!!(formik.errors.label && formik.touched.label)}
                name="label"
                onChange={formik.handleChange}
                value={formik.values.label}
                label="Название(Для пользователей)"
                variant="outlined"
                helperText={formik.errors.label}
            />
            <Stack direction="row" spacing={2}>
                <TextField
                    sx={{flexGrow: 1}}
                    error={!!(formik.errors.parentId && formik.touched.parentId)}
                    name="parentId"
                    value={formik.values.parentId}
                    label="parentId"
                    variant="outlined"
                    helperText={formik.errors.parentId}
                    InputProps={{
                        readOnly: true
                    }}
                />
                {/*<Catalog onClickOverride={(id) => formik.setFieldValue("parentId", id)} />*/}
                <TreeView
                    aria-label="category navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="Calendar" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="10" label="OSS" />
                        <TreeItem nodeId="6" label="MUI">
                            <TreeItem nodeId="8" label="index.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
                <MainStyledButton
                    sx={{height: "100%", width: "max-content"}}
                    onClick={() => formik.setFieldValue("parentId", 0)}
                >
                    Установить родительским (0)
                </MainStyledButton>
            </Stack>
            <Button
                sx={{gridColumnStart: 2, gridColumnEnd: 4}}
                type="submit"
                disabled={formik.isSubmitting}
                variant="outlined">
                Создать
            </Button>
        </Box>
    )
}

export default CreateCategory;