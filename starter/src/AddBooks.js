import { useState} from "react";
import * as BooksAPI from "./BooksAPI.js";
import { Link } from "react-router-dom";


const AddBooks = ({books, onShelfChange}) => {

    const [query, setQuery] = useState("");

    const updateQuery = (query) => {
        setQuery(query.trim());
    };
    
    const handleShelfChange = async (book, newShelf) => {
        await BooksAPI.update(book, newShelf);
        onShelfChange();
    };
      
    const showingBooks = query === ""
    ? books
    : books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );

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
                    {                    
                    showingBooks.map((book) => (
                        <li key={book.id} className="book-list-item">
                            <div className="book">
                                <div className="book-top">
                                    <div
                                    className="book-cover"
                                    style={{
                                        width: 128,
                                        height: 192,
                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                    }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf} onChange={(event) => handleShelfChange(book, event.target.value)}>
                                        <option value="none" disabled>
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
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>     
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default AddBooks;