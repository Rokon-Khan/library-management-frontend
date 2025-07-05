/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/libraryApi";
import { BookOpen, Edit, Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

// Book type for type safety (adjust as per your actual type)
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

export const BookCardPage = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery({});
  const books: Book[] = data || [];
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const handleDeleteBook = async (bookId: string) => {
    try {
      setDeletingBookId(bookId);
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully");
      setDeletingBookId(null);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to delete book"
      );
      setDeletingBookId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {" "}
          Populor Library Books
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse your book collection
        </p>
      </div>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          {error instanceof Error ? error.message : "Failed to load books."}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No books available</p>
          <Button asChild className="mt-4">
            <Link to="/create-book">Add Your First Book</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book._id}
              className="bg-gradient-card shadow-book flex flex-col h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {book.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground mb-2">
                  by {book.author}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="font-semibold">Genre: </span>
                    <span>{book.genre}</span>
                  </div>
                  <div>
                    <span className="font-semibold">ISBN: </span>
                    <span className="font-mono text-xs">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Copies: </span>
                    <span>{book.copies}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Availability: </span>
                    <Badge
                      variant={book.available ? "default" : "secondary"}
                      //   className={book.available ? "bg-library-sage" : ""}
                    >
                      {book.copies > 0 ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Link to={`/edit-book/${book._id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    // className="flex-1 bg-library-blue hover:bg-library-blue/90"
                  >
                    <Link to={`/books/${book._id}`}>
                      <Info className="h-4 w-4 mr-1" />
                      See Detail
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteBook(book._id)}
                    disabled={deletingBookId === book._id || isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {deletingBookId === book._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
