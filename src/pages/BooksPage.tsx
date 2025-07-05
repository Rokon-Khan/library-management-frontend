/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/libraryApi";
import { BookOpen, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// Genre and sort options
const GENRE_OPTIONS = [
  { value: "", label: "All Genres" },
  { value: "FICTION", label: "Fiction" },
  { value: "NON_FICTION", label: "Non-fiction" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "BIOGRAPHY", label: "Biography" },
  { value: "FANTASY", label: "Fantasy" },
];

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "copies", label: "Copies" },
  { value: "createdAt", label: "Created Date" },
];

export const BooksPage = () => {
  // Filter, sort state
  const [genre, setGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Prepare query parameters for RTK Query
  const queryParams: any = {};
  if (genre) queryParams.filter = genre;
  if (sortBy) {
    queryParams.sortBy = sortBy;
    queryParams.sort = sort;
  }

  const { data, isLoading, isError, error } = useGetBooksQuery(queryParams);
  const books = data || [];
  // Accept both .data and array response for compatibility

  const [deleteBook, { isLoading: _isDeleting }] = useDeleteBookMutation();
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const handleDeleteBook = async (bookId: string) => {
    try {
      setDeletingBookId(bookId);
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully");
      setDeletingBookId(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to delete book"
      );
      setDeletingBookId(null);
    }
  };

  // Handle genre filter change
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  // Handle sort by change
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle sort order toggle (asc/desc)
  const handleSortOrderToggle = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library Books</h1>
          <p className="text-muted-foreground mt-2">
            Manage your book collection
          </p>
        </div>
        <Button asChild className="bg-library-brown hover:bg-library-brown/90">
          <Link to="/create-book">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex justify-end mb-4 gap-2">
        <select
          value={genre}
          onChange={handleGenreChange}
          className="border rounded px-3 py-2 text-sm"
        >
          {GENRE_OPTIONS.map((g) => (
            <option value={g.value} key={g.value}>
              {g.label}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="border rounded px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option value={opt.value} key={opt.value}>
              Sort by {opt.label}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSortOrderToggle}
          className="ml-2"
        >
          {sort === "asc" ? "Asc" : "Desc"}
        </Button>
      </div>

      {/* Books Table */}
      <Card className="bg-gradient-card shadow-book">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            All Books ({books.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              {error instanceof Error ? error.message : "Failed to load books."}
            </div>
          ) : !books || books.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No books available</p>
              <Button asChild className="mt-4">
                <Link to="/create-book">Add Your First Book</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book: any) => (
                    <TableRow key={book._id}>
                      <TableCell>
                        <Link
                          to={`/books/${book._id}`}
                          className="font-medium hover:text-library-blue transition-colors"
                        >
                          {book.title}
                        </Link>
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {book.isbn}
                      </TableCell>
                      <TableCell>{book.copies}</TableCell>
                      <TableCell>
                        <Badge
                          variant={book.available ? "default" : "secondary"}
                        >
                          {book.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/edit-book/${book._id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>

                          {book.available && book.copies > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="bg-library-blue hover:bg-library-blue/90"
                            >
                              <Link to={`/borrow/${book._id}`}>Borrow</Link>
                            </Button>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Book</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{book.title}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteBook(book._id)}
                                  disabled={deletingBookId === book._id}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  {deletingBookId === book._id
                                    ? "Deleting..."
                                    : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
