// third-party modules
import React from 'react';

// own modules
import LoginForm from "../../components/login/Login";
import AdministrationFormHOC from "../../components/HOC/AdministrationFormHOC";


const Login = () => {
    return (
        <AdministrationFormHOC label="Административный вход" wrapperFormSX={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
            <LoginForm />
        </AdministrationFormHOC>
    );
};

export default Login;