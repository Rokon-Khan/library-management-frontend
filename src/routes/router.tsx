import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
