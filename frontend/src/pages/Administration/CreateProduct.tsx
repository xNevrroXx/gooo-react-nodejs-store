import React, {FC} from 'react';

// own modules
import CreateProductForm from "../../components/creteProduct/CreateProduct";
import AdministrationFormHOC from "../../components/HOC/AdministrationFormHOC";

const CreateProduct: FC = () => {
    return (
        <AdministrationFormHOC label="Адиминистративная панель: создание товара">
            <CreateProductForm />
        </AdministrationFormHOC>
    )
};

export default CreateProduct;