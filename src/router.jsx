import { createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Cart from "./pages/Cart/cart";

const router = createBrowserRouter([
  {
    path: "/Cart",
    element: (
      <>
        <Header />
        <Cart />
        <Footer />
      </>
    ),
  },
]);

export default router;
