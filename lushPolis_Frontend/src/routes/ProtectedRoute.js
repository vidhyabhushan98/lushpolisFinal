import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
	const jwt = localStorage.getItem("jwt");
    return (
        <Route>
            {jwt ? <Component {...restOfProps} /> : <Redirect to="/login" />}
        </Route>
    );
};

export default ProtectedRoute;
