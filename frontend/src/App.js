import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [bookData, setBookData] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookReview, setBookReview] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/backend/api/books/all");
      const data = response.data;
      setBookData(data);
    };

    getData();
  }, []);

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleReviewChange = (e) => {
    setBookReview(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const review = e.target[1].value;

    const book = {
      title: title,
      review: review,
    };

    const sendData = async () => {
      const request = axios.post("/backend/api/books/save", book);
      const nb = (await request).data;
      setBookData(bookData.concat(nb));

      // reset values
      setBookTitle("");
      setBookReview("");
    };

    sendData();
  };

  const handleDelete = (idBook) => {
    const deleteBook = async () => {
      const del = await axios.delete("/backend/api/books/delete", {
        data: { id: idBook },
      });

      await setBookData(bookData.filter((x) => x.id !== idBook));
    };

    deleteBook();
  };

  return (
    <div>
      <h1>BOOKS</h1>
      <form onSubmit={handleFormSubmit}>
        <p>
          Enter book title:{" "}
          <input value={bookTitle} onChange={handleTitleChange} />
        </p>
        <p>
          Type your review:{" "}
          <input value={bookReview} onChange={handleReviewChange} />
        </p>
        <button type="submit">Add review</button>
      </form>
      <ul>
        {bookData.map((n) => (
          <li key={n.id}>
            <p>
              <b>{n.title}:</b> {n.review}{" "}
              <button
                onClick={() => {
                  handleDelete(n.id);
                }}
              >
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
