import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Root from "../layouts/Root.jsx";

//Routes
import userRoutes from "./userRoutes.jsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            {userRoutes}
        </Route>
    )
);

export default router;