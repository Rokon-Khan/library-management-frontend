import { BookOpen, FileText, Library, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  // Auto-redirect to books page
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/books");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Library className="h-16 w-16 text-library-cream mr-4" />
            <h1 className="text-5xl font-bold text-library-cream">LibraryMS</h1>
          </div>
          <p className="text-xl text-library-cream/80 max-w-2xl mx-auto">
            A modern, minimal library management system for efficient book
            tracking and borrowing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="bg-library-cream/95 shadow-elevated hover:shadow-elevated transition-all duration-300 border-0">
            <CardHeader className="text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-library-brown" />
              <CardTitle className="text-library-brown">Browse Books</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                View and manage your entire book collection
              </p>
              <Button
                onClick={() => navigate("/books")}
                className="bg-library-brown hover:bg-library-brown/90"
              >
                View All Books
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-library-cream/95 shadow-elevated hover:shadow-elevated transition-all duration-300 border-0">
            <CardHeader className="text-center">
              <Plus className="h-8 w-8 mx-auto mb-2 text-library-brown" />
              <CardTitle className="text-library-brown">Add Books</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Easily add new books to your library
              </p>
              <Button
                onClick={() => navigate("/create-book")}
                className="bg-library-blue hover:bg-library-blue/90"
              >
                Add New Book
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-library-cream/95 shadow-elevated hover:shadow-elevated transition-all duration-300 border-0">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-library-brown" />
              <CardTitle className="text-library-brown">
                Track Borrowing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Monitor borrowing activity and summaries
              </p>
              <Button
                onClick={() => navigate("/borrow-summary")}
                className="bg-library-sage hover:bg-library-sage/90"
              >
                View Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-library-cream/60 text-sm mb-4">
            Automatically redirecting to books in 3 seconds...
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/books")}
            className="bg-library-cream/10 border-library-cream/30 text-library-cream hover:bg-library-cream/20"
          >
            Go to Books Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
