import { Layout } from "@/components/Layout";
import { BookDetailPage } from "@/pages/BookDetailPage";
import { BooksPage } from "@/pages/BookPage";
import { EditBookPage } from "@/pages/EditBookPage";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <BooksPage /> },
      // { path: "create-book", element: <CreateBookPage /> },
      { path: "books/:id", element: <BookDetailPage /> },
      { path: "edit-book/:id", element: <EditBookPage /> },
      // { path: "borrow/:bookId", element: <BorrowBookPage /> },
      // { path: "borrow-summary", element: <BorrowSummaryPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
