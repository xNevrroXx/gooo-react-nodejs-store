import React, {FC} from 'react';
import {Outlet} from "react-router-dom";

const RecoveryAccess: FC = () => {
    return (
        <>
            <h1>Восстановление доступа</h1>
            <Outlet/>
        </>
    );
};

export default RecoveryAccess;