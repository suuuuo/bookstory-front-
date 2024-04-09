import {createBrowserRouter} from "react-router-dom";
import Main from "./pages/bookdetail/main.jsx";
import QnA from "./pages/bookdetail/qna.jsx";
import ProductPage from "./pages/bookdetail/productpage.jsx";


const router = createBrowserRouter([
    {
        path: "/book/:bookId",
        element:
            <div>
                <Main/>
                <ProductPage/>
            </div>

    },
    // 다른 경로 구성
]);

export default router;
