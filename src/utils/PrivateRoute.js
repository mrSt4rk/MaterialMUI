import { Navigate } from "react-router";
import { getWithExpiry } from './user.service';

export const RequireAuth = ({ children }) => {

    if (!(getWithExpiry('muiUser') && getWithExpiry('muiUser').token === 'fake-jwt-token')) {
        return <Navigate to="/login" />
    }

    return children;
};