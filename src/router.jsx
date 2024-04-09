import { createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Books from "./pages/Cart/Samplebook/books";
import Book1 from "./pages/Cart/Samplebook/sample_book1";
import Book2 from "./pages/Cart/Samplebook/sample_book2";
import Book3 from "./pages/Cart/Samplebook/sample_book3";
import Book4 from "./pages/Cart/Samplebook/sample_book4";
import Cart from "./pages/Cart/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Books />
        <Footer />
      </>
    ),
  },
  {
    path: "/Book1",
    element: (
      <>
        <Header />
        <Book1 />
        <Footer />
      </>
    ),
  },
  {
    path: "/Book2",
    element: (
      <>
        <Header />
        <Book2 />
        <Footer />
      </>
    ),
  },
  {
    path: "/Book3",
    element: (
      <>
        <Header />
        <Book3 />
        <Footer />
      </>
    ),
  },
  {
    path: "/Book4",
    element: (
      <>
        <Header />
        <Book4 />
        <Footer />
      </>
    ),
  },
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
