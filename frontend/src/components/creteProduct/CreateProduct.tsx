import React, {FC} from "react";
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";

// own modules
import AdminService from "../../services/AdminService";

const CreateProduct: FC = (sx?: SxProps) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            weight: "",
            shortDescription: "",
            longDescription: "",
            image: "",
            thumb: "",
            categoryId: 0,
            location: "",
            stock: 0
        },
        onSubmit: (values, {setSubmitting}) => {
            AdminService.createProduct({...values})
                .then(() => console.log("created product"))
                .catch(() => console.log("failure"));
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
                label="Почта"
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
            <TextField
                error={!!(formik.errors.categoryId && formik.touched.categoryId)}
                name="categoryId"
                onChange={formik.handleChange}
                value={formik.values.categoryId}
                label="categoryId"
                variant="outlined"
                helperText={formik.errors.categoryId}
            />
            <TextField
                error={!!(formik.errors.location && formik.touched.location)}
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                label="Местоположение"
                variant="outlined"
                helperText={formik.errors.location}
            />
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