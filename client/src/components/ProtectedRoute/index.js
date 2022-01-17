import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { token } from '../../const';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (token) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        }} />
    )
}