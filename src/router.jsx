import { createBrowserRouter } from "react-router-dom";
import Test from "./pages/Test";
import SignIn from "./pages/SignIn";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/cart/cart.jsx";
import Main from "./pages/bookdetail/main.jsx";
import QnA from "./pages/bookdetail/qna.jsx";
import ProductPage from "./pages/bookdetail/productpage.jsx";

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
        <Main />
        <ProductPage />
      </div>
    ),
  },
]);

export default router;
