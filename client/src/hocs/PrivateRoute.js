import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({component : Component, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated) {
                alert('Please log in to visit this page.');
                return <Redirect to={{ pathname: '/', 
                                       state : {from : props.location}}}/>
            }
            // if(!roles.includes(user.role))
            //     return <Redirect to={{ pathname: '/', 
            //                      state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;