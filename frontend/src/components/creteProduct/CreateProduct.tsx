import React, {FC} from "react";
import {Box, Button, Stack, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";

// own modules
import {useAppDispatch} from "../../hooks/store.hook";
import {createProductThunk} from "../../actions/product";
import Catalog from "../catalog/Catalog";
import MainStyledButton from "../styledComponents/MainStyledButton";

const CreateProduct: FC = (sx?: SxProps) => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            weight: "",
            weightUnits: "",
            shortDescription: "",
            longDescription: "",
            image: "",
            thumb: "",
            categoryId: 0,
            stock: 0,
        },
        onSubmit: (values, {setSubmitting}) => {
            dispatch(createProductThunk(values));
            setSubmitting(false);
        }
    });

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
                error={!!(formik.errors.price && formik.touched.price)}
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                label="Цена"
                variant="outlined"
                helperText={formik.errors.price}
            />
            <TextField
                error={!!(formik.errors.weight && formik.touched.weight)}
                name="weight"
                onChange={formik.handleChange}
                value={formik.values.weight}
                label="Вес"
                variant="outlined"
                helperText={formik.errors.weight}
            />
            <TextField
                error={!!(formik.errors.weightUnits && formik.touched.weightUnits)}
                name="weightUnits"
                onChange={formik.handleChange}
                value={formik.values.weightUnits}
                label="Вес(единица измерения)"
                variant="outlined"
                helperText={formik.errors.weightUnits}
            />
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
            <Stack direction="row" spacing={2}>
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
                <Catalog onClickOverride={(id) => formik.setFieldValue("categoryId", id)} />
            </Stack>
            <TextField
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