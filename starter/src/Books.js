import * as BooksAPI from "./BooksAPI.js";

const Books = ({books, onShelfChange}) => {

    const handleShelfChange = async (book, newShelf) => {
        await BooksAPI.update(book, newShelf);
        onShelfChange();
      };
    

    return (
        <div>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                    
                    
                    books.map((book) => (
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
                                        <select value={book.shelf} onChange={(event) => handleShelfChange(book, event.target.value)}>
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
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>     
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Books;