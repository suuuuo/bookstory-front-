import {createBrowserRouter} from "react-router-dom";
import Bookdetailmain from "./pages/bookdetail/bookdetailmain.jsx";
import QnA from "./pages/bookdetail/qna.jsx";
import ProductPage from "./pages/bookdetail/productpage.jsx";


const router = createBrowserRouter([
    {
        path: "/book/:bookId",
        element:
            <div>
                <Bookdetailmain/>
                <ProductPage/>
            </div>

    },
    // 다른 경로 구성
]);

export default router;
