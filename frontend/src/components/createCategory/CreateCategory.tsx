import React, {FC} from "react";
import {Box, Button, SxProps, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";

// own modules
import CategoryService from "../../services/CategoryService";

const CreateCategory: FC = (sx?: SxProps) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            parentId: 0
        },
        onSubmit: (values, {setSubmitting}) => {
            CategoryService.createCategory({...values})
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
                label="Название"
                variant="outlined"
                helperText={formik.errors.name}
            />
            <TextField
                error={!!(formik.errors.parentId && formik.touched.parentId)}
                name="parentId"
                onChange={formik.handleChange}
                value={formik.values.parentId}
                label="parentId"
                variant="outlined"
                helperText={formik.errors.parentId}
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

export default CreateCategory;