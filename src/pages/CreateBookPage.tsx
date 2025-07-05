import { useState } from "react";
import { useNavigate } from "react-router";
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
import { useCreateBookMutation } from "@/redux/features/libraryApi";
import { ArrowLeft, BookPlus } from "lucide-react";
import { toast } from "sonner";

export const CreateBookPage = () => {
  const navigate = useNavigate();
  //   const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBook(formData).unwrap();
      toast("Book created successfully");
      navigate("/books");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        const err = error as { data?: { message?: string }; message?: string };
        toast(err?.data?.message || err?.message || "Failed to create book");
      } else {
        toast("Failed to create book");
      }
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" onClick={() => navigate("/books")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Book</h1>
          <p className="text-muted-foreground mt-2">
            Add a new book to your library collection
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-gradient-card shadow-book">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookPlus className="h-5 w-5" />
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
                  placeholder="Enter book title"
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
                  placeholder="Enter author name"
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
                  placeholder="Enter genre"
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
                  placeholder="Enter ISBN"
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
                placeholder="Enter book description (optional)"
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
                onClick={() => navigate("/books")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isLoading}
                className="flex-1 bg-library-brown hover:bg-library-brown/90"
              >
                {isLoading ? "Creating..." : "Create Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
