# Library and Book Management System

This is a minimal library management system built with React, Redux Toolkit Query (RTK Query), TypeScript, React Router v7, Tailwind CSS, and Shadcn UI. It allows users to perform CRUD operations on books, borrow books, and view a borrow summary without requiring authentication. The application features a clean, responsive UI and efficient state management.

## Live Demo
Check out the live demo: [Library Management System](https://library-and-book-management.surge.sh)

## Features

### Public Routes
- All pages are accessible without login, focusing on core book and borrowing functionalities.

### Book Management
- **Book List Table**: Displays books with columns for Title, Author, Genre, ISBN, Copies, Availability, and Actions.
- **Actions**:
  - **Edit Book**: Form to update book details, instantly reflected in the UI.
  - **Delete Book**: Confirmation dialog before removal.
  - **Borrow Book**: Form to borrow a book.
  - **Business Logic**: Books with 0 copies are marked unavailable.
- **Add New Book**: Form with fields for Title, Author, Genre, ISBN, Description, Copies, and Available (defaults to true). Redirects to book list on submission.

### Borrow Book
- Accessible via the “Borrow” button in the book list.
- Fields: Quantity (cannot exceed available copies), Due Date.
- **Business Logic**: Books become unavailable when copies reach 0.
- Submits via API, shows success message, and redirects to borrow summary.

### Borrow Summary
- Displays aggregated list of borrowed books with Book Title, ISBN, and Total Quantity Borrowed.

### Landing Page Components
- **Navbar**: Links to All Books, Add Book, and Borrow Summary.
- **Book Table**: Displays books with all core actions.
- **Footer**: Basic site info and credits.

## Pages
- `/books`: List of all books with view, edit, delete, and borrow options.
- `/create-book`: Form to add a new book.
- `/books/:id`: Detailed view of a single book.
- `/edit-book/:id`: Form to update book details.
- `/borrow/:bookId`: Form to borrow a book.
- `/borrow-summary`: Aggregated summary of borrowed books.

## UI/UX
- **Minimalist UI**: Built with Tailwind CSS and Shadcn UI for a clean, feature-rich interface.
- **User Experience**: Intuitive navigation, clear buttons, and simple forms.
- **Responsive**: Adapts seamlessly to mobile, tablet, and desktop devices.

## Tech Stack
- **React**: Frontend framework for building UI components.
- **Redux Toolkit Query (RTK Query)**: For data fetching and caching.
- **React Router v7**: For client-side routing.
- **Tailwind CSS**: For styling and responsive design.
- **Shadcn UI**: For reusable UI components.
- **TypeScript**: For type safety and improved development experience.

## Installation Guide

### Prerequisites
- **Node.js**: Version 14 or higher.
- **npm**: Version 6 or higher (comes with Node.js).
- A modern web browser (e.g., Chrome, Firefox).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rokon-Khan/library-management-frontend.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd library-management-system
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
   This will install all required packages, including React, Redux Toolkit, React Router, Tailwind CSS, and Shadcn UI.
4. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:5173/`.
5. **Build for Production** (optional):
   ```bash
   npm run build
   ```
   This generates a production-ready build in the `build` folder.

### Troubleshooting
- If `npm install` fails, ensure you have a stable internet connection and the correct Node.js version.
- Clear the `node_modules` folder and `package-lock.json` file, then rerun `npm install`.
- For issues with the API, ensure the backend server (if applicable) is running and accessible.

## Usage
- Open `http://localhost:3000` in your browser.
- Navigate to `/books` to view and manage the book list.
- Use `/create-book` to add new books.
- Go to `/borrow/:bookId` to borrow books.
- View the borrowed books summary at `/borrow-summary`.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Built with modern web technologies for a seamless user experience.
- Thanks to the open-source community for tools like React, Redux, Tailwind CSS, and Shadcn UI.
