import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import { useAppDispatch } from "./hooks/useAppDispatch";

import { getProfile } from "./features/auth/authSlice";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);


    return <AppRoutes />;
}

export default App;