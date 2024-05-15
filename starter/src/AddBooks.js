import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI.js";
import { Link } from "react-router-dom";

const AddBooks = ({ books, onShelfChange }) => {
    const [query, setQuery] = useState("");
  
    const updateQuery = (query) => {
      setQuery(query);
    };
  
    const handleShelfChange = async (book, newShelf) => {
      await BooksAPI.update(book, newShelf);
      onShelfChange();
    };
  
    const [searchedBooks, setSearchedBooks] = useState([]);
  
    useEffect(() => {
      if (query) {
        BooksAPI.search(query.trim(), "30").then((response) => {
          console.log("query found");
          console.log(response);
          setSearchedBooks(response);
        });
      } else {
        console.log("No query")
        setSearchedBooks([]);
      }
    }, [query]); 
  
    const booksToDisplay = query === "" ? [] : searchedBooks;
  
    return (
      <div className="list-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className="search-books"
              type="text"
              placeholder="Search Books"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            
                {booksToDisplay !== undefined && booksToDisplay.length > 0 ? (
                booksToDisplay.map((book) => (
                            <li key={book.id} className="book-list-item">
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 192,
                                            backgroundImage: book.imageLinks?.smallThumbnail
                                                ? `url(${book.imageLinks.smallThumbnail})`
                                                : "none"
                                        }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                        <select defaultValue={books.find((b) => b.id === book.id)?.shelf || "none" } onChange={(event) => handleShelfChange(book, event.target.value)}>
                                            <option>
                                            Move to...
                                            </option>
                                            <option value="currentlyReading">
                                            Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>     
                ))
                ) : (
                <p>No books found.</p>
                )}

        </ol>
        </div>
    </div>
    );
};

export default AddBooks;