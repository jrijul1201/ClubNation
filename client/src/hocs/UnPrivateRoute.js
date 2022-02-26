import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const UnPrivateRoute = ({component : Component,...rest})=>{
    const { isAuthenticated, isAdmin } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated && !isAdmin)
                return <Redirect to={{ pathname: '/student', 
                                       state : {from : props.location}}}/>
            if(isAuthenticated && isAdmin)
                return <Redirect to={{ pathname: '/admin', 
                                       state : {from : props.location}}}/>
                                       
            return <Component {...props}/>
        }}/>
    )
}

export default UnPrivateRoute;