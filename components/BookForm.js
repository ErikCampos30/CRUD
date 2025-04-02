import { useEffect, useState } from "react";

export default function BookForm({ onSubmit, initialData = null, buttonText = "Add Book" }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author });
    setTitle("");
    setAuthor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-[#FF7F50] p-4 rounded-xl shadow-md"
    >
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="flex-1 px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900">
        {buttonText}
      </button>
    </form>
  );
}
