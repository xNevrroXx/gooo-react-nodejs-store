import React, {FC} from "react";
import {Box, Button, Stack, SxProps, TextField, InputLabel, Select, FormControl, MenuItem} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
// own modules
import {useAppDispatch} from "../../hooks/store.hook"
import CategoryTree from "../categoryTree/CategoryTree";
// actions
import {productCreateServer} from "../../store/thunks/products";
import {createTimeoutNotification} from "../../store/thunks/notifications";
// types
import {ICategoryTree} from "../../models/ICategoryTree";
import {IProductCreation} from "../../models/IProduct";
import {
    labelValidation,
    longDescriptionValidation,
    positiveNumberValidation,
    shortDescriptionValidation,
    weightUnitsValidation
} from "../../validation/validation";

const CreateProduct: FC = (sx?: SxProps) => {
    const dispatch = useAppDispatch();

    const formik = useFormik<IProductCreation>({
        initialValues: {
            name: "",
            price: 0,
            weight: 0,
            weightUnits: "",
            shortDescription: "",
            longDescription: "",
            image: "",
            thumb: "",
            categoryId: 0,
            stock: 0,
        },
        validationSchema: Yup.object({
            name: labelValidation,
            price: positiveNumberValidation,
            weight: positiveNumberValidation,
            weightUnits: weightUnitsValidation,
            shortDescription: shortDescriptionValidation,
            longDescription: longDescriptionValidation,
            stock: positiveNumberValidation,
            categoryId: Yup.number().min(1, "Для родительской категории должна быть выбрана такая категория, которая не имеет потомков")
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(productCreateServer(values));
            setSubmitting(false);
        }
    });

    const onSelectCategory = (category: ICategoryTree) => {
        if(category.children.length === 0) {
            formik.setFieldValue("categoryId", category.id);
        }
        else {
            formik.setFieldError("categoryId", "Для родительской категории должна быть выбрана такая категория, которая не имеет потомков");
        }
    }

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
                label="Название"
                variant="outlined"
                helperText={formik.errors.name}
            />
            <TextField
                type="number"
                error={!!(formik.errors.price && formik.touched.price)}
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                label="Цена"
                variant="outlined"
                helperText={formik.errors.price}
            />
            <TextField
                type="number"
                error={!!(formik.errors.weight && formik.touched.weight)}
                name="weight"
                onChange={formik.handleChange}
                value={formik.values.weight}
                label="Вес"
                variant="outlined"
                helperText={formik.errors.weight}
            />
            <FormControl fullWidth>
                <InputLabel id="weight-units-select-label">Вес(единица измерения)</InputLabel>
                <Select
                    id="weight-units-select"
                    error={!!(formik.errors.weightUnits && formik.touched.weightUnits)}
                    labelId="weight-units-select-label"
                    value={formik.values.weightUnits}
                    label="Вес(единица измерения)"
                    name="weightUnits"
                    onChange={formik.handleChange}
                    // helperText={formik.errors.weightUnits}
                >
                    <MenuItem value="kilogram">килограмм</MenuItem>
                    <MenuItem value="gram">грамм</MenuItem>
                </Select>
            </FormControl>
            <TextField
                error={!!(formik.errors.shortDescription && formik.touched.shortDescription)}
                name="shortDescription"
                onChange={formik.handleChange}
                value={formik.values.shortDescription}
                label="Короткое описание"
                variant="outlined"
                helperText={formik.errors.shortDescription}
            />
            <TextField
                error={!!(formik.errors.longDescription && formik.touched.longDescription)}
                name="longDescription"
                onChange={formik.handleChange}
                value={formik.values.longDescription}
                label="Описание"
                variant="outlined"
                helperText={formik.errors.longDescription}
            />
            <TextField
                error={!!(formik.errors.image && formik.touched.image)}
                name="image"
                onChange={formik.handleChange}
                value={formik.values.image}
                label="Image"
                variant="outlined"
                helperText={formik.errors.image}
            />
            <TextField
                error={!!(formik.errors.thumb && formik.touched.thumb)}
                name="thumb"
                onChange={formik.handleChange}
                value={formik.values.thumb}
                label="Thumb"
                variant="outlined"
                helperText={formik.errors.thumb}
            />
            <Stack direction="row" spacing={2} height="100%">
                <TextField
                    sx={{flexGrow: 1}}
                    error={!!(formik.errors.categoryId && formik.touched.categoryId)}
                    name="categoryId"
                    value={formik.values.categoryId}
                    label="categoryId"
                    variant="outlined"
                    helperText={formik.errors.categoryId}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <CategoryTree onSelectCategory={onSelectCategory}/>
            </Stack>
            <TextField
                type="number"
                error={!!(formik.errors.stock && formik.touched.stock)}
                name="stock"
                onChange={formik.handleChange}
                value={formik.values.stock}
                label="Количество"
                variant="outlined"
                helperText={formik.errors.stock}
            />

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

export default CreateProduct;