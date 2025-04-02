import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = () => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = (book) =>
    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(() => fetchBooks());

  const updateBook = (book) =>
    fetch(`/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(() => {
      setEditingBook(null);
      fetchBooks();
    });

  const deleteBook = (id) =>
    fetch(`/api/books/${id}`, { method: "DELETE" }).then(() => fetchBooks());

  return (
    <div className="min-h-screen bg-[#f0f4f8] p-8">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center gap-2">
        <span>📚</span> Book List
      </h1>
  
      <div className="max-w-md mx-auto mb-8">
        <BookForm
          onSubmit={editingBook ? updateBook : addBook}
          initialData={editingBook}
          buttonText={editingBook ? "Update Book" : "Add Book"}
        />
      </div>
  
      <ul className="max-w-md mx-auto space-y-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setEditingBook(book)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ); 
} 
