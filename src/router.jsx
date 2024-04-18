import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Test from "./pages/Test";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart.jsx";
import BookCategory from "./pages/BookCategory.jsx";
import Category from "./pages/Category.jsx";
import BookMain from "./pages/BookMain.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Search from "./pages/Search.jsx";
import BookSave from "./pages/BookSave.jsx";
import OrderList from "./pages/order/getAllMyOrders.jsx";
import MyPage from "./pages/MyPage.jsx";
import SaveOrder from "./pages/order/saveOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Navigate to="/22" replace />
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
    path: "/search/:keyword",
    element: (
      <>
        <Header />
        <Search />
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
      <>
        <Header />
        <BookMain />
        <ProductPage />
        <Footer />
      </>
    ),
  },
  {
    path: "admin/book/",
    element: (
      <>
        <Header />
        <BookSave />
        <Footer />
      </>
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
