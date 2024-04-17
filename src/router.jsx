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
import BookMain from "./pages/BookMain.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import BookSave from "./pages/BookSave.jsx";

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
