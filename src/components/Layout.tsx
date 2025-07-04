import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Toaster richColors position="top-right" />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
