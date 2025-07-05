/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
// import { useToast } from "../hooks/use-toast";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/features/libraryApi";
import { ArrowLeft, Edit } from "lucide-react";
import { toast } from "sonner";
// import { toast } from "sonner";

export const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //   const { toast } = useToast();

  // Fetch the book data with RTK Query
  const {
    data: data,
    isLoading,
    isError,
    error,
  } = useGetBookByIdQuery(id || "");

  const book = data?.data;

  console.log("EditBookPage book data:", book);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book]);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;
    try {
      await updateBook({ id, updates: formData }).unwrap();
      toast("Book updated successfully");
      navigate(`/books/${id}`);
    } catch (error: any) {
      toast("Failed to update book");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAvailableChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      available: checked,
    }));
  };

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
            <span onClick={() => navigate("/books")}>Back to Books</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/books/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Book</h1>
          <p className="text-muted-foreground mt-2">Update book information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-gradient-card shadow-book">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Book Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Input
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies *</Label>
                <Input
                  id="copies"
                  name="copies"
                  type="number"
                  min="0"
                  value={formData.copies}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available"
                    checked={formData.available}
                    onCheckedChange={handleAvailableChange}
                  />
                  <Label htmlFor="available" className="text-sm font-normal">
                    Available for borrowing
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/books/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isUpdating}
                className="flex-1 bg-library-brown hover:bg-library-brown/90"
              >
                {isUpdating ? "Updating..." : "Update Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
