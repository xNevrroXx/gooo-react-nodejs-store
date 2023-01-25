import React, {FC, useEffect, useState} from 'react';
import UserService from "../../services/UserService";

const ProductList: FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        UserService.getUsers()
            .then(response => setProducts(response.data))
    }, [])


    return (
        <div>
            {products}
        </div>
    );
};

export default ProductList;