// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   description?: string;
//   copies: number;
//   available: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Borrow {
//   _id: string;
//   book: string;
//   quantity: number;
//   dueDate: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface BorrowSummary {
//   book: {
//     title: string;
//     isbn: string;
//   };
//   totalQuantity: number;
// }

// export const libraryApi = createApi({
//   reducerPath: "libraryApi",
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LIBRARY_API_URL }),
//   // tagTypes: ["Book", "Borrow"],
//   // endpoints: (builder) => ({
//   //   // BOOKS
//   //   getBooks: builder.query<
//   //     Book[],
//   //     { filter?: string; sortBy?: string; sort?: string; limit?: number }
//   //   >({
//   //     query: (params) => {
//   //       const qs = new URLSearchParams();
//   //       if (params.filter) qs.append("filter", params.filter);
//   //       if (params.sortBy) qs.append("sortBy", params.sortBy);
//   //       if (params.sort) qs.append("sort", params.sort);
//   //       if (params.limit) qs.append("limit", params.limit.toString());
//   //       return `books?${qs.toString()}`;
//   //     },
//   //     providesTags: (result) =>
//   //       result
//   //         ? [
//   //             ...result.map(({ _id }) => ({ type: "Book" as const, id: _id })),
//   //             { type: "Book", id: "LIST" },
//   //           ]
//   //         : [{ type: "Book", id: "LIST" }],
//   //   }),
//   tagTypes: ["Book", "Borrow"],
//   endpoints: (builder) => ({
//     getBooks: builder.query<
//       Book[],
//       { filter?: string; sortBy?: string; sort?: string; limit?: number }
//     >({
//       query: (params) => {
//         const qs = new URLSearchParams();
//         if (params.filter) qs.append("filter", params.filter);
//         if (params.sortBy) qs.append("sortBy", params.sortBy);
//         if (params.sort) qs.append("sort", params.sort);
//         if (params.limit) qs.append("limit", params.limit.toString());
//         return `books?${qs.toString()}`;
//       },
//       // Extract the array from the API response
//       transformResponse: (response: {
//         success: boolean;
//         message: string;
//         data: Book[];
//       }) => response.data,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ _id }) => ({ type: "Book" as const, id: _id })),
//               { type: "Book", id: "LIST" },
//             ]
//           : [{ type: "Book", id: "LIST" }],
//     }),
//     getBookById: builder.query<Book, string>({
//       query: (id) => `books/${id}`,
//       providesTags: (_result, _error, id) => [{ type: "Book", id }],
//     }),
//     createBook: builder.mutation<{ data: Book }, Partial<Book>>({
//       query: (body) => ({
//         url: "books",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: [{ type: "Book", id: "LIST" }],
//     }),
//     updateBook: builder.mutation<
//       { data: Book },
//       { id: string; updates: Partial<Book> }
//     >({
//       query: ({ id, updates }) => ({
//         url: `books/${id}`,
//         method: "PUT",
//         body: updates,
//       }),
//       invalidatesTags: (_result, _error, { id }) => [{ type: "Book", id }],
//     }),
//     deleteBook: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `books/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [{ type: "Book", id: "LIST" }],
//     }),

//     // BORROW
//     borrowBook: builder.mutation<
//       { data: Borrow },
//       { book: string; quantity: number; dueDate: string }
//     >({
//       query: (body) => ({
//         url: "borrow",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: [
//         { type: "Book", id: "LIST" },
//         { type: "Borrow", id: "SUMMARY" },
//       ],
//     }),
//     getBorrowedSummary: builder.query<BorrowSummary[], void>({
//       query: () => "borrow",
//       providesTags: [{ type: "Borrow", id: "SUMMARY" }],
//     }),
//   }),
// });

// // Hooks for usage in functional components
// export const {
//   useGetBooksQuery,
//   useGetBookByIdQuery,
//   useCreateBookMutation,
//   useUpdateBookMutation,
//   useDeleteBookMutation,
//   useBorrowBookMutation,
//   useGetBorrowedSummaryQuery,
// } = libraryApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  success: boolean;
  message: string;
  data: Book;
}

export interface Borrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LIBRARY_API_URL }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      Book[],
      { filter?: string; sortBy?: string; sort?: string; limit?: number }
    >({
      query: (params) => {
        const qs = new URLSearchParams();
        if (params.filter) qs.append("filter", params.filter);
        if (params.sortBy) qs.append("sortBy", params.sortBy);
        if (params.sort) qs.append("sort", params.sort);
        if (params.limit) qs.append("limit", params.limit.toString());
        return `books?${qs.toString()}`;
      },
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Book[];
      }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Book" as const, id: _id })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),
    getBookById: builder.query<BookResponse, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<{ data: Book }, Partial<Book>>({
      query: (body) => ({
        url: "books",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
    updateBook: builder.mutation<
      { data: Book },
      { id: string; updates: Partial<Book> }
    >({
      query: ({ id, updates }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
    borrowBook: builder.mutation<
      { data: Borrow },
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: "borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Book", id: "LIST" },
        { type: "Borrow", id: "SUMMARY" },
      ],
    }),
    getBorrowedSummary: builder.query<BorrowSummary[], void>({
      query: () => "borrow",
      providesTags: [{ type: "Borrow", id: "SUMMARY" }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowedSummaryQuery,
} = libraryApi;
