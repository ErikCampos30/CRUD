import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function Home() {
  const [books, setBooks] = useState([]);

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

  return (
    <div>
      <h1>Book List</h1>
      <BookForm onSubmit={addBook} />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
