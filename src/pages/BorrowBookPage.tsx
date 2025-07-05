import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
// import { useToast } from "../hooks/use-toast";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/features/libraryApi";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";

export const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  //   const { toast } = useToast();

  // Fetch the book details with RTK Query
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetBookByIdQuery(bookId || "");
  const book = response?.data;

  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });

  // Set default due date to 2 weeks from now (runs once on mount)
  useEffect(() => {
    if (!formData.dueDate) {
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
      setFormData((prev) => ({
        ...prev,
        dueDate: twoWeeksFromNow.toISOString().split("T")[0],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    if (formData.quantity > book.copies) {
      toast(`Only ${book.copies} copies available`);
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      toast("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch (error: any) {
      toast(error?.data?.message || error?.message || "Failed to borrow book");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
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
      </div>
    );
  }

  if (!book.available || book.copies === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-gradient-card shadow-book">
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-4">Book Unavailable</h2>
            <p className="text-muted-foreground mb-6">
              This book is currently not available for borrowing.
            </p>
            <Button onClick={() => navigate("/books")}>Back to Books</Button>
          </CardContent>
        </Card>
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
          onClick={() => navigate(`/books/${bookId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrow Book</h1>
          <p className="text-muted-foreground mt-2">
            Complete the borrowing process
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Info */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card shadow-book">
            <CardHeader>
              <CardTitle className="text-lg">Book Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Title
                </label>
                <p className="font-medium">{book.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Author
                </label>
                <p>{book.author}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Available Copies
                </label>
                <p className="font-bold text-lg text-library-blue">
                  {book.copies}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Borrow Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-book">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Borrowing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of Copies *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max={book.copies}
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum available: {book.copies}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date *
                  </Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Borrowing Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Book:</span>
                      <span>{book.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>
                        {formData.quantity}{" "}
                        {formData.quantity === 1 ? "copy" : "copies"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>
                        {formData.dueDate
                          ? new Date(formData.dueDate).toLocaleDateString()
                          : "Not set"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/books/${bookId}`)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isBorrowing}
                    className="flex-1 bg-library-blue hover:bg-library-blue/90"
                  >
                    {isBorrowing ? "Processing..." : "Borrow Book"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
