import { useState, useEffect} from "react";
import * as BooksAPI from "./BooksAPI.js";
import Books from "./Books.js"
import AddBooks from "./AddBooks.js"
import {  Route, Routes, Link } from "react-router-dom";


const BookShelves = () => {

    const [wantToReadBooks, setWantToReadBooks] = useState([]);
    const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);


    const getBooks = async () => {
        const allBooks = await BooksAPI.getAll();
        const wantToReadBooks = allBooks.filter((book) => book.shelf === 'wantToRead');
        const currentlyReadingBooks = allBooks.filter((book) => book.shelf === 'currentlyReading');
        const readBooks = allBooks.filter((book) => book.shelf === 'read');

        setAllBooks(allBooks);
        setWantToReadBooks(wantToReadBooks);
        setCurrentlyReadingBooks(currentlyReadingBooks);
        setReadBooks(readBooks);
    };

    
    useEffect(() => {    
        getBooks();
    }, []);


    return (
        <Routes>
            <Route exact path="/" element={
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <Books books={wantToReadBooks} onShelfChange={getBooks} />
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <Books books={currentlyReadingBooks} onShelfChange={getBooks} />
                    <h2 className="bookshelf-title">Read</h2>
                    <Books books={readBooks} onShelfChange={getBooks}/>
                    <div className="open-search">
                        <Link to="/addBooks" className="add-book">
                            Add a book
                        </Link>
                    </div>
                </div>
            }/>
            <Route path="/addBooks" element={
                <div className="bookshelf">
                
                    <AddBooks books={allBooks} onShelfChange={getBooks}/>
                </div>
            }/>
        </Routes>
    );


}

export default BookShelves;