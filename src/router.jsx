import { createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
      </>
    ),
  },
  {
    path: "/sign_in",
    element: (
      <>
        <Header />
      </>
    ),
  },
  {
    path: "/sign_up",
    element: (
      <>
        <Header />
      </>
    ),
  },
]);

export default router;
