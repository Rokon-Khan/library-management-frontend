import { useGetBorrowedSummaryQuery } from "@/redux/features/libraryApi";
import { BookOpen, FileText } from "lucide-react";
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

export const BorrowSummaryPage = () => {
  // Fetch borrow summary from RTK Query
  const { data, isLoading, isError, error } = useGetBorrowedSummaryQuery();

  // The API response is { success, message, data: BorrowSummary[] }
  type BorrowSummary = {
    book: {
      title?: string;
      isbn?: string;
    };
    totalQuantity: number;
  };
  const borrowSummary: BorrowSummary[] =
    data && "data" in data && Array.isArray(data.data) ? data.data : [];

  const totalBooksBorrowed = borrowSummary?.length || 0;
  const totalCopiesBorrowed =
    borrowSummary?.reduce((total, item) => total + item.totalQuantity, 0) || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Borrow Summary</h1>
        <p className="text-muted-foreground mt-2">
          Overview of all borrowed books
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-card shadow-book">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Books Borrowed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-library-blue">
              {totalBooksBorrowed}
            </div>
            <p className="text-xs text-muted-foreground">
              Different book titles
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-book">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Copies Borrowed
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-library-blue">
              {totalCopiesBorrowed}
            </div>
            <p className="text-xs text-muted-foreground">
              Individual book copies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="bg-gradient-card shadow-book">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Borrowed Books Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : isError ? (
            <div className="text-center py-8 text-destructive">
              {error && typeof error === "object" && "data" in error
                ? (error as { data?: { message?: string } }).data?.message ||
                  "Failed to load borrow summary"
                : "Failed to load borrow summary"}
            </div>
          ) : !borrowSummary || borrowSummary.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No books have been borrowed yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">
                      Total Quantity Borrowed
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowSummary.map((item, idx) => (
                    <TableRow key={item.book?.isbn || idx}>
                      <TableCell className="font-medium">
                        {item.book?.title ?? "Unknown"}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.book?.isbn ?? "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-library-blue/10 text-library-blue">
                          {item.totalQuantity}{" "}
                          {item.totalQuantity === 1 ? "copy" : "copies"}
                        </span>
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
