import LoginPage from "./login";
import { useEffect, useState } from "react";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

export default function AuthCheck({ children }) {

    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            setLoggedIn(true);
            navigate('/');
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isLoggedIn ? <>{children}</> : <LoginPage />;
}