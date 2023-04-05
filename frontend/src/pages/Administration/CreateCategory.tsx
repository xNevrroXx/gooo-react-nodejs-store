import React from "react";
// own modules
import AdministrationFormHOC from "../../HOC/AdministrationFormHOC";
import CreateCategoryForm from "../../components/createCategory/CreateCategory";

const CreateCategory = () => {
    return (
        <AdministrationFormHOC label="Административная панель: создание категорий товаров">
            <CreateCategoryForm />
        </AdministrationFormHOC>
    );
};

export default CreateCategory;