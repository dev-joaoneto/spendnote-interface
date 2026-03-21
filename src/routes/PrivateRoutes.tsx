import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";



const PriviteRoutes = () => {
    const { authState } = useAuth();

    if (!authState.user) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet />;
}

export default PriviteRoutes;