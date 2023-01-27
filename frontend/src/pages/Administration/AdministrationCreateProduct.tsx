import React, {FC} from 'react';

// own modules
import CreateProduct from "../../components/creteProduct/CreateProduct";
import AdministrationFormHOC from "../../components/HOC/AdministrationFormHOC";

const AdministrationCreateProduct: FC = () => {
    return (
        <AdministrationFormHOC label="Адиминистративная панель: создание товара">
            <CreateProduct />
        </AdministrationFormHOC>
    )
};

export default AdministrationCreateProduct;