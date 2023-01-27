// third-party modules
import React from 'react';

// own modules
import Login from "../../components/login/Login";
import AdministrationFormHOC from "../../components/HOC/AdministrationFormHOC";


const AdministrationLogin = () => {
    return (
        <AdministrationFormHOC label="Административный вход" wrapperFormSX={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
            <Login />
        </AdministrationFormHOC>
    );
};

export default AdministrationLogin;