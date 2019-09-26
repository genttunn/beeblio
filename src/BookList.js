import React from "react";
import { Link } from "react-router-dom";
function BookList({ books }) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {books.map((book, index) => (
        <li key={index}>
          <div>
            <p>
              <Link to={`/book/${index}`} style={{ color: "white" }}>
                {book.title} by {book.author} ({book.year})
              </Link>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default BookList;
