import { createBrowserRouter } from "react-router-dom";
import Test from "./pages/Test";
import SignIn from "./pages/SignIn";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import Main from "./pages/bookdetail/Main.jsx";
import Productpage from "./pages/bookdetail/Productpage.jsx";
import OrderList from "./pages/order/orderList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/sign_in",
    element: (
      <>
        <Header />
        <SignIn />
        <SocialLoginHandler />
        <Footer />
      </>
    ),
  },
  {
    path: "/sign_up",
    element: (
      <>
        <Header />
        <div>sign_up</div>
        <Footer />
      </>
    ),
  },
  {
    path: "/social_login_handler",
    element: (
      <>
        <Header />
        <SocialLoginHandler />
        <Footer />
      </>
    ),
  },
  {
    path: "/test",
    element: (
      <>
        <Header />
        <Test />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header />
        <Cart />
        <Footer />
      </>
    ),
  },
  {
    path: "/book/:bookId",
    element: (
      <div>
        <Header />
        <Main />
        <Productpage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/myorders",
    element: (
      <>
        <Header />
        <OrderList />
        <Footer />
      </>
    ),
  },
]);

export default router;
