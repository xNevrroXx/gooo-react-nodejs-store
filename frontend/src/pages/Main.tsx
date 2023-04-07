import React from 'react';
// own modules
import ProductList from "../components/productLists/ProductList";
import SortingSwitch from "../components/sortingSwitch/SortingSwitch";

const Main = () => {
    return (
        <main>
            <SortingSwitch/>
            <ProductList/>
        </main>
    );
};

export default Main;