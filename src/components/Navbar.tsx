import { BookOpen, FileText, Plus } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-library-brown"
          >
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">LibraryMS</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Button
              asChild
              variant={isActive("/books") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/books">All Books</Link>
            </Button>

            <Button
              asChild
              variant={isActive("/create-book") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/create-book">
                <Plus className="h-4 w-4 mr-1" />
                Add Book
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/borrow-summary") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/borrow-summary">
                <FileText className="h-4 w-4 mr-1" />
                Borrow Summary
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
