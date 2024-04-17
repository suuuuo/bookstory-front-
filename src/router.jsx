import { createBrowserRouter } from "react-router-dom";
import Test from "./pages/Test";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart.jsx";
import BookCategory from "./pages/BookCategory.jsx";
import Main from "./pages/bookdetail/Main.jsx";
import Productpage from "./pages/bookdetail/Productpage.jsx";
import OrderList from "./pages/order/getAllMyOrders.jsx";
import SaveOrder from "./pages/order/saveOrder.jsx";
import MyPage from "./pages/MyPage.jsx";

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
    path: "/category/:id",
    element: (
      <>
        <Header />
        <BookCategory />
        <Footer />
      </>
    ),
  },
  {
    path: "/:id",
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
        <SignUp />
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
  {
    path: "/order",
    element: (
      <>
        <Header />
        <SaveOrder />
        <Footer />
      </>
    ),
  },
  {
    path: "/mypage",
    element: (
      <>
        <Header />
        <MyPage />
        <Footer />
      </>
    ),
  },
]);

export default router;
