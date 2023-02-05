import React, {FC, useState} from "react";
import {Box, Button, Stack, SxProps, TextField} from "@mui/material";
import {useFormik} from "formik";

// own modules
import {createCategoryThunk} from "../../actions/category";
import Catalog from "../catalog/Catalog";
import MainStyledButton from "../styledComponents/MainStyledButton";
import {useAppDispatch} from "../../hooks/store.hook";

const CreateCategory: FC = (sx?: SxProps) => {
    const [parentId, setParentId] = useState<number>(0);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            label: "",
            parentId: parentId
        },
        onSubmit: (values, {setSubmitting}) => {
            dispatch(createCategoryThunk(values));
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
                    error={!!(formik.errors.parentId && formik.touched.parentId)}
                    name="parentId"
                    onChange={(event) => setParentId(+event.target.value)}
                    value={parentId}
                    label="parentId"
                    variant="outlined"
                    helperText={formik.errors.parentId}
                    disabled
                />
                <Catalog onClickOverload={setParentId} />
                <MainStyledButton
                    sx={{height: "100%", width: "max-content"}}
                    onClick={() => setParentId(0)}
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