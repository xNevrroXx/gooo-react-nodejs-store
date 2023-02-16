import React from "react";

// own modules
import AdministrationFormHOC from "../../HOC/AdministrationFormHOC";
import CreateCategoryForm from "../../components/createCategory/CreateCategory";

const CreateCategory = () => {
    return (
        <AdministrationFormHOC label="Адиминистративная панель: создание категорий товаров" wrapperFormSX={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
            <CreateCategoryForm />
        </AdministrationFormHOC>
    );
};

export default CreateCategory;