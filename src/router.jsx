import {createBrowserRouter} from "react-router-dom";
import BookDetail from "./pages/bookdetail.jsx";
import QnA from "./pages/qna.jsx";


const router = createBrowserRouter([
    {
        path: "/book/:bookId",
        element:
            <div>
                <BookDetail/>,
                <QnA/>
            </div>

    },
    // 다른 경로 구성
]);

export default router;
