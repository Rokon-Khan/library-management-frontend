/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBookByIdQuery } from "@/redux/features/libraryApi";
import { ArrowLeft, BookOpen, Edit } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the book with RTK Query, id param is from router (should match _id in backend)
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetBookByIdQuery(id || "");

  // The API returns: { success, message, data: Book }
  const book = response?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading book...</div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          {error && typeof error === "object" && "data" in error
            ? (error as any).data?.message || "Book not found"
            : "Book not found"}
        </div>
        <div className="text-center mt-4">
          <Button asChild>
            <Link to="/books">Back to Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/books")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{book.title}</h1>
            <p className="text-muted-foreground mt-2">by {book.author}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/edit-book/${book._id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Book
            </Link>
          </Button>

          {book.available && book.copies > 0 && (
            <Button
              asChild
              className="bg-library-blue hover:bg-library-blue/90"
            >
              <Link to={`/borrow/${book._id}`}>Borrow Book</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-book">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Book Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description ||
                    "No description available for this book."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Genre
                  </label>
                  <p className="font-medium">{book.genre}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    ISBN
                  </label>
                  <p className="font-mono text-sm">{book.isbn}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-book">
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge
                  variant={book.available ? "default" : "secondary"}
                  className={book.available ? "bg-library-sage" : ""}
                >
                  {book.available ? "Available" : "Unavailable"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Copies</span>
                <span className="font-bold text-lg">{book.copies}</span>
              </div>

              {book.available && book.copies > 0 && (
                <Button
                  asChild
                  className="w-full bg-library-blue hover:bg-library-blue/90"
                >
                  <Link to={`/borrow/${book._id}`}>Borrow This Book</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card className="bg-gradient-card shadow-book">
            <CardHeader>
              <CardTitle className="text-lg">Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Added
                </label>
                <p className="text-sm">
                  {book.createdAt
                    ? new Date(book.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              {book.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <p className="text-sm">
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
