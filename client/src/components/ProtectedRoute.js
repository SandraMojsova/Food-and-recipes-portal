import React from "react";
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            let token = localStorage.getItem("jwt");
            if (token) {
                console.log('pomina protected')
                return <Component {...props} />
            }
            else {
                console.log('ne pomina protected')
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        }} />
    )
}