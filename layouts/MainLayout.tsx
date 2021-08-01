import * as React from "react";
import PropTypes from 'prop-types';
import Navigation from "../components/Navigation";

 

export const MainLayout = ({children}) => {

    return (
        <>
        <Navigation/>
        <div className="rounded mb-12 mx-auto max-w-screen-lg">
            {children} 
        </div>

        </>
    )
}

MainLayout.propTypes = {
    children : PropTypes.object
}

 
