import React from "react";

// own modules
import AdministrationFormHOC from "../../components/HOC/AdministrationFormHOC";
import CreateCategory from "../../components/createCategory/CreateCategory";

const AdministrationCreateCategory = () => {
    return (
        <AdministrationFormHOC label="Адиминистративная панель: создание категорий товаров" wrapperFormSX={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
            <CreateCategory />
        </AdministrationFormHOC>
    );
};

export default AdministrationCreateCategory;